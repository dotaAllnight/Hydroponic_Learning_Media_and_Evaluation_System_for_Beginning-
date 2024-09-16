import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Lesson } from "../../../../types/types";

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

const CategoryPage = async ({ params }: Props) => {
    const lessons: Lesson[] = await getData(params.category);

    return (
        <div className="flex flex-wrap gap-4 justify-center items-start p-4 bg-[#e0f2f1]">

            {lessons.map((lesson) => (
                <Link
                    key={lesson.lessonId}
                    className="w-full h-[60vh] border-r-2  sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group even:bg-red-100"
                    href={`/product/${lesson.lessonId}`}
                >
                    <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] p-4 bg-[#004d40] border border-gray-300 rounded-md shadow-md">
                        <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
                        {lesson.img && (
                            <Image
                                src={lesson.img}
                                alt={lesson.title}
                                width={450}
                                height={500}
                            />
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CategoryPage;
