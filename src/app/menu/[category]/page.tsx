import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Lesson } from "../../../../types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

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

                    href={`/lesson/${lesson.lessonId}`}
                >
                    <Card className="w-full max-w-md h-60 p-4 bg-[#004d40] border border-gray-300 rounded-md shadow-md hover:bg-[#80e0c1] transition-colors duration-300">

                        <CardHeader className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-white">{lesson.title}</CardTitle>
                            <Book className="text-white" size={28} strokeWidth={2.5} />
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-white text-sm">{lesson.description}</p>
                        </CardContent>
                    </Card>




                </Link>
            ))}
        </div>
    );
};

export default CategoryPage;
