"use client"
import CompleteLessonButton from "@/components/CompleteLessonButton";
import { Lesson } from "../../../../types/types";
import { useEffect, useState } from "react";
import React from "react";
import Loading from "@/components/Loading";

import "./../../../app/globals.css"
import { ScrollArea } from "@/components/ui/scroll-area";



const getData = async (id: string) => {

    const res = await fetch(`http://localhost:3000/api/lessons/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data!");
    }

    return res.json();
}

const SingleLesson = ({ params }: { params: { id: string } }) => {
    const [singleLesson, setSingleLesson] = useState<Lesson | null>(null);
    const [showLoader, setShowLoader] = React.useState(true);
    const [finished, setFinished] = React.useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData(params.id);
                setSingleLesson(data);
            } catch (err) {
                setError("Failed to load lesson");
            } finally {
                setShowLoader(false);
                setFinished(true); // Set finished to true when loading is done
            }
        };
        fetchData();
    }, [params.id]);



    if (error) {
        return <div>{error}</div>;
    }

    if (showLoader) {
        return <Loading finished={finished} />
    }


    return (
        <div className='bg-[#03fc9d] p-3 lg:px-20 xl:px-50 h-screen flex flex-col md:flex-row justify-center items-center text-gray-600 mt-20'>
            {/* Video Container */}
            <div className='flex flex-col items-center md:w-1/2 mb-4 md:mb-0'>
                {singleLesson?.videoLink && (
                    <div className='relative w-full pb-[56.25%]'>
                        <iframe
                            className='absolute top-0 left-0 w-full h-full'
                            src={singleLesson.videoLink}
                            title="Video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>

            {/* Text Container */}
            <div className='flex flex-col items-center md:w-2/3 text-center md:pl-12 mt-15'>
                <h1 className='text-xl font-bold mb-4'>{singleLesson?.title}</h1>
                <p className='text-sm mb-4'>{singleLesson?.description}</p>

                {/* Display content and lesson reference */}
                <div className='mt-4 boxshadoww overflow-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
                    <ScrollArea className='max-h-90'>
                        <p className='text-base text-justify mb-2'>{singleLesson?.content}</p>
                    </ScrollArea>
                    <p className='text-sm mt-4'>
                        <span className="font-bold">Reference:</span> {singleLesson?.lessonref}
                    </p>
                </div>

                {/* Complete Lesson Button */}
                {singleLesson && (
                    <div className="mt-6">
                        <CompleteLessonButton lessonId={singleLesson.lessonId} />
                    </div>
                )}
            </div>
        </div>
    );


};



export default SingleLesson;
