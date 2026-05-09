
export interface Question {
  type: 'mcq' | 'tf' | 'fill' | 'open_cloze' | 'error-correction' | 'matching';
  question?: string;
  instruction?: string;
  options?: string[];
  answer: string | string[];
  imageUrl?: string;
  paragraph?: string; // For open_cloze
  sentence?: string; // For error-correction
  left_items?: string[]; // For matching
  right_items?: string[]; // For matching
  part?: string; // category
}

export interface Feedback {
  question_number: number;
  student_answer: string;
  is_correct: boolean;
  explanation: string;
}

export interface GradingResult {
  total_correct_count: number;
  score: number;
  passed: boolean;
  summary: string;
  feedback: Feedback[];
}

export interface UserProgress {
  stage1_theory_read: boolean;
  stage2_theory_quiz_passed: boolean;
  stage3_assessment_passed: boolean;
  stage2_score: number;
  stage3_score: number;
  retryFails: { stage2: number; stage3: number };
}

export interface StudentInfo {
  email: string;
  studentName: string;
  className: string;
  studentId: string;
  assignmentId: string;
  apiKey?: string;
}

export interface Lesson {
    id: string;
    book?: string; // Added book category (Optional for backward compatibility, default to Foundation 01)
    unitNumber: number;
    lessonNumber: number;
    title: string;
    description: string;
    theoryContent?: string; // HTML Content for theory
    stage2Questions: Question[];
    stage3Questions: Question[];
}

export interface AppState {
  currentView: 'introduction' | 'theory-quiz' | 'final-assessment';
  studentInfo: StudentInfo;
  progress: UserProgress;
  answersStage2: Record<number, string>;
  answersStage3: Record<number, string>;
  feedbackStage2: Feedback[] | null;
  feedbackStage3: Feedback[] | null;
  startTime: string;
  isMobileMenuOpen: boolean;
  lockoutUntil?: number; // Timestamp for when the penalty ends
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}