// src/components/SingleLessonUpdatePage.tsx

"use client"; // Ensure this file is a Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Lesson {
    lessonId: string;
    title: string;
    description: string;
    content: string;
    videoLink?: string; // Optional field
    lessonref: string;
    lessonTypeId?: string; // Optional field
}

const SingleLessonUpdatePage = ({ lessonId }: { lessonId: string }) => {
    const [inputs, setInputs] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/lessons/${lessonId}`);
                if (!res.ok) throw new Error("Failed to fetch lesson data");
                const data: Lesson = await res.json();
                setInputs(data);
            } catch (error) {
                setError("Failed to load lesson data.");
                console.error("Error fetching lesson:", error);
            }
        };

        fetchLesson();
    }, [lessonId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInputs((prev) => prev && { ...prev, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:3000/api/lessons`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: lessonId, ...inputs }),
            });
            if (!res.ok) throw new Error("Failed to update lesson");
            const updatedLesson = await res.json();
            console.log("Lesson updated:", updatedLesson);
            router.push(`/lesson/${lessonId}`);
        } catch (error) {
            setError("Failed to update lesson.");
            console.error("Error updating lesson:", error);
        } finally {
            setLoading(false);
        }
    };


    if (!inputs) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Update Lesson</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Description"
                    required
                />
                <textarea
                    name="content"
                    value={inputs.content}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Content"
                    required
                />
                <input
                    type="text"
                    name="videoLink"
                    value={inputs.videoLink || ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Video Link"
                />
                <input
                    type="text"
                    name="lessonref"
                    value={inputs.lessonref}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Reference"
                    required
                />
                <button type="submit" className={`p-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
                    {loading ? "Updating..." : "Update Lesson"}
                </button>
            </form>
        </div>
    );
};

export default SingleLessonUpdatePage;
