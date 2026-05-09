
import React, { useState, useEffect } from 'react';
import { LESSON_LIBRARY } from '../data/lessons';
import { Lesson } from '../types';
import { fetchAndShowLibrary } from '../services/integrationService';

interface LessonSelectionProps {
    onSelectLesson: (lessonId: string) => void;
}

const LessonSelection: React.FC<LessonSelectionProps> = ({ onSelectLesson }) => {
    const [fetchedLessons, setFetchedLessons] = useState<any[]>(LESSON_LIBRARY);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAndShowLibrary().then(list => {
            if (list && list.length > 0) {
                const mapped = list.map((item, idx) => ({
                    id: item.id,
                    book: item.topic ? `[GAS] ${item.topic}` : 'Online Library',
                    unitNumber: 99, // Put in a distinct unit to stand out
                    lessonNumber: idx + 1,
                    title: item.title,
                    description: item.description || `Difficulty: ${item.difficulty}`,
                    stage2Questions: [],
                    stage3Questions: []
                }));
                const allBooks = [...LESSON_LIBRARY, ...mapped];
                setFetchedLessons(allBooks);
                // Switch to the newly fetched book if it exists
                if (mapped.length > 0 && mapped[0].book) {
                    setActiveBook(mapped[0].book);
                }
            }
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }, []);

    // 1. Group by Book
    const books = React.useMemo(() => {
        const groups: Record<string, Lesson[]> = {};
        fetchedLessons.forEach(lesson => {
            const bookName = lesson.book || 'Foundation 01'; // Default
            if (!groups[bookName]) groups[bookName] = [];
            groups[bookName].push(lesson as Lesson);
        });
        return groups;
    }, [fetchedLessons]);

    // State to toggle books (optional, but good for UI if list is long)
    const [activeBook, setActiveBook] = useState<string>('Foundation 01');

    return (
        <div className="min-h-screen bg-bg-main p-4 md:p-8 font-body">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 animate-slide-in">
                    <h1 className="text-4xl md:text-5xl font-heading font-black text-hin-blue mb-4">
                        Choose a Lesson
                    </h1>
                    <p className="text-gray-600 text-lg">Select a book and lesson to begin your contextual learning session.</p>
                </div>

                {/* Book Tabs */}
                <div className="flex justify-center gap-4 mb-10 overflow-x-auto pb-2">
                    {Object.keys(books).sort().map(bookName => (
                        <button
                            key={bookName}
                            onClick={() => setActiveBook(bookName)}
                            className={`px-6 py-3 rounded-full font-bold text-lg whitespace-nowrap transition-all shadow-sm ${
                                activeBook === bookName 
                                ? 'bg-hin-blue text-white shadow-blue-200 shadow-lg scale-105' 
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            <i className="fas fa-book mr-2"></i> {bookName}
                        </button>
                    ))}
                </div>

                {/* Lessons for Active Book */}
                <div className="space-y-12">
                   {(() => {
                        const lessonsInBook = books[activeBook] || [];
                        
                        // Group by Unit within the Book
                        const units: Record<number, Lesson[]> = {};
                        lessonsInBook.forEach(lesson => {
                            if (!units[lesson.unitNumber]) units[lesson.unitNumber] = [];
                            units[lesson.unitNumber].push(lesson);
                        });

                        return Object.keys(units).map((unitNumStr) => {
                            const unitNum = parseInt(unitNumStr);
                            const lessons = units[unitNum];

                            return (
                                <div key={unitNum} className="anim-fade-in">
                                    <h2 className="text-2xl font-heading font-bold text-gray-700 mb-6 border-b border-gray-200 pb-2">
                                        Unit {unitNum}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {lessons.map((lesson) => (
                                            <div key={lesson.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group h-full">
                                                <div className="p-6 flex-grow">
                                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex justify-between">
                                                        <span>LESSON {lesson.lessonNumber}</span>
                                                        <span className="text-hin-blue/50">{lesson.book}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-hin-blue mb-3 group-hover:text-hin-gold-dark transition-colors">
                                                        {lesson.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm line-clamp-3">
                                                        {lesson.description}
                                                    </p>
                                                </div>
                                                
                                                <div className="bg-gray-50 p-4 border-t border-gray-100 flex gap-3">
                                                    <button
                                                        onClick={() => onSelectLesson(lesson.id)}
                                                        className="flex-1 bg-hin-blue text-white py-2 rounded-lg font-bold text-sm hover:bg-[#081e4d] transition-colors shadow-sm"
                                                    >
                                                        Học ngay
                                                    </button>
                                                    
                                                    <a
                                                        href={`?lessonId=${lesson.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 bg-white text-hin-blue border border-gray-200 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-1"
                                                    >
                                                        Tab mới <i className="fas fa-external-link-alt text-xs"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        });
                   })()}
                </div>
            </div>
            
            <div className="text-center mt-16 text-gray-400 text-sm">
                &copy; 2025 Harry IELTS Navigator. All rights reserved.
            </div>
        </div>
    );
};

export default LessonSelection;