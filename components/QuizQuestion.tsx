
import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import { generateImageForText } from '../services/geminiService';

interface Props {
  question: Question;
  index: number;
  answer: string;
  onAnswerChange: (val: string) => void;
  disabled: boolean;
  isCorrect?: boolean;
}

const PAIR_COLORS = [
  'border-blue-500 text-blue-700 bg-blue-50',
  'border-green-500 text-green-700 bg-green-50',
  'border-purple-500 text-purple-700 bg-purple-50',
  'border-orange-500 text-orange-700 bg-orange-50',
  'border-pink-500 text-pink-700 bg-pink-50',
  'border-indigo-500 text-indigo-700 bg-indigo-50',
];

// Helper Component for Auto-Generated Images
const DynamicImageItem: React.FC<{ text: string }> = ({ text }) => {
    const [imgStatus, setImgStatus] = useState<'checking' | 'found' | 'not-found' | 'generating'>('checking');
    const [currentDataUrl, setCurrentDataUrl] = useState<string>('');
    
    // Extract "(Image: ...)"
    const match = text.match(/\(Image:\s*(.*?)\)/i);
    const imageDescription = match ? match[1] : null;

    useEffect(() => {
        if (imageDescription) {
            // Check local cache
            const cacheKey = `hin_img_base64_${btoa(unescape(encodeURIComponent(imageDescription))).substring(0, 50)}`;
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                setCurrentDataUrl(cachedData);
                setImgStatus('found');
            } else {
                setImgStatus('not-found');
            }
        }
    }, [imageDescription]);

    const handleGenerateImage = async (e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (!imageDescription) return;

        setImgStatus('generating');
        try {
            const base64 = await generateImageForText(imageDescription);
            if (base64) {
                const dataUrl = `data:image/jpeg;base64,${base64}`;
                const cacheKey = `hin_img_base64_${btoa(unescape(encodeURIComponent(imageDescription))).substring(0, 50)}`;
                try {
                    localStorage.setItem(cacheKey, dataUrl);
                } catch (e) {
                   console.warn("Could not cache image in localStorage (maybe too large)", e);
                }
                setCurrentDataUrl(dataUrl);
                setImgStatus('found');
            } else {
                alert("Không thể tạo ảnh lúc này. Vui lòng thử lại.");
                setImgStatus('not-found');
            }
        } catch (error) {
            console.error("Error generating image:", error);
            setImgStatus('not-found');
        }
    };

    if (!imageDescription) {
        return <span className="font-medium text-gray-800">{text}</span>;
    }

    // Clean text: "1. (Image: ...)" -> "1."
    const cleanPrefix = text.replace(/\(Image:.*?\)/i, '').trim();

    return (
        <div className="flex flex-col items-center w-full">
             {cleanPrefix && <span className="font-bold mb-2 text-gray-500 text-sm self-start">{cleanPrefix}</span>}
             
             {/* Invisible IMG tag to check existence */}
             {currentDataUrl && (
                 <img 
                    src={currentDataUrl} 
                    alt="check" 
                    className={`w-full h-auto max-h-40 object-contain rounded-lg border border-gray-100 shadow-sm ${imgStatus === 'found' ? 'block' : 'hidden'}`}
                    onLoad={() => {
                        if (imgStatus !== 'generating') setImgStatus('found');
                    }}
                    onError={() => {
                        if (imgStatus !== 'generating') setImgStatus('not-found');
                    }}
                 />
             )}

             {imgStatus === 'checking' && (
                 <div className="w-full h-24 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center">
                     <i className="fas fa-circle-notch fa-spin text-gray-300"></i>
                 </div>
             )}

             {imgStatus === 'generating' && (
                 <div className="w-full h-32 bg-gray-50 border-2 border-dashed border-gray-300 animate-pulse rounded-lg flex flex-col items-center justify-center text-xs text-gray-400 p-2">
                     <i className="fas fa-magic animate-spin text-2xl mb-2 text-hin-gold"></i> 
                     <span>Đang vẽ ảnh...</span>
                 </div>
             )}

             {imgStatus === 'not-found' && (
                 <button 
                    onClick={handleGenerateImage}
                    className="w-full h-24 bg-blue-50/50 hover:bg-blue-100/50 border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-lg flex flex-col items-center justify-center text-blue-500 transition-all gap-2 group"
                 >
                     <i className="fas fa-image text-2xl group-hover:scale-110 transition-transform"></i>
                     <span className="text-xs font-bold">Tạo ảnh minh họa</span>
                 </button>
             )}

             {/* Regenerate Button (Overlay) - Only show if found */}
             {imgStatus === 'found' && (
                <div className="w-full flex justify-end -mt-8 pr-1 relative z-10 pointer-events-none">
                     <button 
                        onClick={handleGenerateImage}
                        className="pointer-events-auto bg-white/90 text-gray-500 hover:text-hin-blue p-1.5 rounded-full shadow-md transition-colors text-xs border border-gray-200"
                        title="Tạo lại ảnh mới"
                     >
                        <i className="fas fa-redo"></i>
                     </button>
                </div>
             )}
        </div>
    );
};

