import React, { useEffect } from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const ToastContainer: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:top-5 md:right-5 md:left-auto md:bottom-auto z-[3000] flex flex-col items-center md:items-end gap-3 pointer-events-none p-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: () => void }> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  let iconColor = 'text-hin-blue';
  let icon = 'fa-info-circle';
  let bgColor = 'bg-white/95'; // Glassmorphism base
  let barColor = 'bg-hin-blue';

  switch (toast.type) {
    case 'success':
      iconColor = 'text-status-success';
      icon = 'fa-check-circle';
      bgColor = 'bg-green-50/95';
      barColor = 'bg-status-success';
      break;
    case 'error':
      iconColor = 'text-status-danger';
      icon = 'fa-exclamation-circle';
      bgColor = 'bg-red-50/95';
      barColor = 'bg-status-danger';
      break;
    case 'warning':
      iconColor = 'text-status-warning';
      icon = 'fa-exclamation-triangle';
      bgColor = 'bg-yellow-50/95';
      barColor = 'bg-status-warning';
      break;
  }

  return (
    <div className={`pointer-events-auto relative overflow-hidden w-full max-w-sm md:w-96 ${bgColor} backdrop-blur-md border border-gray-200 shadow-2xl rounded-xl flex flex-col animate-slide-in`}>
      <div className="flex items-start gap-3 p-4">
        <div className={`mt-0.5 text-xl ${iconColor}`}>
            <i className={`fas ${icon}`}></i>
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm uppercase mb-1 tracking-wide">
              {toast.type === 'info' ? 'Thông báo' : toast.type === 'error' ? 'Có vấn đề nhỏ' : toast.type === 'warning' ? 'Lưu ý' : 'Tuyệt vời'}
            </h4>
            <p className="text-sm text-gray-600 leading-snug">{toast.message}</p>
        </div>
        <button onClick={onRemove} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
          <i className="fas fa-times"></i>
        </button>
      </div>
      {/* Visual Progress Bar */}
      <div className="h-1 w-full bg-gray-200/50">
         <div className={`h-full ${barColor} animate-progress`} style={{ animationDuration: '4s' }}></div>
      </div>
    </div>
  );
};

export default ToastContainer;