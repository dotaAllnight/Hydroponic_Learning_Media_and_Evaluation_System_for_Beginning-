import { useEffect, useState } from 'react';

const CompleteLessonButton = ({ lessonId }: { lessonId: string }) => {

    const [completed, setCompleted] = useState<boolean>(false);

    useEffect(() => {
        const checkCompletionStatus = async () => {
            try {
                const response = await fetch(`/api/historyLessonCheck/${lessonId}`);
                const data = await response.json();
                setCompleted(data.completed); // สมมติว่า API จะส่ง { completed: true/false }
            } catch (error) {
                console.error("Error checking completion status:", error);
            }
        };

        checkCompletionStatus();
    }, [lessonId]);




    const completeLesson = async () => {
        try {
            const response = await fetch('/api/historyLesson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lessonId }),
            });

            if (!response.ok) {
                throw new Error('Failed to complete lesson');
            }

            const data = await response.json();
            console.log(data.message); // แสดงข้อความที่ส่งกลับ

            setCompleted(true); // ตั้งค่าสถานะให้เป็น completed
        } catch (error) {
            console.error("Error completing lesson:", error);
        }
    };

    return (
        <button
            onClick={completeLesson}
            className='bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 transition'
            disabled={completed}
        >
            {completed ? "Lesson Completed" : "Complete Lesson"}
        </button>
    );
};


export default CompleteLessonButton