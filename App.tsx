import React, { useEffect, useState, useRef } from 'react';
import { UserProgress, StudentInfo, AppState, Feedback, ToastMessage, Lesson } from './types';
import { LOCAL_STORAGE_KEY, PASSING_SCORE, SKIP_PASSWORD } from './constants';
import { getLessonById } from './data/lessons';
import { gradeSubmission, testApiKey, QuestionToGrade } from './services/geminiService';
import { submitResultsToSheet, sendResultsToHinParent, autoLoadExercise } from './services/integrationService';

import { StudentInfoModal, CongratsModal, ResumeModal, SkipPasswordModal, LoadingOverlay, ConfirmationModal } from './components/Modals';
import ToastContainer from './components/Toast';
import QuizQuestion from './components/QuizQuestion';
import LessonSelection from './components/LessonSelection';
import { API_KEYS } from './constants';

// Declare global marked for Typescript if needed, though we use window.marked usually
declare global {
  interface Window {
    marked: { parse: (text: string) => string };
    __HIN_PARENT_ORIGIN?: string;
  }
}

const initialProgress: UserProgress = {
  stage1_theory_read: true, // Default to true as per flow
  stage2_theory_quiz_passed: false,
  stage3_assessment_passed: false,
  stage2_score: 0,
  stage3_score: 0,
  retryFails: { stage2: 0, stage3: 0 }
};

