import { WEB_APP_URL } from '../constants';
import { AppState, UserProgress, Question, Feedback, Lesson } from '../types';

// ==========================================
// GAS API INTEGRATION (As per Markdown)
// ==========================================

export async function fetchGasGET(action: string, extraParams = '') {
  try {
    const res = await fetch(`${WEB_APP_URL}?action=${action}${extraParams}`);
    return await res.json();
  } catch (error) {
    console.error("API GET Error:", error);
    return null;
  }
}

export async function fetchAndShowLibrary(): Promise<any[]> {
  const cacheKey = 'hin_cache_list';
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    // If cached, return it, but trigger a background update
    fetchGasGET('listExercises').then(data => {
      if (data?.ok && data.exercises) {
        localStorage.setItem(cacheKey, JSON.stringify(data.exercises));
      }
    });
    return JSON.parse(cached);
  }

  // If no cache, await the fetch
  const data = await fetchGasGET('listExercises');
  if (data?.ok && data.exercises) {
    localStorage.setItem(cacheKey, JSON.stringify(data.exercises));
    return data.exercises;
  }
  return [];
}

export function formatExerciseData(rawEx: any): Lesson {
    // Format the reading exercise structure from GAS into our App's expected Lesson structure
    // Since "phần xác giữ nguyên", we must map their paragraphs/sentences into theory/questions.
    
    // 1. Meta Data
    const meta = rawEx.meta || {};
    
    let theoryHtml = `<div class="space-y-4">`;
    if (rawEx.paragraphs) {
        theoryHtml += rawEx.paragraphs.map((p: any) => `
            <div class="bg-white p-4 rounded shadow-sm border">
                <h3 class="font-bold border-b pb-2 mb-2">Paragraph ${p.para_id}</h3>
                <p>${p.text}</p>
            </div>
        `).join('');
    }
    theoryHtml += `</div>`;

    // Try to map to Grammar Stage 2/3 format
    const stage2: Question[] = [];
    const stage3: Question[] = [];

    // Map Sentences to Stage 2 True/False or MCQ
    if (rawEx.sentences) {
        rawEx.sentences.forEach((s: any, idx: number) => {
            stage2.push({
                type: 'tf',
                part: `Reading: Sentence Analysis (Para ${s.para_id})`,
                question: `${s.core}`,
                instruction: `Is this the main idea? Role: ${s.role_label}`,
                answer: s.role === 'main' ? "Đúng" : "Sai"
            });
        });
    }

    // Map Headings to Stage 3 Matching
    if (rawEx.headings && rawEx.headings.length > 0) {
        const leftItems: string[] = [];
        const rightItems: string[] = [];
        const answers: string[] = [];
        
        // Ensure unique right items (headings)
        rawEx.headings.forEach((h: any) => {
             rightItems.push(`${h.heading_id}. ${h.text}`);
        });

        // Get left items (paragraphs)
        if (rawEx.paragraphs) {
           rawEx.paragraphs.forEach((p: any) => {
               leftItems.push(`${p.para_id}. Paragraph ${p.para_id}`);
               
               // Find correct heading for this paragraph
               const correctHeading = rawEx.headings.find((h: any) => h.correct_para === p.para_id);
               if (correctHeading) {
                   answers.push(`${p.para_id}-${correctHeading.heading_id}`);
               }
           });
        }
        
        if (leftItems.length > 0 && rightItems.length > 0) {
            stage3.push({
                type: 'matching',
                part: 'Reading: Headings Matching',
                instruction: 'Match the correct heading to each paragraph.',
                question: 'Match the paragraphs with their headings:',
                left_items: leftItems,
                right_items: rightItems,
                answer: answers.join(',')
            });
        }
    }

    return {
        id: meta.id || rawEx.id || "unknown",
        title: meta.title || rawEx.title || "Untitled",
        description: meta.description || rawEx.description || "",
        book: rawEx.topic || "Reading Module",
        unitNumber: 1, 
        lessonNumber: 1,
        theoryContent: theoryHtml,
        stage2Questions: stage2,
        stage3Questions: stage3
    };
}

