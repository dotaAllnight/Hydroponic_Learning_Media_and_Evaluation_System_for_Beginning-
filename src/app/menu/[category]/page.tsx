"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const getData = async (category: string) => {
    const res = await fetch(`http://localhost:3000/api/lessons?typeId=${category}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data!");
    }

    return res.json();
};

type Props = {
    params: { category: string }
}

const CategoryPage = ({ params }: Props) => {
    const [lessons, setLessons] = useState<any[]>([]); // State เพื่อเก็บบทเรียน
    const [loading, setLoading] = useState<boolean>(true); // State เพื่อจัดการการโหลดข้อมูล
    const [error, setError] = useState<string | null>(null); // State เพื่อเก็บข้อผิดพลาด

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setLoading(true);
                const data = await getData(params.category); // ดึงข้อมูลบทเรียนตามประเภท
                setLessons(data);
            } catch (err) {
                setError("Failed to fetch lessons.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [params.category]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-wrap gap-4 justify-center items-start p-4 bg-[#e0f2f1]">
            {lessons.map((lesson) => (
                <div
                    key={lesson.lessonId}
                    className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] p-4 bg-[#004d40] border border-gray-300 rounded-md shadow-md"
                >
                    <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
                    {lesson.img && (
                        <Image
                            src={lesson.img}
                            alt={lesson.title}
                            width={450}
                            height={500}
                            className="object-cover rounded-md"
                        />
                    )}

                </div>
            ))}
        </div>

    );
};

export default CategoryPage;
