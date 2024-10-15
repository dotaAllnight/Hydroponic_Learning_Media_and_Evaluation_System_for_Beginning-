"use client";

import { useState } from "react";

const CompleteLessonButton = ({ lessonId }: { lessonId: string }) => {
    const [completed, setCompleted] = useState<boolean>(() => {

        if (typeof window !== 'undefined') {
            const storedCompleted = localStorage.getItem(`lesson-${lessonId}`);
            return storedCompleted === 'true';
        }
        return false;
    });

    const handleCompleteLesson = async () => {
        try {
            console.log("Sending lessonId:", lessonId);
            const res = await fetch("/api/historyLesson", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lessonId }),
            });

            const data = await res.json();
            console.log("Response data:", data);

            if (res.ok) {
                setCompleted(true);

                localStorage.setItem(`lesson-${lessonId}`, 'true');
            } else {
                console.error("Failed to complete lesson", data);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <button
            onClick={handleCompleteLesson}
            className='bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 transition'
            disabled={completed}
        >
            {completed ? "Lesson Completed" : "Complete Lesson"}
        </button>
    );
};


export default CompleteLessonButton;