export async function autoLoadExercise(exId: string): Promise<Lesson | null> {
  const cacheKey = `hin_cache_ex_${exId}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      // We stored formatted Lesson
      return parsed;
    } catch (e) {}
  }

  const data = await fetchGasGET('getExercise', `&ex=${exId}`);
  if (data?.ok && data.exercise) {
    const formatted = formatExerciseData(data.exercise);
    localStorage.setItem(cacheKey, JSON.stringify(formatted));
    return formatted;
  }
  return null;
}

// Helper callback for showing toast from service (optional, or rely on return value)
// We will return the status and let App.tsx handle UI, but we log exactly as requested.

export async function submitResultsToSheet(
    email: string,
    studentName: string, 
    studentClass: string,
    apiKey: string,
    startTime: string,
    progress: UserProgress,
    isPassed: boolean,
    lessonTitle: string,
    lessonId: string,
    answersStage2: Record<number, string>,
    answersStage3: Record<number, string>,
    feedbackStage2: Feedback[] | null,
    feedbackStage3: Feedback[] | null,
    questionsStage2: Question[],
    questionsStage3: Question[]
) {
    // Chỉ gửi khi có mail học sinh và URL đã được cấu hình (logic từ prompt)
    if (!email || WEB_APP_URL.includes('URL_GOOGLE_APPS_SCRIPT')) {
        console.log("Thông tin email hoặc WEB_APP_URL chưa có, bỏ qua việc gửi lên Google Sheet.");
        return false;
    }

    // 1. TỔNG HỢP BÀI LÀM CHI TIẾT
    const detailedSubmission = {
        stage2: {
            score: progress.stage2_score,
            passed: progress.stage2_theory_quiz_passed,
            questions: [] as any[]
        },
        stage3: {
            score: progress.stage3_score,
            passed: progress.stage3_assessment_passed,
            questions: [] as any[]
        }
    };
    
    // Map Stage 2 Questions
    questionsStage2.forEach((q, index) => {
        detailedSubmission.stage2.questions.push({
            questionNumber: index + 1, 
            part: q.part, 
            type: q.type,
            questionText: q.question || q.instruction,
            studentAnswer: answersStage2[index] || "Chưa trả lời",
            correctAnswer: q.answer,
            isCorrect: feedbackStage2?.find(fb => fb.question_number === index + 1)?.is_correct ?? null
        });
    });

    // Map Stage 3 Questions
    questionsStage3.forEach((q, index) => {
        detailedSubmission.stage3.questions.push({
            questionNumber: index + 1, 
            part: q.part, 
            type: q.type,
            questionText: q.question || q.instruction,
            studentAnswer: answersStage3[index] || "Chưa trả lời",
            correctAnswer: q.answer,
            isCorrect: feedbackStage3?.find(fb => fb.question_number === index + 1)?.is_correct ?? null
        });
    });

    // 2. TẠO GÓI DỮ LIỆU (PAYLOAD) DẠNG OBJECT
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const durationSeconds = startTime ? Math.round((new Date().getTime() - new Date(startTime).getTime()) / 1000) : 0;
    const timeSpentStr = formatTime(durationSeconds);

    const payload = {
        email: email || "N/A",
        studentName: studentName || "N/A",
        className: studentClass || "N/A",
        usedApiKey: apiKey || "",
        lessonId: lessonId || "unknown",
        lessonTitle: lessonTitle,
        stage2Score: progress.stage2_score,
        stage3Score: progress.stage3_score,
        timeSpentStr: timeSpentStr,
        detailsStage2: JSON.stringify(detailedSubmission.stage2),
        detailsStage3: JSON.stringify(detailedSubmission.stage3),
        timestamp: new Date().toISOString()
    };

    console.log("Chuẩn bị gửi kết quả chi tiết tới Google Sheet:", payload);

    // 3. GỬI DỮ LIỆU DƯỚI DẠNG CHUỖI JSON ĐỂ BYPASS CORS
    try {
        // Sử dụng 'Content-Type': 'text/plain;charset=utf-8' để tránh "preflight request" (OPTIONS) gây lỗi CORS.
        await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
        });
        
        // LOGIC CHÍNH XÁC TỪ YÊU CẦU:
        console.log('Đã gửi kết quả lên Google Sheet thành công (đã bypass CORS).');
        // Toast sẽ được trigger ở App.tsx dựa trên kết quả trả về true
        return true;
    } catch (error) {
        console.error('Lỗi mạng hoặc lỗi khi gửi dữ liệu:', error);
        // Toast lỗi sẽ được trigger ở App.tsx dựa trên kết quả trả về false
        return false;
    }
}

export async function sendResultsToHinParent(
    state: AppState, 
    lessonTitle: string, 
    finalScore: number,
    questionsStage2: Question[], 
    questionsStage3: Question[]  
): Promise<boolean> {
    
    // Construct Detailed Feedback Array exactly like reference
    let detailedFeedback: any[] = [];
    
    // Stage 2 Feedback
    if (state.feedbackStage2) {
        state.feedbackStage2.forEach(fb => {
            if (!fb.is_correct) {
                const qData = questionsStage2[fb.question_number - 1];
                detailedFeedback.push({
                    stage: 'Giai đoạn 2: Kiểm tra Lý thuyết',
                    question_number: fb.question_number,
                    question: qData.question || qData.instruction,
                    studentAnswer: fb.student_answer,
                    aiExplanation: fb.explanation
                });
            }
        });
    }

    // Stage 3 Feedback
    if (state.feedbackStage3) {
        state.feedbackStage3.forEach(fb => {
            if (!fb.is_correct) {
                const qData = questionsStage3[fb.question_number - 1];
                let questionText = qData.question || qData.instruction;
                if(qData.sentence) questionText += ` (${qData.sentence})`;
                detailedFeedback.push({
                    stage: 'Giai đoạn 3: Bài kiểm tra Thực hành',
                    question_number: fb.question_number,
                    question: questionText,
                    studentAnswer: fb.student_answer,
                    aiExplanation: fb.explanation
                });
            }
        });
    }

    const durationSeconds = state.startTime ? Math.round((new Date().getTime() - new Date(state.startTime).getTime()) / 1000) : 0;
    const submittedAt = new Date().toISOString();

    const payload = {
        assignmentId: state.studentInfo.assignmentId,
        studentId: state.studentInfo.studentId,
        studentName: state.studentInfo.studentName,
        className: state.studentInfo.className,
        assignmentTitle: lessonTitle,
        status: 'completed',
        submittedAt: submittedAt,
        timeSpentSeconds: durationSeconds,
        score: Math.round((state.progress.stage2_score + state.progress.stage3_score) / 2),
        stage2Score: state.progress.stage2_score,
        stage3Score: state.progress.stage3_score,
        detailedFeedback: detailedFeedback
    };

    const results = { type: 'HIN_EXERCISE_RESULT', payload: payload };
    console.log('Chuẩn bị gửi kết quả về HIN:', results);

    // @ts-ignore
    const parentOrigin = window.__HIN_PARENT_ORIGIN || '*';

    const tryPostMessage = async () => {
        if (window.opener && !window.opener.closed) {
            try {
                window.opener.postMessage(results, parentOrigin);
                console.log('Đã cố gắng postMessage tới parent:', parentOrigin, results);
                return await new Promise<{ok: boolean, reason?: string}>((resolve) => {
                    let acked = false;
                    const onMsg = (ev: MessageEvent) => { 
                        if (ev.data && ev.data.type === 'HIN_EXERCISE_RESULT_ACK') { 
                            acked = true; 
                            window.removeEventListener('message', onMsg); 
                            resolve({ ok: true }); 
                        } 
                    };
                    window.addEventListener('message', onMsg);
                    setTimeout(() => { 
                        if (!acked) { 
                            window.removeEventListener('message', onMsg); 
                            resolve({ ok: false, reason: 'no_ack' }); 
                        } 
                    }, 2000);
                });
            } catch (err) { 
                console.warn('postMessage error', err); 
                return { ok: false, reason: 'postMessage_error' }; 
            }
        } else { 
            return { ok: false, reason: 'no_opener' }; 
        }
    };

    const postRes = await tryPostMessage();
    if (postRes.ok) {
        console.log('Parent ACK received.');
        return true;
    }

    console.warn('Parent did not ACK, fallback to server POST. reason=', postRes.reason);
    
    // Exact fallback logic from HTML reference
    // @ts-ignore
    const fallbackUrl = (parentOrigin && parentOrigin !== '*') ? (parentOrigin + '/api/external-exercise-result') : '/api/external-exercise-result';
    
    try {
        const resp = await fetch(fallbackUrl, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(results) 
        });
        if (resp.ok) {
            console.log('Fallback POST saved on server');
            return true;
        } else {
             console.error('Fallback POST failed', resp.status);
             return false;
        }
    } catch (err) {
        console.error("Fallback POST exception", err);
        return false;
    }
}