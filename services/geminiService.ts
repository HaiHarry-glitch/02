import { API_KEYS, MODELS, PASSING_SCORE } from '../constants';
import { GradingResult, Question } from '../types';

let currentApiKeyIndex = 0;

export interface QuestionToGrade {
    originalIndex: number;
    question: Question;
    studentAnswer: string;
}

export async function gradeSubmission(
  itemsToGrade: QuestionToGrade[],
  previousCorrectCount: number,
  totalQuestions: number,
  userApiKey?: string
): Promise<GradingResult> {
  
  // Construct the payload for the model with specific subset
  const userAnswers = itemsToGrade.map((item) => {
    // Simplify answer formatting if needed
    return {
      question_number: item.originalIndex + 1, // Keep 1-based index consistent with UI
      question_type: item.question.type,
      question: item.question.question || item.question.instruction,
      correct_answer: Array.isArray(item.question.answer) ? item.question.answer.join('|') : item.question.answer,
      student_answer: item.studentAnswer || "Chưa trả lời"
    };
  });

  const prompt = `Bạn là một giáo viên tiếng Anh AI chuyên nghiệp, nghiêm khắc nhưng tận tình. Nhiệm vụ của bạn là chấm điểm bài làm ngữ pháp sau đây.

  THÔNG TIN BỐI CẢNH QUAN TRỌNG:
  - Đây là bài làm lại (retry) hoặc làm tiếp.
  - Tổng số câu hỏi của TOÀN BỘ bài thi: ${totalQuestions}.
  - Hệ thống CHỈ GỬI CHO BẠN ${itemsToGrade.length} câu hỏi cần chấm lại (là những câu học sinh làm sai hoặc chưa làm).
  - Số câu học sinh ĐÃ LÀM ĐÚNG và được KHÓA lại ở các lần trước: ${previousCorrectCount}.
  
  QUY TẮC CHẤM ĐIỂM VÀ TÍNH TOÁN:
  1. ĐIỂM SỐ: 
      - Chấm các câu trả lời trong danh sách 'userAnswers' bên dưới.
      - Đếm số lượng câu ĐÚNG trong danh sách mới gửi này. Gọi là NEW_CORRECT.
      - TỔNG SỐ CÂU ĐÚNG (TOTAL_CORRECT) = ${previousCorrectCount} (đã đúng) + NEW_CORRECT (vừa làm đúng).
      - Tính % điểm số cuối cùng = (TOTAL_CORRECT / ${totalQuestions}) * 100.
      - Điểm đạt là ${PASSING_SCORE}%.
  2. PHẢN HỒI (FEEDBACK) - QUAN TRỌNG:
      - Bạn chỉ cần trả về mảng feedback cho ${itemsToGrade.length} câu hỏi được gửi trong danh sách này.
      - Với câu trả lời ĐÚNG: Khen ngợi và giải thích ngắn gọn.
      - Với câu trả lời SAI: 
          + TUYỆT ĐỐI KHÔNG ĐƯA RA ĐÁP ÁN ĐÚNG (Correct Answer).
          + TUYỆT ĐỐI KHÔNG tiết lộ đáp án trực tiếp trong lời giải thích.
          + Chỉ chỉ ra lỗi sai của học sinh.
          + Giải thích nguyên lý ngữ pháp hoặc từ vựng liên quan.
          + Đưa ra GỢI Ý (HINT) để học sinh tự suy nghĩ và làm lại vào lần sau.
  3. NHẬN XÉT TỔNG QUAN: Viết nhận xét dựa trên tổng điểm hiện tại.
  4. ĐỊNH DẠNG ĐẦU RA: Trả về một đối tượng JSON duy nhất.
  
  DANH SÁCH CÂU CẦN CHẤM:
  ${JSON.stringify(userAnswers, null, 2)}
  
  CẤU TRÚC JSON BẮT BUỘC:
  { "total_correct_count": <number: TOTAL_CORRECT>, "score": <number: % final score>, "passed": <boolean>, "summary": "<string: nhận xét>", "feedback": [ { "question_number": <number>, "student_answer": "<string>", "is_correct": <boolean>, "explanation": "<string: giải thích lỗi sai và đưa ra GỢI Ý (KHÔNG CÓ ĐÁP ÁN)>" } ] }`;

  return await callGeminiAPI(prompt, userApiKey);
}