function App() {
  // State
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [skipTarget, setSkipTarget] = useState<'stage2' | 'stage3' | null>(null);
  
  // New state to lock navigation if opened via external tool
  const [isLockedMode, setIsLockedMode] = useState(false);

  // Penalty / Lockout State
  const [lockoutUntil, setLockoutUntil] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);

  // Custom Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
      isOpen: false,
      title: '',
      message: '',
      isWarning: false,
      onConfirm: () => {},
      onCancel: () => {},
      cancelLabel: 'Hủy bỏ',
      confirmLabel: 'Đồng ý'
  });

  const [congratsData, setCongratsData] = useState({ title: '', score: 0, isSkipped: false });
  // State for sheet submission progress in modal
  const [sheetStatus, setSheetStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({ studentName: '', className: '', studentId: '', assignmentId: '' });
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [currentView, setCurrentView] = useState<'introduction' | 'theory-quiz' | 'final-assessment'>('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [startTime, setStartTime] = useState<string>('');
  
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Anti-Cheat State
  const [antiCheatEnabled, setAntiCheatEnabled] = useState(true);
  const cheatWarnings = useRef(0);

  // Quiz States
  const [answersStage2, setAnswersStage2] = useState<Record<number, string>>({});
  const [answersStage3, setAnswersStage3] = useState<Record<number, string>>({});
  const [feedbackStage2, setFeedbackStage2] = useState<Feedback[] | null>(null);
  const [feedbackStage3, setFeedbackStage3] = useState<Feedback[] | null>(null);
  
  const [isGrading, setIsGrading] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0); // For quiz navigation
  
  // Highlight unanswered questions
  const [unansweredIds, setUnansweredIds] = useState<number[]>([]);
  
  // Ref for throttling auto-save toasts
  const lastSaveTime = useRef<number>(0);

  // Helper: Toast
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper: Smooth Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Explicit Save Helper
  const saveProgressToLocalStorage = (
    currentInfo = studentInfo, 
    currentProg = progress, 
    ans2 = answersStage2, 
    ans3 = answersStage3,
    fb2 = feedbackStage2,
    fb3 = feedbackStage3,
    lockUntil = lockoutUntil,
    showNotification = false
  ) => {
    if (currentInfo.studentName && selectedLesson) {
      // Use lesson ID as key suffix to separate progress between lessons
      const storageKey = `${LOCAL_STORAGE_KEY}_${selectedLesson.id}`;
      const dataToSave: AppState = {
         currentView,
         isMobileMenuOpen,
         studentInfo: currentInfo, 
         progress: currentProg, 
         answersStage2: ans2, 
         answersStage3: ans3, 
         feedbackStage2: fb2, 
         feedbackStage3: fb3, 
         startTime,
         lockoutUntil: lockUntil
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      
      // Auto-save notification logic (throttle to every 30s max if implicit)
      if (showNotification) {
         const now = Date.now();
         if (now - lastSaveTime.current > 30000) {
             showToast("Đã tự động lưu bài làm", "info");
             lastSaveTime.current = now;
         }
      }
    }
  };

  // Initial Load & URL Parsing
  useEffect(() => {
    // 4. Cơ chế Tab con tự nhận dữ liệu (Auto-Init via URL)
    const params = new URLSearchParams(window.location.search);
    const urlLessonId = params.get('lessonId');

    if (urlLessonId) {
        // If URL has lessonId, try to load it
        // We defer this because it might need to fetch
        handleLessonSelection(urlLessonId, true); 
    }

    // HIN Listener
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'HIN_CONFIG') {
         console.log("Đã nhận cấu hình từ HIN:", event.data, 'origin=', event.origin);
         window.__HIN_PARENT_ORIGIN = event.origin || '*';

         try { 
            // @ts-ignore
            event.source?.postMessage({ type: 'HIN_CONFIG_ACK', status: 'ok' }, event.origin || '*'); 
         } catch(e){ /*ignore*/ }

         const { studentName, className, studentId, assignmentId, apiKey, lessonId } = event.data;
         
         const newStudentInfo = { 
             studentName: studentName || '', 
             className: className || '', 
             studentId: studentId || '', 
             assignmentId: assignmentId || '',
             apiKey
         };
         setStudentInfo(newStudentInfo);
         
         // If HIN passes a lessonId, auto-select it and LOCK it
         if (lessonId) {
             const initHinLesson = async () => {
                 showToast("Đang tải nội dung bài học...", "info");
                 let lesson = getLessonById(lessonId);
                 if (!lesson) {
                     const fetchedLesson = await autoLoadExercise(lessonId);
                     if (fetchedLesson) lesson = fetchedLesson;
                 }
                 
                 if (lesson) {
                     setSelectedLesson(lesson);
                     setIsLockedMode(true); // Disable Back to Library
                     setShowStudentModal(false); // Ensure modal is closed
                     
                     // Initialize start time immediately if not present
                     if (!startTime) setStartTime(new Date().toISOString());

                     // Check if there's a resume state, if so, we might want to respect it
                     const storageKey = `${LOCAL_STORAGE_KEY}_${lessonId}`;
                     const saved = localStorage.getItem(storageKey);
                     if (saved) {
                         setShowResumeModal(true);
                     }

                     showToast("Đã vào bài học từ hệ thống HIN", "success");
                 } else {
                     showToast(`Không tìm thấy bài học ID: ${lessonId}`, "error");
                 }
             };
             initHinLesson();
         } else {
             // Config provided but no lesson? User needs to select lesson, but info is filled.
             // If a lesson was already selected (e.g. via URL), update info.
             if (selectedLesson) {
                 setShowStudentModal(false);
             }
         }
         
         if(!startTime && !lessonId) setStartTime(new Date().toISOString());
      }
    };
    window.addEventListener('message', handleMessage);

    // HANDSHAKE: If opened via window.opener, tell parent we are ready for config
    if (window.opener) {
        console.log("Sending HIN_READY to opener...");
        window.opener.postMessage({ type: 'HIN_READY' }, '*');
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [selectedLesson, startTime]); // Add dependencies to ensure state updates are respected if needed

  // Countdown Timer Logic
  useEffect(() => {
    if (lockoutUntil > Date.now()) {
        const interval = setInterval(() => {
            const diff = lockoutUntil - Date.now();
            if (diff <= 0) {
                setLockoutUntil(0);
                setCountdown(0);
                showToast("Hết thời gian chờ. Bạn có thể làm lại bài!", "success");
                
                // Cập nhật localStorage để xóa trạng thái lock
                saveProgressToLocalStorage(studentInfo, progress, answersStage2, answersStage3, feedbackStage2, feedbackStage3, 0, false);
            } else {
                setCountdown(Math.ceil(diff / 1000));
            }
        }, 1000);
        return () => clearInterval(interval);
    } else {
        if(countdown > 0) setCountdown(0);
    }
  }, [lockoutUntil, studentInfo, progress, answersStage2, answersStage3, feedbackStage2, feedbackStage3]);


  // 2. Cơ chế nút "Học ngay" - Update state
  const handleLessonSelection = async (lessonId: string, isAutoInit = false) => {
      let lesson = getLessonById(lessonId);
      
      // If not in static library, fetch from API
      if (!lesson) {
          showToast("Đang tải nội dung bài học...", "info");
          const fetchedLesson = await autoLoadExercise(lessonId);
          if (fetchedLesson) {
              lesson = fetchedLesson;
          }
      }

      if (!lesson) {
          showToast("Không tìm thấy bài học này!", "error");
          return;
      }

      setSelectedLesson(lesson);

      // Check for saved progress specifically for THIS lesson
      const storageKey = `${LOCAL_STORAGE_KEY}_${lessonId}`;
      const saved = localStorage.getItem(storageKey);

      if (saved) {
          setShowResumeModal(true);
      } else {
          // New session for this lesson
          if (!studentInfo.studentName) {
            setShowStudentModal(true);
          } else {
             // If info already exists (e.g. from previous lesson or HIN), start
             setStartTime(new Date().toISOString());
          }
      }
  };

  // Anti-Cheat Logic
  useEffect(() => {
    // Only active if a lesson is selected
    if (!selectedLesson) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleCheatingAttempt();
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
       const target = e.target as HTMLElement;
       if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          return;
       }
       if (antiCheatEnabled && (currentView === 'theory-quiz' || currentView === 'final-assessment')) {
           // Cập nhật logic: Chặn paste nhưng KHÔNG tính lỗi gian lận
           e.preventDefault();
           showToast("Vui lòng tự gõ, không dán nội dung.", "warning");
           // Removed: handleCheatingAttempt(); 
       }
    };

    const handleCheatingAttempt = (isForceQuit = false) => {
      if (!antiCheatEnabled) return;
      if (currentView === 'introduction') return; 

      if (isForceQuit) {
         showToast("HÀNH VI GIAN LẬN: Thoát toàn màn hình! Bài làm đã bị hủy!", 'error');
         setTimeout(() => handleRestart(), 1000);
         return;
      }

      cheatWarnings.current += 1;
      
      if (cheatWarnings.current === 1) {
        showToast('CẢNH BÁO LẦN 1: Phát hiện chuyển tab.', 'warning');
      } else if (cheatWarnings.current >= 2) {
        showToast("HÀNH VI GIAN LẬN: Bài làm đã bị hủy!", 'error');
        setTimeout(() => handleRestart(), 2000);
      }
    };

    const handleFullscreenChange = () => {
        if (!document.fullscreenElement && currentView !== 'introduction') {
            handleCheatingAttempt(true);
        }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('paste', handlePaste);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('paste', handlePaste);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }
  }, [antiCheatEnabled, currentView, selectedLesson]);

  const toggleAntiCheat = () => {
     const password = prompt("Chức năng chỉ dành cho giáo viên. Vui lòng nhập mật khẩu để tắt Chống gian lận:");
     if (password === SKIP_PASSWORD) {
        setAntiCheatEnabled(false);
        showToast("Đã vô hiệu hóa Chống gian lận.", "success");
     } else if (password !== null) {
        showToast("Mật khẩu không chính xác.", "error");
     }
  };

  // Auto Save on State Changes
  useEffect(() => {
    if (!selectedLesson) return;
    const hasAnswers = Object.keys(answersStage2).length > 0 || Object.keys(answersStage3).length > 0;
    if (hasAnswers) {
        saveProgressToLocalStorage(studentInfo, progress, answersStage2, answersStage3, feedbackStage2, feedbackStage3, lockoutUntil, true);
    }
  }, [progress, answersStage2, answersStage3, feedbackStage2, feedbackStage3, selectedLesson, lockoutUntil]);

  // Handlers
  const handleStudentSubmit = async (data: any) => {
    if (data.apiKey) {
      const valid = await testApiKey(data.apiKey);
      if (valid) {
          API_KEYS.unshift(data.apiKey);
          showToast("API Key cá nhân hợp lệ.", "success");
      } else {
          showToast("API Key không hợp lệ. Đã chuyển về key hệ thống.", "warning");
      }
    }
    
    // Jump Logic
    if (data.jumpStage && data.jumpPass === SKIP_PASSWORD) {
        if (data.jumpStage === 'stage2') {
           showToast("Đã nhảy đến Giai đoạn 2.", "success");
           setCurrentView('theory-quiz');
        } else if (data.jumpStage === 'stage3') {
           setProgress(p => ({ ...p, stage2_theory_quiz_passed: true, stage2_score: 100 }));
           setCurrentView('final-assessment');
           showToast("Đã nhảy đến Giai đoạn 3.", "success");
        }
    } else if (data.jumpStage && data.jumpPass !== SKIP_PASSWORD) {
        showToast("Mật khẩu nhảy giai đoạn sai. Bắt đầu bình thường.", "error");
    }

    setStudentInfo({ ...studentInfo, email: data.email || '', studentName: data.studentName, className: data.className, apiKey: data.apiKey });
    if (!startTime) setStartTime(new Date().toISOString());
    setShowStudentModal(false);

    // Kích hoạt toàn màn hình khi bắt đầu làm bài
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    }
  };

  const handleResume = () => {
    if (!selectedLesson) return;
    const storageKey = `${LOCAL_STORAGE_KEY}_${selectedLesson.id}`;
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    if (saved && saved.studentInfo) {
      setStudentInfo(saved.studentInfo);
      setProgress(saved.progress);
      setAnswersStage2(saved.answersStage2);
      setAnswersStage3(saved.answersStage3);
      setFeedbackStage2(saved.feedbackStage2);
      setFeedbackStage3(saved.feedbackStage3);
      setStartTime(saved.startTime);
      
      // Load Penalty Timer
      if (saved.lockoutUntil && saved.lockoutUntil > Date.now()) {
          setLockoutUntil(saved.lockoutUntil);
          const remaining = Math.ceil((saved.lockoutUntil - Date.now()) / 1000);
          setCountdown(remaining);
      } else {
          setLockoutUntil(0);
          setCountdown(0);
      }
      
      // Strict View Restoration
      if (saved.progress.stage2_theory_quiz_passed && !saved.progress.stage3_assessment_passed) {
          setCurrentView('final-assessment');
      } else if (!saved.progress.stage2_theory_quiz_passed) {
          setCurrentView('theory-quiz');
      } else {
          setCurrentView('introduction');
      }
      
      showToast("Đã khôi phục bài làm cũ.", "info");
    }
    setShowResumeModal(false);
  };

  const handleRestart = () => {
    if (selectedLesson) {
        const storageKey = `${LOCAL_STORAGE_KEY}_${selectedLesson.id}`;
        localStorage.removeItem(storageKey);
    }
    setShowResumeModal(false);
    // Only show Student Modal if we don't have external info
    if (!studentInfo.studentName || !isLockedMode) {
        setShowStudentModal(true);
    }
    
    setProgress(initialProgress);
    setAnswersStage2({});
    setAnswersStage3({});
    setFeedbackStage2(null);
    setFeedbackStage3(null);
    setLockoutUntil(0);
    setCountdown(0);
    cheatWarnings.current = 0;
    setStartTime(new Date().toISOString());
    showToast("Đã xóa dữ liệu cũ. Bắt đầu bài mới.", "info");
  };

  // Skip Functionality (Teacher Cheat)
  const openSkipModal = (stage: 'stage2' | 'stage3') => {
    setSkipTarget(stage);
    setShowSkipModal(true);
  };

  const confirmSkip = async () => {
    if (!skipTarget || !selectedLesson) return;
    setShowSkipModal(false);
    
    if (skipTarget === 'stage2') {
        const updatedProgress = { ...progress, stage2_theory_quiz_passed: true, stage2_score: 100 };
        setProgress(updatedProgress);
        setFeedbackStage2(null); 
        
        saveProgressToLocalStorage(studentInfo, updatedProgress);
        setCongratsData({ title: 'Giai đoạn 2', score: 100, isSkipped: true });
        setShowCongratsModal(true);
        // Will navigate to next stage in modal callback
        
    } else if (skipTarget === 'stage3') {
        // Cập nhật logic: Khi skip stage 3, vẫn phải gửi kết quả về
        const updatedProgress = { ...progress, stage3_assessment_passed: true, stage3_score: 100 };
        setProgress(updatedProgress);
        setFeedbackStage3(null);

        saveProgressToLocalStorage(studentInfo, updatedProgress);
        
        // Show congrats modal AND start submission visual
        setCongratsData({ title: 'Hoàn thành bài học (Giáo viên bỏ qua)', score: 100, isSkipped: true });
        setSheetStatus('submitting');
        setShowCongratsModal(true);
        showToast("Đã bỏ qua Giai đoạn 3. Đang gửi dữ liệu...", "info");
        
        // TRIGGER SUBMISSION (Logic giống hệt executeGrading khi passed)
        const sheetSuccess = await submitResultsToSheet(
             studentInfo.email,
             studentInfo.studentName, 
             studentInfo.className, 
             studentInfo.apiKey || '',
             startTime, 
             updatedProgress, 
             true, // passed
             selectedLesson.title,
             selectedLesson.id,
             answersStage2,
             answersStage3,
             feedbackStage2,
             null, // Feedback is null in skip
             selectedLesson.stage2Questions,
             selectedLesson.stage3Questions
        );

        if(sheetSuccess) {
            setSheetStatus('success');
            showToast("Đã lưu kết quả (Skip) vào Google Sheet.");
        } else {
            setSheetStatus('error');
        }
        
        // HIN Submission
        await sendResultsToHinParent({ ...{studentInfo, progress: updatedProgress, answersStage2, answersStage3, feedbackStage2, feedbackStage3: null, startTime} as AppState, currentView, isMobileMenuOpen }, selectedLesson.title, 100, selectedLesson.stage2Questions, selectedLesson.stage3Questions);
    }
    setSkipTarget(null);
  };

  // Step 1: Pre-check submission (Modal logic)
  const submitQuizCheck = (stageId: 'stage2' | 'stage3') => {
    if (!selectedLesson) return;
    // Check for penalty lock
    if (lockoutUntil > Date.now()) {
        const mins = Math.floor(countdown / 60);
        const secs = countdown % 60;
        showToast(`Bạn phải đợi ${mins}p ${secs}s nữa để nộp lại!`, "error");
        return;
    }

    const questions = stageId === 'stage2' ? selectedLesson.stage2Questions : selectedLesson.stage3Questions;
    const answers = stageId === 'stage2' ? answersStage2 : answersStage3;
    const feedback = stageId === 'stage2' ? feedbackStage2 : feedbackStage3;
    
    // Determine which are locked (previously correct)
    const lockedIndices = feedback 
        ? feedback.filter(f => f.is_correct).map(f => f.question_number - 1) 
        : [];

    // Find missing only among UNLOCKED questions
    const missingIndices = [];
    for(let i = 0; i < questions.length; i++) {
        if (!lockedIndices.includes(i) && !answers[i]) {
            missingIndices.push(i);
        }
    }

    if (missingIndices.length > 0) {
       setUnansweredIds(missingIndices);
       setConfirmModal({
           isOpen: true,
           isWarning: true,
           title: '⚠️ Chưa hoàn thành',
           message: `Bạn còn ${missingIndices.length} câu hỏi chưa trả lời!\nNhững câu này sẽ bị tính 0 điểm nếu nộp ngay.\n\nBạn có muốn xem lại các câu chưa làm không?`,
           cancelLabel: 'Nộp luôn (0 điểm)',
           confirmLabel: 'Xem lại ngay',
           onConfirm: () => {
               // Smart Navigation: Jump to first missing
               setConfirmModal(prev => ({...prev, isOpen: false}));
               setCurrentQIndex(missingIndices[0]);
               scrollToTop();
               showToast("Đã chuyển đến câu hỏi chưa làm.", "info");
           },
           onCancel: () => {
               // Proceed with 0s
               setConfirmModal(prev => ({...prev, isOpen: false}));
               setUnansweredIds([]); // clear highlights
               executeGrading(stageId);
           }
       });
    } else {
        // All good, confirm normal submit
        setUnansweredIds([]);
        setConfirmModal({
           isOpen: true,
           isWarning: false,
           title: 'Xác nhận nộp bài',
           message: 'Bạn có muốn nộp bài để chấm điểm ngay không?',
           cancelLabel: 'Xem lại',
           confirmLabel: 'Nộp bài',
           onConfirm: () => {
               setConfirmModal(prev => ({...prev, isOpen: false}));
               executeGrading(stageId);
           },
           onCancel: () => {
               setConfirmModal(prev => ({...prev, isOpen: false}));
           }
       });
    }
  };

  // Step 2: Actual Execution
  const executeGrading = async (stageId: 'stage2' | 'stage3') => {
    if (!selectedLesson) return;
    const questions = stageId === 'stage2' ? selectedLesson.stage2Questions : selectedLesson.stage3Questions;
    const answers = stageId === 'stage2' ? answersStage2 : answersStage3;
    const currentFeedback = stageId === 'stage2' ? feedbackStage2 : feedbackStage3;

    setIsGrading(true);
    // Smooth scroll to top to show loading overlay full effect
    scrollToTop();

    // 1. Identify Correct Questions (to be locked/skipped)
    const previouslyCorrectFeedback = currentFeedback ? currentFeedback.filter(f => f.is_correct) : [];
    const previouslyCorrectIndices = previouslyCorrectFeedback.map(f => f.question_number - 1);
    const previousCorrectCount = previouslyCorrectFeedback.length;

    // 2. Prepare Subset for Grading
    const questionsToGrade: QuestionToGrade[] = [];
    questions.forEach((q, index) => {
        if (!previouslyCorrectIndices.includes(index)) {
            questionsToGrade.push({
                originalIndex: index,
                question: q,
                studentAnswer: answers[index] || ''
            });
        }
    });

    if (questionsToGrade.length === 0) {
        setIsGrading(false);
        showToast("Bạn đã hoàn thành hết các câu hỏi rồi!", "success");
        return;
    }

    try {
      // 3. Call AI with SUBSET
      const result = await gradeSubmission(questionsToGrade, previousCorrectCount, questions.length, studentInfo.apiKey);
      
      const newFeedbackSubset = result.feedback;

      // 4. Merge Feedback
      const mergedFeedback = [
          ...previouslyCorrectFeedback,
          ...newFeedbackSubset
      ].sort((a, b) => a.question_number - b.question_number);

      if (stageId === 'stage2') {
        setFeedbackStage2(mergedFeedback);
        
        // Strict Passing Logic
        // The API returns 'passed' if score >= PASSING_SCORE (90%)
        const isPassed = result.passed; 
        
        if (!isPassed) {
             // PENALTY LOGIC: Calculate wrong answers from the CURRENT batch only
             const wrongCount = newFeedbackSubset.filter(f => !f.is_correct).length;
             
             // Penalty: 15 seconds per wrong answer
             const penaltySeconds = Math.max(1, wrongCount) * 15;
             const penaltyMs = penaltySeconds * 1000;
             const newLockUntil = Date.now() + penaltyMs;
             
             setLockoutUntil(newLockUntil);
             setCountdown(penaltySeconds);
             
             // Save immediately with lock
             // IMPORTANT: Force stage2_theory_quiz_passed = false to prevent proceeding
             const updatedProgress = { ...progress, stage2_score: result.score, stage2_theory_quiz_passed: false };
             setProgress(updatedProgress);
             saveProgressToLocalStorage(studentInfo, updatedProgress, answersStage2, answersStage3, mergedFeedback, feedbackStage3, newLockUntil);

             const fails = updatedProgress.retryFails.stage2 + 1;
             setProgress(p => ({...p, retryFails: {...p.retryFails, stage2: fails}}));
             
             showToast(`Chưa đạt yêu cầu (${Math.round(result.score)}%). Bạn phải đợi ${penaltySeconds}s để ôn lại!`, "error");
        } else {
             // Passed Stage 2
             const updatedProgress = { ...progress, stage2_score: result.score, stage2_theory_quiz_passed: true };
             setProgress(updatedProgress);
             // Clear any locks
             setLockoutUntil(0);
             setCountdown(0);
             saveProgressToLocalStorage(studentInfo, updatedProgress, answersStage2, answersStage3, mergedFeedback, feedbackStage3, 0);

             setCongratsData({ title: 'Giai đoạn 2', score: result.score, isSkipped: false });
             setShowCongratsModal(true);
             showToast(`Chúc mừng! Bạn đạt ${Math.round(result.score)}%`, "success");
        }

      } else {
        // Stage 3 Logic - UPDATED: Apply retry logic and 15s penalty
        setFeedbackStage3(mergedFeedback);
        
        const isPassed = result.passed; 

        if (isPassed) {
           const updatedProgress = { ...progress, stage3_score: result.score, stage3_assessment_passed: true };
           setProgress(updatedProgress);
           
           // Clear locks if any
           setLockoutUntil(0);
           setCountdown(0);

           saveProgressToLocalStorage(studentInfo, updatedProgress, answersStage2, answersStage3, feedbackStage2, mergedFeedback, 0);

           setCongratsData({ title: 'Hoàn thành bài học', score: result.score, isSkipped: false });
           // Open modal immediately to show "Thank you" and submission table
           setSheetStatus('submitting');
           setShowCongratsModal(true);
           showToast(`Xuất sắc! Bạn đạt ${Math.round(result.score)}%`, "success");
           
           // Priority: Google Sheet Submission First
           const sheetSuccess = await submitResultsToSheet(
             studentInfo.email,
             studentInfo.studentName, 
             studentInfo.className, 
             studentInfo.apiKey || '',
             startTime, 
             updatedProgress, 
             true, 
             selectedLesson.title,
             selectedLesson.id,
             answersStage2,
             answersStage3,
             feedbackStage2,
             mergedFeedback,
             selectedLesson.stage2Questions,
             selectedLesson.stage3Questions
           );
           
           if(sheetSuccess) {
               setSheetStatus('success');
               showToast("Đã lưu kết quả của bạn vào Google Sheet.");
           } else {
               setSheetStatus('error');
           }
           
           // Then HIN Parent submission
           await sendResultsToHinParent({ ...{studentInfo, progress: updatedProgress, answersStage2, answersStage3, feedbackStage2, feedbackStage3: mergedFeedback, startTime} as AppState, currentView, isMobileMenuOpen }, selectedLesson.title, result.score, selectedLesson.stage2Questions, selectedLesson.stage3Questions);
        } else {
           // FAILED STAGE 3 -> PENALTY LOGIC (Same as Stage 2 now)
           const wrongCount = newFeedbackSubset.filter(f => !f.is_correct).length;
           
           // Penalty: 15 seconds per wrong answer
           const penaltySeconds = Math.max(1, wrongCount) * 15;
           const penaltyMs = penaltySeconds * 1000;
           const newLockUntil = Date.now() + penaltyMs;

           setLockoutUntil(newLockUntil);
           setCountdown(penaltySeconds);

           // Mark as not passed
           const updatedProgress = { ...progress, stage3_score: result.score, stage3_assessment_passed: false };
           setProgress(updatedProgress);
           
           // Save with lock
           saveProgressToLocalStorage(studentInfo, updatedProgress, answersStage2, answersStage3, feedbackStage2, mergedFeedback, newLockUntil);

           const fails = updatedProgress.retryFails.stage3 + 1;
           setProgress(p => ({...p, retryFails: {...p.retryFails, stage3: fails}}));
           
           showToast(`Chưa đạt yêu cầu (${Math.round(result.score)}%). Bạn phải đợi ${penaltySeconds}s để nộp lại!`, "error");

           // ALWAYS LOG TO SHEET AS REQUESTED (Even on Fail)
           await submitResultsToSheet(
             studentInfo.email,
             studentInfo.studentName, 
             studentInfo.className, 
             studentInfo.apiKey || '',
             startTime, 
             updatedProgress, 
             false, 
             selectedLesson.title,
             selectedLesson.id,
             answersStage2,
             answersStage3,
             feedbackStage2,
             mergedFeedback,
             selectedLesson.stage2Questions,
             selectedLesson.stage3Questions
           );
        }
      }
    } catch (e) {
      console.error(e);
      // Friendly Error Message
      showToast("Harry đang bận xử lý nhiều bài quá, bạn vui lòng ấn nộp lại giúp mình nhé!", "error");
    } finally {
      setIsGrading(false);
      // Ensure we are at the top to see feedback
      scrollToTop();
    }
  };

  // Views
  const renderSidebar = () => {
    if (!selectedLesson) return null;
    return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:sticky lg:top-4 lg:translate-x-0 lg:h-[calc(100vh-2rem)] lg:shadow-none lg:block border border-gray-100 rounded-xl m-4 lg:m-0 flex flex-col`}>
       <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
         {/* Button Back to Library - HIDDEN IF LOCKED MODE */}
         {!isLockedMode && (
             <button 
               onClick={() => {
                  if(confirm("Bạn có chắc chắn muốn quay lại thư viện? Dữ liệu chưa lưu sẽ mất.")) {
                      setSelectedLesson(null);
                      setStartTime('');
                      setCurrentView('introduction');
                      window.history.replaceState(null, '', window.location.pathname); // Clear URL
                  }
               }}
               className="mb-6 text-gray-500 hover:text-hin-blue text-sm font-bold flex items-center gap-2"
             >
                 <i className="fas fa-arrow-left"></i> Thư viện
             </button>
         )}

         <h3 className="text-xl font-heading font-bold text-hin-blue mb-6 border-b pb-4 flex items-center gap-2">
            <i className="fas fa-graduation-cap"></i> Unit {selectedLesson.unitNumber}
         </h3>
         
         <div className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
           <p className="text-xs text-gray-500 font-bold uppercase mb-3 border-b border-gray-200 pb-2">Thống kê bài làm</p>
           
           {/* Stage 2 Stats */}
           <div className="mb-4">
               <div className="flex justify-between items-center mb-1">
                   <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${progress.stage2_theory_quiz_passed ? 'bg-green-500' : 'bg-hin-gold'}`}></span>
                       <span className="text-xs font-bold text-gray-700">GĐ2: Lý thuyết</span>
                   </div>
                   <span className="text-xs font-bold text-hin-blue">
                       {Object.keys(answersStage2).length}/{selectedLesson.stage2Questions.length}
                   </span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                   <div className={`${progress.stage2_theory_quiz_passed ? 'bg-green-500' : 'bg-hin-gold'} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, (Object.keys(answersStage2).length / selectedLesson.stage2Questions.length) * 100)}%` }}></div>
               </div>
           </div>

           {/* Stage 3 Stats */}
           <div>
               <div className="flex justify-between items-center mb-1">
                   <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${progress.stage3_assessment_passed ? 'bg-green-500' : 'bg-blue-400'}`}></span>
                        <span className="text-xs font-bold text-gray-700">GĐ3: Thực hành</span>
                   </div>
                   <span className="text-xs font-bold text-hin-blue">
                       {Object.keys(answersStage3).length}/{selectedLesson.stage3Questions.length}
                   </span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                   <div className={`${progress.stage3_assessment_passed ? 'bg-green-500' : 'bg-blue-400'} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, (Object.keys(answersStage3).length / selectedLesson.stage3Questions.length) * 100)}%` }}></div>
               </div>
           </div>
         </div>

         <nav className="space-y-4">
            <div>
                <div className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Lý thuyết</div>
                <button 
                onClick={() => { setCurrentView('introduction'); setIsMobileMenuOpen(false); scrollToTop(); }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${currentView === 'introduction' ? 'bg-hin-blue text-white shadow-md shadow-blue-200' : 'text-gray-600 hover:bg-gray-50 hover:text-hin-blue'}`}
                >
                <i className="fas fa-book-open w-6 text-center"></i> Hướng dẫn & Lý thuyết
                </button>
            </div>

            <div>
                <div className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Bài tập</div>
                <button 
                onClick={() => { if(progress.stage1_theory_read) { setCurrentView('theory-quiz'); setIsMobileMenuOpen(false); setCurrentQIndex(0); scrollToTop(); } }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all mb-2 ${currentView === 'theory-quiz' ? 'bg-hin-blue text-white shadow-md shadow-blue-200' : 'text-gray-600 hover:bg-gray-50 hover:text-hin-blue'} ${!progress.stage1_theory_read ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                >
                <i className="fas fa-question-circle w-6 text-center"></i> Kiểm tra Lý thuyết
                {!progress.stage1_theory_read && <i className="fas fa-lock ml-auto text-gray-400"></i>}
                {progress.stage2_theory_quiz_passed && <i className="fas fa-check-circle text-green-400 ml-auto"></i>}
                </button>

                <button 
                onClick={() => { if(progress.stage2_theory_quiz_passed) { setCurrentView('final-assessment'); setIsMobileMenuOpen(false); setCurrentQIndex(0); scrollToTop(); } }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${currentView === 'final-assessment' ? 'bg-hin-blue text-white shadow-md shadow-blue-200' : 'text-gray-600 hover:bg-gray-50 hover:text-hin-blue'} ${!progress.stage2_theory_quiz_passed ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                >
                <i className="fas fa-pencil-ruler w-6 text-center"></i> Thực hành
                {!progress.stage2_theory_quiz_passed && <i className="fas fa-lock ml-auto text-gray-400"></i>}
                {progress.stage3_assessment_passed && <i className="fas fa-check-circle text-green-400 ml-auto"></i>}
                </button>
            </div>
         </nav>
       </div>
       
       {/* Sidebar Footer: Anti-Cheat Toggle */}
       <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
          <button 
            onClick={toggleAntiCheat}
            className={`w-full text-xs font-bold flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${antiCheatEnabled ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-red-500 bg-red-50 hover:bg-red-100'}`}
          >
             <i className={`fas ${antiCheatEnabled ? 'fa-shield-alt' : 'fa-exclamation-triangle'}`}></i>
             {antiCheatEnabled ? 'Anti-Cheat: ON' : 'Anti-Cheat: OFF'}
          </button>
       </div>
    </aside>
  )};

  const renderIntro = () => {
    if (!selectedLesson) return null;

    return (
    <div className="space-y-8 pb-32">
      <div className="bg-white p-8 rounded-2xl shadow-sm anim-fade-in border-l-8 border-hin-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <i className="fas fa-temperature-high text-9xl"></i>
        </div>
        <div className="border-b pb-6 mb-6">
            <h2 className="text-3xl font-heading font-black text-hin-blue mb-2">Mục tiêu Bài học</h2>
            <p className="text-gray-500 font-medium">Unit {selectedLesson.unitNumber} - Lesson {selectedLesson.lessonNumber}: {selectedLesson.title}</p>
        </div>
        
        <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-hin-blue flex-shrink-0 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200">
                <i className="fas fa-spell-check"></i>
            </div>
            <div>
              <strong className="block text-lg text-hin-blue mb-1">Mô tả bài học</strong>
              <p className="text-gray-600 leading-relaxed">{selectedLesson.description}</p>
            </div>
        </div>

        {/* Dynamic Theory Content */}
        {selectedLesson.theoryContent ? (
             <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-2xl font-heading font-bold text-hin-blue mb-6">Kiến thức chi tiết</h3>
                <div dangerouslySetInnerHTML={{ __html: selectedLesson.theoryContent }} />
             </div>
        ) : (
            /* Fallback for lessons without content */
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-hin-blue flex-shrink-0 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200">
                    <i className="fas fa-chart-area"></i>
                </div>
                <div>
                <strong className="block text-lg text-hin-blue mb-1">Kiến thức trọng tâm</strong>
                <p className="text-gray-600 leading-relaxed">Nắm vững từ vựng và cấu trúc ngữ pháp liên quan đến chủ đề bài học.</p>
                </div>
            </div>
        )}
      </div>
      
      {!selectedLesson.theoryContent && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-center text-gray-500 italic">Chi tiết lý thuyết sẽ được cập nhật cụ thể cho từng bài học.</p>
        </div>
      )}

      {/* Start Button CTA */}
      <div className="flex justify-center mt-12 mb-8">
         <button 
           onClick={async () => { 
                try {
                    if (document.documentElement.requestFullscreen) {
                        await document.documentElement.requestFullscreen();
                    }
                } catch(e) {
                    console.error("Fullscreen error", e);
                }
                setCurrentView('theory-quiz'); 
                scrollToTop(); 
           }}
           className="bg-hin-blue text-white text-xl font-bold py-5 px-12 rounded-full shadow-xl shadow-blue-200 hover:bg-[#081e4d] hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-4 animate-bounce-short"
         >
           <span>Bắt đầu Bài kiểm tra (Yêu cầu toàn màn hình)</span> <i className="fas fa-arrow-right"></i>
         </button>
      </div>
    </div>
  )};

  const renderQuizStage = (stageId: 'stage2' | 'stage3') => {
    if (!selectedLesson) return null;
    const questions = stageId === 'stage2' ? selectedLesson.stage2Questions : selectedLesson.stage3Questions;
    const answers = stageId === 'stage2' ? answersStage2 : answersStage3;
    const feedback = stageId === 'stage2' ? feedbackStage2 : feedbackStage3;
    const setAnswers = stageId === 'stage2' ? setAnswersStage2 : setAnswersStage3;

    // Determine current question based on index state (pagination)
    const currentQ = questions[currentQIndex];
    if (!currentQ) return <div>Không có dữ liệu câu hỏi.</div>;

    const currentFeedback = feedback?.find(f => f.question_number === currentQIndex + 1);
    const isCorrect = currentFeedback?.is_correct;
    
    // Check if review mode (feedback exists)
    const isReview = !!feedback;
    const isLastQuestion = currentQIndex === questions.length - 1;

    // Strict Gating Logic
    const isStage2Passed = progress.stage2_theory_quiz_passed;
    const isStage3Passed = progress.stage3_assessment_passed;

    return (
      <>
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm anim-fade-in min-h-[600px] flex flex-col border border-gray-100 relative">
        {/* Stage Hero Header (Matches HTML stage-hero) */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100 mb-10">
           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md text-hin-blue text-3xl flex-shrink-0">
             <i className={`fas ${stageId === 'stage2' ? 'fa-question' : 'fa-pen-nib'}`}></i>
           </div>
           <div className="flex-grow text-center md:text-left">
             <h2 className="text-2xl font-heading font-black text-hin-blue m-0 mb-2">
               {stageId === 'stage2' ? 'Giai đoạn 2: Kiểm tra Lý thuyết' : 'Giai đoạn 3: Bài kiểm tra Thực hành'}
             </h2>
             <p className="text-gray-600 m-0 text-lg">
               {stageId === 'stage2' ? 'Trả lời đúng 90% để mở khóa phần tiếp theo.' : 'Áp dụng kiến thức vào thực tế. Cần 90% để hoàn thành.'}
             </p>
           </div>
           
           {/* Visual Question Navigator (Quick Nav) */}
           <div className="w-full md:w-auto bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <div className="grid grid-cols-10 gap-2 mb-2">
                {questions.map((_, idx) => {
                   // Logic for Quick Nav Colors
                   let dotClass = 'bg-gray-200 hover:bg-gray-300'; // Default: Unanswered
                   
                   if (answers[idx]) dotClass = 'bg-green-200 hover:bg-green-300 text-green-700'; // Answered
                   if (idx === currentQIndex) dotClass = 'bg-hin-blue text-white ring-2 ring-offset-2 ring-hin-blue scale-110 z-10'; // Current

                   // Review mode colors
                   if (feedback) {
                      const fb = feedback.find(f => f.question_number === idx + 1);
                      if (fb) dotClass = fb.is_correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
                   }
                   
                   // Highlight unanswered warning
                   const isUnansweredWarning = unansweredIds.includes(idx);
                   const warningClass = isUnansweredWarning ? 'animate-pulse ring-2 ring-red-500 bg-red-400 text-white' : '';

                   return (
                     <button 
                       key={idx} 
                       onClick={() => { setCurrentQIndex(idx); scrollToTop(); }}
                       className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all duration-200 ${dotClass} ${warningClass}`} 
                       title={`Câu ${idx+1}`}
                     >
                        {idx + 1}
                     </button>
                   );
                })}
             </div>
             <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase mt-2">
                 <span>Tiến độ</span>
                 <span>{Object.keys(answers).length}/{questions.length}</span>
             </div>
             <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1">
                 <div className="bg-hin-blue h-1.5 rounded-full transition-all duration-300" style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}></div>
             </div>
           </div>
        </div>

        {/* Feedback Summary Block if Review */}
        {isReview && currentQIndex === 0 && (
           <div className={`mb-8 p-8 rounded-2xl text-center border-2 ${progress[`${stageId}_score`] >= PASSING_SCORE ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} animate-slide-in`}>
              <div className="flex justify-center items-center gap-2 mb-2">
                 <span className={`text-6xl font-black ${progress[`${stageId}_score`] >= PASSING_SCORE ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.round(progress[`${stageId}_score`])}%
                 </span>
              </div>
              <div className={`text-2xl font-bold uppercase tracking-widest ${progress[`${stageId}_score`] >= PASSING_SCORE ? 'text-green-700' : 'text-red-700'}`}>
                 {progress[`${stageId}_score`] >= PASSING_SCORE ? 'ĐẠT YÊU CẦU' : 'CHƯA ĐẠT'}
              </div>
              <p className="mt-4 text-gray-700 font-medium text-lg">
                {progress[`${stageId}_score`] >= PASSING_SCORE 
                    ? 'Tuyệt vời! Bạn đã nắm vững kiến thức.' 
                    : 'Đừng lo, hãy xem kỹ lời giải thích bên dưới và thử lại nhé!'}
              </p>
           </div>
        )}

        {/* Question */}
        <div className="flex-grow">
           <QuizQuestion 
              question={currentQ} 
              index={currentQIndex} 
              answer={answers[currentQIndex] || ''}
              onAnswerChange={(val) => setAnswers(prev => ({...prev, [currentQIndex]: val}))}
              disabled={(isReview && isCorrect === true) || countdown > 0} // Block if correct OR if penalty active (Stage 2/3)
              isCorrect={isReview ? isCorrect : undefined}
           />
           
           {/* AI Explanation (Inline Feedback Card) */}
           {isReview && currentFeedback && (
             <div className={`mt-8 rounded-2xl overflow-hidden shadow-lg anim-fade-in border ${currentFeedback.is_correct ? 'border-green-200' : 'border-red-200'}`}>
                <div className={`p-4 px-6 flex items-center gap-4 font-bold text-lg ${currentFeedback.is_correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm ${currentFeedback.is_correct ? 'bg-white text-green-600' : 'bg-white text-red-600'}`}>
                     <i className={`fas ${currentFeedback.is_correct ? 'fa-check' : 'fa-times'}`}></i>
                   </div>
                   <h4>{currentFeedback.is_correct ? 'Chính xác! Giải thích chi tiết:' : 'Chưa đúng. Harry gợi ý:'}</h4>
                </div>
                <div className="p-8 bg-white text-gray-800 markdown-content text-lg leading-relaxed">
                   <div dangerouslySetInnerHTML={{ __html: window.marked ? window.marked.parse(currentFeedback.explanation) : currentFeedback.explanation }} />
                </div>
             </div>
           )}
           {/* Small Spacer inside card for visual breathing room */}
           <div className="h-10"></div>
        </div>
      </div>
      
      {/* Spacer to allow scrolling past fixed footer */}
      <div className="h-24 md:h-32 w-full"></div>

      {/* Navigation - FIXED BOTTOM ON ALL SCREENS */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] py-2 px-4 md:py-3 md:px-6">
           <div className="container mx-auto max-w-[1600px] flex justify-between items-center gap-4 relative">
               
               {/* Penalty Overlay for Bottom Bar */}
               {countdown > 0 && (
                   <div className="absolute inset-0 bg-red-600/95 text-white flex items-center justify-center z-50 rounded-lg backdrop-blur-md">
                       <i className="fas fa-lock mr-3 text-xl animate-bounce-short"></i>
                       <span className="font-bold text-lg">
                           Vui lòng ôn tập lại kiến thức trong: {Math.floor(countdown / 60)} phút {countdown % 60} giây
                       </span>
                   </div>
               )}

               {/* Left Control */}
               <button 
                 onClick={() => { setCurrentQIndex(prev => Math.max(0, prev - 1)); scrollToTop(); }}
                 disabled={currentQIndex === 0}
                 className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 transition-colors shadow-sm text-sm md:text-base"
               >
                 <i className="fas fa-arrow-left"></i> <span className="hidden md:inline">Câu trước</span>
               </button>
               
               {/* Center: Progress Text (Mobile) or Skip (Desktop) */}
               <div className="flex items-center gap-2">
                   {!isReview && (
                        <button 
                            onClick={() => openSkipModal(stageId)}
                            className="hidden lg:flex px-3 py-1.5 text-gray-300 hover:text-red-400 text-xs font-bold uppercase tracking-wider items-center gap-2 transition-colors border border-transparent hover:border-red-100 rounded-lg"
                            title="Giáo viên: Bỏ qua giai đoạn này"
                        >
                            <i className="fas fa-forward"></i> Skip Stage
                        </button>
                   )}
                   <span className="md:hidden text-sm font-bold text-gray-400">
                       {currentQIndex + 1} / {questions.length}
                   </span>
               </div>

               {/* Right Control */}
               {isLastQuestion ? (
                  <button 
                    onClick={() => {
                        if (isReview) {
                            if (stageId === 'stage2') {
                                if (isStage2Passed) {
                                    setCurrentView('final-assessment');
                                } else {
                                    // Should be handled by UI state (button should say Retry), but strictly:
                                    submitQuizCheck(stageId);
                                }
                            } else if (stageId === 'stage3') {
                                if (!isStage3Passed) {
                                    submitQuizCheck(stageId); // Retry Stage 3
                                } else {
                                    setCurrentView('introduction'); // Finish
                                }
                            } else {
                                setCurrentView('introduction');
                            }
                        } else {
                            submitQuizCheck(stageId);
                        }
                    }}
                    className={`px-6 py-2.5 rounded-xl font-black shadow-lg flex items-center gap-3 transition-transform hover:-translate-y-1 active:scale-95 text-sm md:text-base
                        ${isReview && ((stageId === 'stage2' && !isStage2Passed) || (stageId === 'stage3' && !isStage3Passed))
                             ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-200'  // Retry Button Style
                             : 'bg-hin-gold text-hin-blue hover:bg-yellow-400 shadow-yellow-200/50' // Default Submit/Next Style
                        }`}
                  >
                     <span>
                         {isReview 
                            ? ((stageId === 'stage2' && !isStage2Passed) || (stageId === 'stage3' && !isStage3Passed) ? 'Nộp lại (Retry)' : 'Tiếp tục') 
                            : 'Nộp bài'
                         }
                     </span> 
                     <i className={`fas ${isReview && ((stageId === 'stage2' && !isStage2Passed) || (stageId === 'stage3' && !isStage3Passed)) ? 'fa-redo' : 'fa-check-circle'} text-lg`}></i>
                  </button>
               ) : (
                  <button 
                    onClick={() => { setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1)); scrollToTop(); }}
                    className="px-5 py-2.5 rounded-xl bg-hin-blue text-white font-bold hover:bg-[#081e4d] shadow-lg shadow-blue-200 flex items-center gap-3 transition-transform hover:-translate-y-1 active:scale-95 text-sm md:text-base"
                  >
                    <span className="hidden md:inline">Câu tiếp theo</span> <i className="fas fa-arrow-right"></i>
                  </button>
               )}
           </div>
      </div>
      </>
    );
  };

  // MAIN RENDER SWITCH
  if (!selectedLesson) {
      // 1. Cơ chế tạo Thư viện (Lesson Library)
      return (
          <>
             <ToastContainer toasts={toasts} removeToast={removeToast} />
             <LessonSelection onSelectLesson={(id) => handleLessonSelection(id)} />
          </>
      );
  }

  // APP VIEW (LESSON ACTIVE)
  return (
    <div className="min-h-screen bg-bg-main flex flex-col md:flex-row font-body text-gray-800">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Loading Overlay */}
      {isGrading && <LoadingOverlay message="Đang chấm bài..." />}

      {/* Modals */}
      {showStudentModal && <StudentInfoModal onSubmit={handleStudentSubmit} onTeacherUnlock={() => setAntiCheatEnabled(false)} />}
      {showResumeModal && <ResumeModal onResume={handleResume} onRestart={handleRestart} />}
      {showCongratsModal && <CongratsModal 
        title={congratsData.title} 
        score={congratsData.score} 
        studentInfo={studentInfo} 
        sheetStatus={sheetStatus} // Pass sheet status to modal
        onNext={() => {
        setShowCongratsModal(false);
        if (congratsData.isSkipped) {
            if (congratsData.title.includes('Giai đoạn 2')) setCurrentView('final-assessment');
        } else {
             // Normal flow
             // Gating check: Only move to final assessment if Stage 2 is passed
             if (currentView === 'theory-quiz' && progress.stage2_theory_quiz_passed) {
                 setCurrentView('final-assessment');
             }
        }
        scrollToTop();
      }} />}
      {showSkipModal && <SkipPasswordModal onClose={() => setShowSkipModal(false)} onConfirm={confirmSkip} />}
      
      <ConfirmationModal 
          isOpen={confirmModal.isOpen} 
          title={confirmModal.title}
          message={confirmModal.message}
          isWarning={confirmModal.isWarning}
          confirmLabel={confirmModal.confirmLabel}
          cancelLabel={confirmModal.cancelLabel}
          onConfirm={confirmModal.onConfirm}
          onCancel={confirmModal.onCancel}
      />

      {/* Mobile Header */}
      <div className="lg:hidden bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-40 border-b border-gray-200">
        <h1 className="text-lg font-heading font-bold text-hin-blue flex items-center gap-2">
            <i className="fas fa-graduation-cap text-hin-gold"></i> Harry IELTS
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 focus:outline-none p-2 rounded hover:bg-gray-100">
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden w-full max-w-7xl mx-auto">
         {/* Top Info Bar (Desktop) */}
         <div className="hidden lg:flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                   <i className="fas fa-user"></i>
               </div>
               <div>
                   <h2 className="text-sm font-bold text-gray-400 uppercase">Học viên</h2>
                   <p className="font-bold text-hin-blue text-lg leading-none">{studentInfo.studentName || 'Guest Student'}</p>
               </div>
            </div>
            
            <div className="flex items-center gap-6">
                 {progress.stage2_score > 0 && (
                     <div className="text-right">
                         <h2 className="text-xs font-bold text-gray-400 uppercase">GĐ2: Lý thuyết</h2>
                         <p className={`font-bold ${progress.stage2_theory_quiz_passed ? 'text-green-600' : 'text-gray-600'}`}>
                             {Math.round(progress.stage2_score)}%
                         </p>
                     </div>
                 )}
                 {progress.stage3_score > 0 && (
                     <div className="text-right">
                         <h2 className="text-xs font-bold text-gray-400 uppercase">GĐ3: Thực hành</h2>
                         <p className={`font-bold ${progress.stage3_assessment_passed ? 'text-green-600' : 'text-gray-600'}`}>
                             {Math.round(progress.stage3_score)}%
                         </p>
                     </div>
                 )}
                 <div className="h-8 w-px bg-gray-200"></div>
                 <div className="text-right">
                     <h2 className="text-xs font-bold text-gray-400 uppercase">Trạng thái</h2>
                     <p className="font-bold text-green-500 flex items-center gap-1">
                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                     </p>
                 </div>
            </div>
         </div>

         {currentView === 'introduction' && renderIntro()}
         {currentView === 'theory-quiz' && renderQuizStage('stage2')}
         {currentView === 'final-assessment' && renderQuizStage('stage3')}
      </main>

      {/* Overlay for Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default App;