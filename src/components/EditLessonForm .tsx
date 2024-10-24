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

interface LessonType {
    id: string;
    typeName: string;
}


const SingleLessonUpdatePage = ({ lessonId }: { lessonId: string }) => {
    const [inputs, setInputs] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [defaultValues, setDefaultValues] = useState(null);

    const [lessonTypes, setLessonTypes] = useState<LessonType[]>([]); // Define LessonType for the state


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



    useEffect(() => {
        // Fetch both lesson and lesson types data
        const fetchLessonData = async () => {
            try {
                const resLesson = await fetch(`http://localhost:3000/api/lessons/${lessonId}`);
                if (!resLesson.ok) throw new Error("Failed to fetch lesson data");
                const dataLesson: Lesson = await resLesson.json();
                setInputs(dataLesson);

                const resTypes = await fetch(`http://localhost:3000/api/lessonType`);
                if (!resTypes.ok) throw new Error("Failed to fetch lesson types");
                const dataTypes = await resTypes.json();
                setLessonTypes(dataTypes); // Set lesson types
            } catch (error) {
                setError("Failed to load lesson or lesson types.");
                console.error("Error fetching data:", error);
            }
        };

        fetchLessonData();
    }, [lessonId]);


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
        <div className="bg-[#0e3452] p-8">
            <h1 className="text-2xl font-bold mb-4 text-[#6d96be]">Update Lesson</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleUpdate}

                className="flex flex-col gap-4  text-[#6d96be]">
                <label> Update Your Title </label>
                <input
                    type="text"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded bg-[#0e293e]"
                    placeholder="Title"
                    required
                />


                <label> Update Your Description </label>
                <textarea
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded bg-[#0e293e]"
                    placeholder="Description"
                    required
                />


                <label> Update Your Content </label>
                <textarea
                    name="content"
                    value={inputs.content}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded bg-[#0e293e]"
                    placeholder="Content"
                    required
                    rows={6}
                />


                {/* Select for lessonTypeId */}
                <label> Update LessonType </label>
                <select
                    name="lessonTypeId"
                    value={inputs.lessonTypeId}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded bg-[#0e293e]"
                    required
                >
                    <option value="">Select Lesson Type</option>
                    {lessonTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.typeName}
                        </option>
                    ))}
                </select>



                <label> Update Your VideoLink </label>
                <input
                    type="text"
                    name="videoLink"
                    value={inputs.videoLink || ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded bg-[#0e293e]"
                    placeholder="Video Link"
                />

                <label> Update Reference </label>
                <input
                    type="text"
                    name="lessonref"
                    value={inputs.lessonref}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Reference"
                    required
                />
                <button
                    type="submit"
                    className={`p-2 bg-[#04b78f] text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Lesson"}
                </button>

            </form>
        </div>
    );
};

export default SingleLessonUpdatePage;