async function callGeminiAPI(promptContent: string, userApiKey?: string): Promise<GradingResult> {
  // Build keys list: Env Key -> User Key -> Hardcoded Keys
  const keysToTry: string[] = [];
  
  // 1. Env Key
  try {
      if (process.env.GEMINI_API_KEY) {
          keysToTry.push(process.env.GEMINI_API_KEY as string);
      }
  } catch(e) {}
  
  try {
      if ((import.meta as any).env && (import.meta as any).env.VITE_GEMINI_API_KEY) {
          keysToTry.push((import.meta as any).env.VITE_GEMINI_API_KEY);
      }
  } catch(e) {}

  // 2. User Key
  if (userApiKey && userApiKey.trim() && userApiKey.trim() !== '24') {
      keysToTry.push(userApiKey.trim());
  }

  // 3. Fallback Keys
  for (const key of API_KEYS) {
     if (!keysToTry.includes(key)) {
         keysToTry.push(key);
     }
  }

  // Remove duplicates
  const uniqueKeys = Array.from(new Set(keysToTry)).filter(k => k && k.length > 0);

  // Vòng lặp kép: Loop over models first, then keys
  for (const modelName of MODELS) {
      for (const apiKey of uniqueKeys) {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
          
          try {
              const response = await fetch(url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      contents: [{ parts: [{ text: promptContent }] }],
                      generationConfig: { response_mime_type: "application/json" }
                  })
              });

              if (response.ok) {
                  const data = await response.json();
                  const text = data.candidates[0].content.parts[0].text;
                  try {
                    return JSON.parse(text);
                  } catch (e) {
                    console.error("JSON Parse error:", text);
                    throw new Error("Invalid JSON response from AI");
                  }
              } else {
                   console.warn(`API Error for key ${apiKey.substring(0, 5)}... with Model ${modelName}: ${response.status}`);
              }
          } catch (error) {
              console.warn(`Network Error for key ${apiKey.substring(0, 5)}... with Model ${modelName}:`, error);
          }
      }
      console.log(`All keys failed for model ${modelName}. Trying next model.`);
  }

  throw new Error("Tất cả API keys và models đều quá tải hoặc lỗi. Hãy thử lại sau!");
}

export async function testApiKey(apiKey: string): Promise<boolean> {
    if (!apiKey) return false;
    const testModel = 'gemini-1.5-flash-latest'; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${testModel}:generateContent?key=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "test" }] }],
            })
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

export async function generateImageForText(description: string): Promise<string | null> {
    const modelName = 'gemini-2.5-flash-image'; 
    // Updated prompt: Enhanced for Professional Stock Photo quality
    const prompt = `Create a single, high-quality, professional stock photograph of: ${description}. 
    Style: Hyper-realistic, 8k resolution, sharp focus, studio lighting, highly detailed. 
    Background: Isolated on a pure white background.
    Constraints: 
    1. EXTREMELY IMPORTANT: NO TEXT, NO LETTERS, NO NUMBERS, NO WATERMARKS, NO LABELS, NO SIGNATURES. 
    2. The image must be a pure visual representation of the object/action.
    3. Ensure human anatomy (hands, faces) is correct and natural if present.`;

    for (let i = 0; i < API_KEYS.length; i++) {
        const apiKey = API_KEYS[currentApiKeyIndex];
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Check for image data in candidates
                const parts = data.candidates?.[0]?.content?.parts;
                if (parts) {
                    for (const part of parts) {
                        if (part.inlineData && part.inlineData.mimeType.startsWith('image')) {
                             return part.inlineData.data; // Base64 string
                        }
                    }
                }
                console.warn(`No image found in response for: ${description}`);
            } else {
                console.warn(`Image Gen Error for Key Index ${currentApiKeyIndex}: ${response.status}`);
            }
        } catch (error) {
            console.error('Network Error during image gen:', error);
        }
    }
    return null;
}