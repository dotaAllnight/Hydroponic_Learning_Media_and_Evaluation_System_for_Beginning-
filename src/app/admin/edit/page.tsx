// src/app/admin/edit/page.tsx

"use client"; // Ensure this is a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";

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
        <div className="w-screen bg-[#f2f2f2] min-h-screen flex items-center justify-center">
            <div className="w-full max-w-5xl p-4">
                <Table className="mt-10 w-full bg-[#CDCDCD]">
                    <TableCaption>End of list</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableCell className="font-semibold text-[#005691] px-16 py-7">Title</TableCell>
                            <TableCell className="font-semibold text-[#005691] px-16 py-7">Description</TableCell>
                            <TableCell className="font-semibold text-[#005691] px-16 py-7 text-right">Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lessons.map((lesson) => (
                            <TableRow key={lesson.lessonId}>
                                <TableCell className="font-semibold text-black px-4 py-2">
                                    {lesson.title}
                                </TableCell>
                                <TableCell className="text-black px-4 py-2">
                                    {lesson.description}
                                </TableCell>
                                <TableCell className="px-4 py-2 flex justify-end">
                                    <button
                                        onClick={() => handleEdit(lesson.lessonId)}
                                        className="p-2 bg-blue-500 text-white rounded-md transition-all duration-300 hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
export default EditLessonPage;