const QuizQuestion: React.FC<Props> = ({ question, index, answer, onAnswerChange, disabled, isCorrect }) => {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  // Parse open cloze
  // If type is open_cloze, we expect paragraphs with (1)______
  const renderOpenCloze = () => {
    if (!question.paragraph) return null;
    const parts = question.paragraph.split(/(\(\d+\)______)/g);
    
    // Parse current answers from "ans1|ans2|..." string
    const currentAnswers = answer ? answer.split('|') : [];

    return (
      <div className="leading-loose text-lg">
        {parts.map((part, i) => {
          const match = part.match(/\((\d+)\)______/);
          if (match) {
            const subIndex = parseInt(match[1]) - 1;
            const hasValue = !!currentAnswers[subIndex];
            return (
              <input
                key={i}
                type="text"
                disabled={disabled}
                value={currentAnswers[subIndex] || ''}
                onChange={(e) => {
                  const newAnswers = [...currentAnswers];
                  newAnswers[subIndex] = e.target.value;
                  onAnswerChange(newAnswers.join('|'));
                }}
                className={`w-32 mx-1 border-b-2 text-center transition-all duration-200 rounded
                  focus:outline-none focus:border-hin-blue focus:bg-yellow-50 focus:ring-2 focus:ring-hin-blue/20 
                  ${hasValue ? 'border-hin-blue bg-blue-50/30' : 'border-gray-300 bg-transparent'}
                  ${disabled ? 'cursor-not-allowed bg-gray-50' : ''}`}
                placeholder={`(${match[1]})`}
              />
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  };

  const renderMatching = () => {
    if (!question.left_items || !question.right_items) return null;
    
    // answers format: "1-A,2-C"
    const pairs = answer ? answer.split(',').reduce((acc, curr) => {
      const [left, right] = curr.split('-');
      if (left && right) acc[left] = right;
      return acc;
    }, {} as Record<string, string>) : {};
    
    // Get ordered pairs to assign colors/numbers
    const pairKeys = Object.keys(pairs);

    const handleMatch = (leftIndex: string, rightValue: string) => {
      const newPairs = { ...pairs, [leftIndex]: rightValue };
      const newAnswerStr = Object.entries(newPairs).map(([k, v]) => `${k}-${v}`).join(',');
      onAnswerChange(newAnswerStr);
    };

    // Helper to find which right item is assigned to a left item
    const getAssignedRight = (leftIdx: string) => {
      const val = pairs[leftIdx];
      if (!val) return null;
      return question.right_items?.find(item => item.startsWith(val));
    };

    const getPairStyle = (idx: number) => {
        return PAIR_COLORS[idx % PAIR_COLORS.length];
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 select-none">
        <div className="space-y-3">
          <h4 className="font-bold text-hin-blue border-b-2 border-hin-blue/20 pb-2 mb-4 flex items-center gap-2">
            <i className="fas fa-list-ul"></i> Câu hỏi
          </h4>
          {question.left_items.map((item) => {
             const leftId = item.split('.')[0];
             const assigned = getAssignedRight(leftId);
             
             // Find pair index for coloring
             const pairIndex = pairKeys.indexOf(leftId);
             const pairStyle = pairIndex >= 0 ? getPairStyle(pairIndex) : 'border-gray-200 bg-gray-50';

             return (
               <div 
                 key={leftId}
                 onClick={() => {
                   // Only allow click if not clicking inside the generated image area (handled by stopPropagation in button)
                   if(disabled) return;
                   if (selectedMatch) {
                     handleMatch(leftId, selectedMatch);
                     setSelectedMatch(null);
                   }
                 }}
                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 relative group
                    ${selectedMatch ? 'bg-yellow-50 border-hin-gold border-dashed' : ''} 
                    ${!selectedMatch && pairIndex === -1 ? 'hover:border-hin-blue hover:shadow-md bg-white border-gray-200' : ''}
                    ${pairIndex >= 0 ? `${pairStyle} border-solid` : ''}
                    ${disabled ? 'opacity-75 cursor-default' : ''}
                 `}
               >
                 <div className="flex justify-between items-center w-full">
                    {/* Replaced raw string with Dynamic Image Component */}
                    <div className="flex-grow w-full">
                        <DynamicImageItem text={item} />
                    </div>
                    
                    {assigned && (
                        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white border shadow-sm ml-2 flex-shrink-0`}>
                            Cặp #{pairIndex + 1}
                        </span>
                    )}
                 </div>
                 {assigned && (
                   <div className="mt-2 pt-2 border-t border-black/10 text-sm font-medium flex items-center gap-2">
                     <i className="fas fa-link text-xs opacity-50"></i> {assigned}
                   </div>
                 )}
                 {!assigned && !disabled && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/80 transition-opacity rounded-xl backdrop-blur-[1px] z-10 pointer-events-none">
                        <span className="text-hin-blue font-bold text-sm">
                            {selectedMatch ? 'Nhấn để ghép cặp' : 'Chọn đáp án bên phải trước'}
                        </span>
                    </div>
                 )}
               </div>
             )
          })}
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-hin-blue border-b-2 border-hin-blue/20 pb-2 mb-4 flex items-center gap-2">
             <i className="fas fa-check-square"></i> Lựa chọn
          </h4>
          {question.right_items.map((item) => {
            const rightId = item.split('.')[0];
            
            // Check if this right item is used in any pair
            const usedByLeftId = Object.keys(pairs).find(key => pairs[key] === rightId);
            const isUsed = !!usedByLeftId;
            const isSelected = selectedMatch === rightId;
            
            const pairIndex = usedByLeftId ? pairKeys.indexOf(usedByLeftId) : -1;
            const pairStyle = pairIndex >= 0 ? getPairStyle(pairIndex) : '';

            return (
              <div
                key={rightId}
                onClick={() => {
                  if (disabled || isUsed) return;
                  setSelectedMatch(isSelected ? null : rightId);
                }}
                className={`p-4 border-2 rounded-xl shadow-sm transition-all duration-200
                   ${isUsed 
                       ? `${pairStyle} opacity-90 cursor-default` 
                       : 'bg-white cursor-pointer hover:shadow-md hover:border-hin-blue hover:-translate-y-0.5'} 
                   ${isSelected ? 'ring-4 ring-hin-blue/20 border-hin-blue bg-blue-50' : 'border-gray-200'}
                `}
              >
                <div className="flex items-center justify-between">
                    <span>{item}</span>
                    {isUsed && (
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/50 border shadow-sm">
                           #{pairIndex + 1}
                        </span>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  };

  const renderContent = () => {
    switch(question.type) {
      case 'mcq':
      case 'tf':
        return (
          <div className="space-y-3 mt-4">
            {(question.type === 'mcq' ? question.options! : ['Đúng', 'Sai']).map((opt, i) => {
               const val = question.type === 'mcq' ? String.fromCharCode(65 + i) : opt;
               const isSelected = answer === val;
               // Map displayed text for True/False
               const display = question.type === 'mcq' ? `${val}. ${opt}` : (opt === 'Đúng' ? '✔ Đúng' : '✘ Sai');

               return (
                 <button
                   key={i}
                   disabled={disabled}
                   onClick={() => onAnswerChange(val)}
                   className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                     isSelected 
                       ? 'border-hin-blue bg-blue-50/50 font-bold shadow-md ring-2 ring-hin-blue/10' 
                       : 'border-gray-100 bg-white hover:bg-yellow-50 hover:border-hin-gold hover:shadow'
                   } ${disabled ? 'opacity-80 cursor-default' : ''}`}
                 >
                   <span className="text-lg">{display}</span>
                   {isSelected && <i className="fas fa-check-circle text-hin-blue text-2xl animate-bounce-short"></i>}
                   {!isSelected && !disabled && <i className="fas fa-check-circle text-gray-200 opacity-0 group-hover:opacity-50 transition-opacity text-xl"></i>}
                 </button>
               )
            })}
          </div>
        );
      case 'fill':
        const hasContent = !!answer;
        return (
          <div className="mt-4">
             <input
               type="text"
               disabled={disabled}
               value={answer}
               onChange={(e) => onAnswerChange(e.target.value)}
               placeholder="Nhập câu trả lời của bạn..."
               className={`w-full p-4 text-lg border-2 rounded-xl transition-all focus:outline-none focus:border-hin-blue focus:ring-4 focus:ring-hin-blue/10 focus:bg-yellow-50 ${hasContent ? 'border-hin-blue bg-white' : 'border-gray-200'}`}
             />
          </div>
        );
      case 'open_cloze':
        return renderOpenCloze();
      case 'error-correction':
        const [mistake, correction] = answer ? answer.split('|') : ['', ''];
        return (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
             <div className="bg-red-50 p-4 rounded-xl border border-red-100">
               <label className="block text-sm font-bold text-red-600 mb-2"><i className="fas fa-times-circle"></i> Từ/Cụm từ sai</label>
               <input
                 type="text"
                 disabled={disabled}
                 value={mistake}
                 onChange={(e) => onAnswerChange(`${e.target.value}|${correction}`)}
                 className="w-full p-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:bg-white transition-all"
                 placeholder="Nhập từ sai..."
               />
             </div>
             <div className="bg-green-50 p-4 rounded-xl border border-green-100">
               <label className="block text-sm font-bold text-green-600 mb-2"><i className="fas fa-check-circle"></i> Sửa lại cho đúng</label>
               <input
                 type="text"
                 disabled={disabled}
                 value={correction}
                 onChange={(e) => onAnswerChange(`${mistake}|${e.target.value}`)}
                 className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:bg-white transition-all"
                 placeholder="Nhập từ đúng..."
               />
             </div>
           </div>
        );
      case 'matching':
        return renderMatching();
      default:
        return <div>Unknown Type</div>;
    }
  };

  const animClass = isCorrect === true ? 'animate-bounce-short' : (isCorrect === false ? 'animate-shake' : '');
  const hasAnswer = answer && answer.length > 0;

  return (
    <div id={`question-${index}`} className={`mb-10 transition-all duration-300 ${animClass} 
        ${isCorrect === true ? 'border-l-4 border-status-success bg-green-50/30 p-6 rounded-xl shadow-sm' : ''} 
        ${isCorrect === false ? 'border-l-4 border-status-danger bg-red-50/30 p-6 rounded-xl shadow-sm' : ''}
        ${isCorrect === undefined ? 'bg-transparent' : ''}
    `}>
      <div className="flex justify-between items-start mb-4">
         <h3 className="font-heading font-bold text-xl text-hin-blue flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-md transition-colors duration-300 ${hasAnswer ? 'bg-green-500 text-white' : 'bg-hin-blue text-white'}`}>
                {hasAnswer ? <i className="fas fa-check"></i> : (index + 1)}
            </span>
            <span>{question.part ? question.part.split(':')[0] : 'Câu hỏi'}</span>
         </h3>
         <span className="text-xs font-bold text-gray-400 uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">
            {question.type === 'mcq' ? 'Trắc nghiệm' : question.type === 'fill' ? 'Điền từ' : question.type === 'matching' ? 'Nối' : 'Khác'}
         </span>
      </div>
      
      <div className="pl-0 md:pl-11">
        {question.instruction && <p className="text-gray-600 mb-4 italic flex items-start gap-2"><i className="fas fa-info-circle mt-1 text-hin-gold"></i> {question.instruction}</p>}
        
        {question.imageUrl && (
            <div className="my-6 text-center bg-gray-50 p-4 rounded-xl border border-gray-200">
            <img src={question.imageUrl} alt="Question Visual" className="max-w-full h-auto rounded-lg shadow-sm mx-auto object-contain" style={{maxHeight: '400px'}} />
            </div>
        )}

        {question.sentence && (
            <div className="bg-white p-5 rounded-xl border-l-4 border-hin-blue shadow-sm italic text-gray-700 mb-6 text-lg relative">
                <i className="fas fa-quote-left absolute top-2 left-2 text-gray-200 text-4xl -z-10"></i>
                {question.sentence}
            </div>
        )}
        
        {question.type !== 'open_cloze' && question.question && (
            <div className="text-lg font-medium text-gray-800 mb-4">
                {question.question}
            </div>
        )}
        
        {question.type === 'open_cloze' && (
            <div className="text-lg bg-white p-6 rounded-xl border border-gray-200 shadow-sm leading-8">
                {renderOpenCloze()}
            </div>
        )}

        {question.type !== 'open_cloze' && renderContent()}
      </div>
    </div>
  );
};

export default QuizQuestion;
