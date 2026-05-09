import React, { useState, useEffect } from 'react';
import { SKIP_PASSWORD, WEB_APP_URL } from '../constants';
import { StudentInfo } from '../types';
import { testApiKey } from '../services/geminiService';

export const StudentInfoModal = ({ onSubmit, onTeacherUnlock }: { onSubmit: (info: any) => void, onTeacherUnlock?: () => void }) => {
  const [email, setEmail] = React.useState('');
  const [apiKey, setApiKey] = React.useState('');
  const [jumpStage, setJumpStage] = React.useState('');
  const [jumpPass, setJumpPass] = React.useState('');
  const [errors, setErrors] = React.useState({ email: false, apiKey: false });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [shake, setShake] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [teacherPass, setTeacherPass] = React.useState('');
  const [showFallbackConfirm, setShowFallbackConfirm] = React.useState(false);
  const [fallbackData, setFallbackData] = React.useState<any>(null);

  const handleTeacherUnlock = () => {
    if (teacherPass === SKIP_PASSWORD) {
      if (onTeacherUnlock) onTeacherUnlock();
      alert('Đã mở khóa các tính năng giáo viên (tắt chống gian lận).');
      setTeacherPass('');
    } else {
      alert('Mật khẩu không chính xác.');
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setErrors({ email: false, apiKey: false });

    if (!email.trim() || !email.includes('@')) {
      setErrors(prev => ({ ...prev, email: true }));
      setErrorMessage('Vui lòng nhập định dạng email hợp lệ.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    
    // Validate API Key if provided
    if (apiKey.trim()) {
      if (apiKey.trim() !== '24') {
        const isValidKey = await testApiKey(apiKey.trim());
        if (!isValidKey) {
          setErrors(prev => ({ ...prev, apiKey: true }));
          setErrorMessage('API Key không hợp lệ hoặc đã hết hạn.');
          setIsSubmitting(false);
          setShake(true);
          setTimeout(() => setShake(false), 500);
          return;
        }
      }
    }

    let studentName = email.split('@')[0];
    let className = '';
    let isEmailFound = false;

    try {
      const response = await fetch(`${WEB_APP_URL}?action=lookupEmail&email=${encodeURIComponent(email)}`);
      const data = await response.json();
      if (data && data.ok && data.name) {
        studentName = data.name;
        className = data.class || '';
        isEmailFound = true;
      } else if (data && !data.ok) {
        console.warn('Backend returned error:', data.error);
      }
    } catch (err) {
      console.error('Lookup failed, using fallback.', err);
    }

    setIsSubmitting(false);

    if (!isEmailFound) {
      setFallbackData({ email, studentName, className, apiKey, jumpStage, jumpPass });
      setShowFallbackConfirm(true);
      return;
    }

    onSubmit({ email, studentName, className, apiKey, jumpStage, jumpPass });
  };

  const handleConfirmFallback = () => {
    setShowFallbackConfirm(false);
    if (fallbackData) {
      onSubmit(fallbackData);
    }
  };

  const handleCancelFallback = () => {
    setShowFallbackConfirm(false);
    setFallbackData(null);
  };

  return (
    <div className="fixed inset-0 bg-hin-blue/90 z-50 flex items-center justify-center p-4 anim-fade-in backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 text-center ${shake ? 'animate-shake' : ''}`}>
        <div className="w-16 h-16 bg-hin-gold rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-lg border-4 border-white">
            <i className="fas fa-user-graduate"></i>
        </div>
        <h3 className="text-2xl font-heading font-bold text-hin-blue mb-2 mt-0">Chào mừng bạn!</h3>
        <p className="text-gray-600 mb-6">Vui lòng nhập email để Harry có thể hỗ trợ bạn tốt nhất.</p>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium">
            <i className="fas fa-exclamation-circle mr-2"></i>{errorMessage}
          </div>
        )}

        {showFallbackConfirm && (
          <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 border-2 border-yellow-200 rounded-xl text-sm font-medium text-left">
            <p className="mb-3"><i className="fas fa-exclamation-triangle mr-2 text-yellow-600"></i> Không tìm thấy email trong hệ thống.</p>
            <p className="mb-4 text-yellow-700">Hệ thống sẽ sử dụng phần trước <strong>@</strong> làm tên bạn. Bạn có muốn tiếp tục?</p>
            <div className="flex gap-3">
              <button onClick={handleConfirmFallback} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition-colors font-bold">Tiếp tục</button>
              <button onClick={handleCancelFallback} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition-colors font-bold">Nhập lại</button>
            </div>
          </div>
        )}
        
        <div className="space-y-6 text-left">
          <div className="relative group">
            <input 
              id="student-email"
              type="email"
              className={`w-full border-2 px-4 py-3 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all text-lg font-medium ${errors.email ? 'border-red-500 placeholder-red-300' : 'border-gray-200 focus:border-hin-blue focus:ring-4 focus:ring-hin-blue/10'}`}
              placeholder=" "
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors({...errors, email: false}); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={isSubmitting}
            />
            <label htmlFor="student-email" className={`absolute left-4 transition-all duration-200 pointer-events-none ${email ? '-top-2.5 text-xs bg-white px-1 text-hin-blue font-bold' : 'top-3.5 text-gray-400'}`}>
              Email đã đăng ký <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="relative group">
            <input 
               id="student-api-key"
               className={`w-full border-2 px-4 py-3 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all text-lg ${errors.apiKey ? 'border-red-500 placeholder-red-300' : 'border-gray-200 focus:border-hin-blue focus:ring-4 focus:ring-hin-blue/10'}`}
               placeholder=" "
               value={apiKey}
               onChange={e => { setApiKey(e.target.value); setErrors({...errors, apiKey: false}); }}
               type="password"
               disabled={isSubmitting}
            />
            <label htmlFor="student-api-key" className={`absolute left-4 transition-all duration-200 pointer-events-none ${apiKey ? '-top-2.5 text-xs bg-white px-1 text-hin-blue font-bold' : 'top-3.5 text-gray-400'}`}>
              API Key (Dùng chấm điểm AI)
            </label>
          </div>

          {/* Developer Section Hidden by default or subtle */}
          <div className="pt-4 border-t border-gray-100 mt-2">
             <div className="text-[10px] font-bold text-gray-300 uppercase mb-2 tracking-widest cursor-pointer hover:text-gray-500 transition-colors">Developer Options</div>
             <div className="flex gap-2">
                 <select 
                   className="flex-1 p-2 border border-gray-200 rounded text-xs bg-gray-50 focus:outline-none"
                   value={jumpStage}
                   onChange={e => setJumpStage(e.target.value)}
                 >
                   <option value="">Skip Stage...</option>
                   <option value="stage2">Stage 2</option>
                   <option value="stage3">Stage 3</option>
                 </select>
                 {jumpStage && (
                   <input 
                     type="password"
                     className="flex-1 border border-gray-200 rounded p-2 text-xs focus:outline-none"
                     placeholder="Password..."
                     value={jumpPass}
                     onChange={e => setJumpPass(e.target.value)}
                   />
                 )}
             </div>
             
             <div className="mt-4 flex gap-2">
                 <input 
                   type="password"
                   className="flex-1 border border-gray-200 rounded p-2 text-xs focus:outline-none"
                   placeholder="Mật khẩu GV..."
                   value={teacherPass}
                   onChange={e => setTeacherPass(e.target.value)}
                 />
                 <button 
                  id="gv-unlock-btn"
                  onClick={handleTeacherUnlock}
                  className="bg-gray-200 text-gray-600 px-3 py-1 text-xs rounded hover:bg-gray-300"
                 >
                   GV: Mở khóa
                 </button>
             </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
            <button 
            id="start-exam-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-hin-blue hover:-translate-y-1 hover:bg-[#081e4d]'} text-white font-bold py-4 px-8 rounded-xl text-lg transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3`}
            >
            <span>{isSubmitting ? 'Đang tra cứu...' : 'Vào Làm Bài'}</span> <i className="fas fa-arrow-right"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export const CongratsModal = ({ 
    title, 
    score, 
    studentInfo, 
    onNext,
    sheetStatus
}: { 
    title: string, 
    score: number, 
    studentInfo: StudentInfo, 
    onNext: () => void,
    sheetStatus?: 'idle' | 'submitting' | 'success' | 'error'
}) => {
    // Determine if this is the final final completion (Stage 3)
    const isFinal = title.toLowerCase().includes('hoàn thành');
    
    return (
      <div className="fixed inset-0 bg-hin-blue/95 z-[2000] flex items-center justify-center p-4 anim-fade-in backdrop-blur-md overflow-hidden">
        {/* CSS Confetti Background */}
        <div className="absolute inset-0 pointer-events-none">
           {[...Array(50)].map((_, i) => (
              <div key={i} className="confetti" style={{ 
                 left: `${Math.random() * 100}%`, 
                 animationDelay: `${Math.random() * 3}s`, 
                 animationDuration: `${2 + Math.random() * 3}s`,
                 backgroundColor: ['#FFD200', '#ffffff', '#28a745', '#ffc107', '#00f2ff'][Math.floor(Math.random()*5)]
              }}></div>
           ))}
        </div>
        
        {/* Main Card */}
        <div className="bg-bg-main rounded-none md:rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden transform scale-100 transition-all relative z-10 animate-slide-in flex flex-col">
           
           {/* Header */}
           <div className={`text-white text-center py-8 px-4 relative overflow-hidden ${isFinal ? 'bg-status-success' : 'bg-hin-blue'}`}>
               <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
               <div className="relative z-10">
                   {isFinal && <div className="text-6xl mb-2 animate-bounce-short">🎉</div>}
                   <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-wider mb-2 text-shadow">
                       {isFinal ? 'CẢM ƠN BẠN!' : 'HOÀN THÀNH GIAI ĐOẠN'}
                   </h2>
                   <p className="text-white/90 font-medium text-lg">
                       {isFinal ? 'Kết quả của bạn đang được hệ thống ghi nhận.' : 'Cảm ơn em đã nỗ lực hết mình!'}
                   </p>
               </div>
           </div>

           {/* Body Content */}
           <div className="p-8 md:p-10 flex flex-col gap-6 text-center">
               
               {/* Student Info */}
               <div className="space-y-1">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">HỌC SINH</p>
                   <h3 className="text-2xl font-heading font-bold text-hin-blue">{studentInfo.studentName || 'Guest Student'}</h3>
                   <div className="inline-block bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded font-mono mt-1 border border-blue-100">
                       ID: {studentInfo.studentId || 'N/A'}
                   </div>
               </div>

               {/* Submission Status Table for Final Stage */}
               {isFinal && (
                   <div className="bg-white rounded-xl border-2 border-gray-100 shadow-lg overflow-hidden mt-2">
                       <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-gray-600 uppercase text-xs tracking-wider">
                           Trạng thái lưu trữ dữ liệu
                       </div>
                       <div className="divide-y divide-gray-100">
                           {/* Google Sheet Status */}
                           <div className="p-4 flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                   <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${sheetStatus === 'success' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                       <i className="fas fa-file-excel"></i>
                                   </div>
                                   <div className="text-left">
                                       <p className="font-bold text-gray-800">Google Sheet</p>
                                       <p className="text-xs text-gray-500">Lưu trữ kết quả chi tiết</p>
                                   </div>
                               </div>
                               <div>
                                   {sheetStatus === 'submitting' && (
                                       <span className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">
                                           <i className="fas fa-spinner fa-spin"></i> Đang gửi...
                                       </span>
                                   )}
                                   {sheetStatus === 'success' && (
                                       <span className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full animate-bounce-short">
                                           <i className="fas fa-check"></i> Đã lưu
                                       </span>
                                   )}
                                   {sheetStatus === 'error' && (
                                       <span className="flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50 px-3 py-1 rounded-full">
                                           <i className="fas fa-exclamation-triangle"></i> Lỗi
                                       </span>
                                   )}
                               </div>
                           </div>
                           
                           {/* HIN System Status (Simulated) */}
                           <div className="p-4 flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                   <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${sheetStatus === 'success' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                       <i className="fas fa-server"></i>
                                   </div>
                                   <div className="text-left">
                                       <p className="font-bold text-gray-800">Hệ thống HIN</p>
                                       <p className="text-xs text-gray-500">Đồng bộ dữ liệu học tập</p>
                                   </div>
                               </div>
                               <div>
                                   {sheetStatus === 'success' ? (
                                        <span className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                                            <i className="fas fa-check"></i> Hoàn tất
                                        </span>
                                   ) : (
                                        <span className="text-gray-400 text-xs font-medium">Đang chờ...</span>
                                   )}
                               </div>
                           </div>
                       </div>
                   </div>
               )}

               {/* Score Display (If not final visual, show score) */}
               {!isFinal && (
                   <div className="text-5xl font-black text-hin-blue">
                       {score}%
                   </div>
               )}
           </div>

           {/* Footer Action */}
           <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
               {isFinal ? (
                   <div className="space-y-4">
                       <p className="text-gray-500 text-sm">
                           Kết quả đã được ghi nhận an toàn. Bạn có thể đóng tab này lại.
                       </p>
                       <button disabled={sheetStatus === 'submitting'} className="text-gray-400 hover:text-gray-600 font-bold text-sm transition-colors" onClick={onNext}>
                           Đóng thông báo này
                       </button>
                   </div>
               ) : (
                   <button onClick={onNext} className="w-full bg-hin-blue text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#081e4d] shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95">
                       Tiếp tục hành trình <i className="fas fa-forward ml-2"></i>
                   </button>
               )}
           </div>
        </div>
      </div>
    );
};

export const ResumeModal = ({ onResume, onRestart }: { onResume: () => void, onRestart: () => void }) => (
    <div className="fixed inset-0 bg-hin-blue/80 z-[2000] flex items-center justify-center p-4 anim-fade-in backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center animate-slide-in">
       <div className="text-6xl text-hin-blue mb-6"><i className="fas fa-history"></i></div>
       <h3 className="text-2xl font-heading font-bold text-hin-blue mb-2">Chào mừng trở lại!</h3>
       <p className="text-gray-600 mb-8 text-base px-4">Harry đã lưu lại bài làm dang dở của bạn. Bạn có muốn tiếp tục không?</p>
       <div className="flex gap-4 justify-center">
         <button onClick={onRestart} className="flex-1 bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Làm lại từ đầu</button>
         <button onClick={onResume} className="flex-1 bg-hin-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-[#081e4d] shadow-lg transition-transform hover:-translate-y-1">Tiếp tục</button>
       </div>
    </div>
  </div>
);

export const ConfirmationModal = ({ isOpen, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, isWarning }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-[2500] flex items-center justify-center p-4 anim-fade-in backdrop-blur-md">
            <div className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border-t-8 ${isWarning ? 'border-red-500' : 'border-hin-blue'} transform scale-100`}>
                <div className={`text-5xl mb-6 ${isWarning ? 'text-red-500' : 'text-hin-blue'} animate-bounce-short`}>
                    <i className={`fas ${isWarning ? 'fa-exclamation-triangle' : 'fa-check-circle'}`}></i>
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600 mb-8 whitespace-pre-line text-lg leading-relaxed">{message}</p>
                
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={onCancel}
                        className="flex-1 px-5 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        {cancelLabel || 'Hủy bỏ'}
                    </button>
                    <button 
                        onClick={onConfirm}
                        className={`flex-1 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:-translate-y-1 ${isWarning ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-hin-blue hover:bg-[#081e4d] shadow-blue-200'}`}
                    >
                        {confirmLabel || 'Đồng ý'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const SkipPasswordModal = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password === SKIP_PASSWORD) {
      onConfirm();
    } else {
      setError('Mật khẩu không chính xác!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4 anim-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm text-center">
        <div className="text-4xl text-status-warning mb-4"><i className="fas fa-lock"></i></div>
        <h3 className="text-xl font-heading font-bold text-hin-blue mb-2">Bỏ qua giai đoạn</h3>
        <p className="text-gray-600 mb-4 text-sm">Nhập mật khẩu giáo viên để bỏ qua và đạt điểm tối đa.</p>
        
        <input 
          type="password"
          className="w-full border p-2 rounded mb-2 focus:ring-2 focus:ring-hin-blue outline-none text-center"
          placeholder="Nhập mật khẩu..."
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
        />
        {error && <p className="text-status-danger text-sm mb-4 font-bold">{error}</p>}

        <div className="flex gap-3 justify-center mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Hủy</button>
          <button onClick={handleConfirm} className="bg-hin-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-[#081e4d]">Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export const LoadingOverlay = ({ message }: { message: string }) => {
  const [displayMessage, setDisplayMessage] = useState(message);
  
  // Intelligent Loading Messages
  useEffect(() => {
    const messages = [
      "Harry đang đọc bài của bạn...",
      "Đang phân tích cấu trúc ngữ pháp...",
      "Đang kiểm tra vốn từ vựng...",
      "Đang tra cứu từ điển Cambridge...",
      "Suy nghĩ một chút về cách diễn đạt...",
      "Đang tìm những lời khen hay nhất...",
      "Kiểm tra lỗi chính tả...",
      "So sánh với đáp án chuẩn...",
      "Đang viết lời giải thích chi tiết...",
      "Sắp xong rồi, đợi Harry chút nhé...",
    ];
    
    let i = 0;
    const interval = setInterval(() => {
       // Randomize messages
       const randomIndex = Math.floor(Math.random() * messages.length);
       setDisplayMessage(messages[randomIndex]);
    }, 3000);

    const longWaitTimeout = setTimeout(() => {
        setDisplayMessage("Bài làm khá dài, Harry cần thêm chút thời gian...");
    }, 15000);

    return () => {
        clearInterval(interval);
        clearTimeout(longWaitTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-hin-blue/95 z-[3000] flex flex-col items-center justify-center p-8 anim-fade-in backdrop-blur-md text-white text-center">
       <div className="relative mb-10 scale-125">
          <div className="w-24 h-24 border-4 border-white/10 border-t-hin-gold rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <i className="fas fa-magic text-3xl text-hin-gold animate-bounce-short"></i>
          </div>
       </div>
       
       <div className="h-16 flex items-center justify-center">
         <h3 className="text-2xl md:text-3xl font-heading font-bold mb-0 animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            {displayMessage}
         </h3>
       </div>
       
       <div className="w-full max-w-md h-1.5 bg-white/10 rounded-full my-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 animate-[shimmer_1s_infinite]"></div>
          <div className="h-full bg-hin-gold animate-progress origin-left" style={{ width: '100%', animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
       </div>

       <p className="text-gray-300 text-sm md:text-base max-w-lg bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl">
         <i className="fas fa-info-circle mr-2 text-hin-gold"></i>
         Hệ thống AI đang chấm điểm chi tiết từng câu để giúp bạn cải thiện tốt nhất. Quá trình này có thể mất 10-30 giây.
       </p>
    </div>
  );
}