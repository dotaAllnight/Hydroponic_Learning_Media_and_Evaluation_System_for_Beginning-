// src/app/admin/edit/page.tsx

"use client"; // Ensure this is a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Lesson {
    lessonId: string;
    title: string;
    description: string;
    content: string;
    videoLink?: string;
    lessonref: string;
}

const EditLessonPage = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]); // State to hold list of lessons
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const router = useRouter();

    // Fetch all lessons on component mount
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/lessons");
                if (!res.ok) throw new Error("Failed to fetch lessons");
                const data: Lesson[] = await res.json();
                setLessons(data);
            } catch (error) {
                setError("Failed to load lessons.");
                console.error("Error fetching lessons:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    // Redirect to the edit page for the selected lesson
    const handleEdit = (lessonId: string) => {
        router.push(`/admin/edit/${lessonId}`);
    };

    if (loading) return <div>Loading lessons...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Edit Lessons</h1>
            <ul className="list-disc pl-5">
                {lessons.map((lesson) => (
                    <li key={lesson.lessonId} className="mb-2">
                        <span className="font-bold">{lesson.title}</span>
                        <button
                            onClick={() => handleEdit(lesson.lessonId)}
                            className="ml-4 p-1 bg-blue-500 text-white rounded"
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditLessonPage;
