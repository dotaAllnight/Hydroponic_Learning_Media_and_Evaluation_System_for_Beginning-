"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface LessonType {
    id: string;
    typeName: string;
}


type Inputs = {
    title: string;
    lessonTypeId: string;
    description: string;
    content: string;
    videoLink: string;
    lessonref: string;

}

const AddNewLesson = () => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [inputs, setInputs] = useState<Inputs>({
        title: "",
        lessonTypeId: "",
        description: "",
        content: "",
        videoLink: "",
        lessonref: "",

    });

    const [lessonTypes, setLessonTypes] = useState<LessonType[]>([]);

    useEffect(() => {
        const fetchLessonTypes = async () => {
            const res = await fetch("http://localhost:3000/api/lessonType");
            const data = await res.json();
            setLessonTypes(data);
        };

        fetchLessonTypes();
    }, []);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/lessons", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...inputs
                }),
            });
            const data = await res.json();
            router.push(`/menu`);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className='bg-[#37ae96]'>
            <form onSubmit={handleSubmit} className='shadow-lg flex flex-wrap gap-4 p-8'>
                <h1 className='text-4xl font-semibold text-gray-600'>
                    ADD New Lesson
                </h1>

                <div className='w-full flex flex-col gap-2'>
                    <label > Title </label>
                    <input
                        className="ring-1 ring-black p-2 rounded-sm"
                        type="text"
                        name="title"
                        onChange={handleChange}
                    />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label > Desc </label>
                    <input
                        className="ring-1 ring-black p-2 rounded-sm"
                        type="text"
                        name="description"
                        onChange={handleChange}
                    />
                </div >

                <div className='w-full flex flex-col gap-2'>
                    <label > Content </label>
                    <textarea className="ring-1 ring-black p-2 rounded-sm" name="content" onChange={handleChange} />
                </div >

                <div className='w-full flex flex-col gap-2'>
                    <label> Lesson Type </label>
                    <select name="lessonTypeId" onChange={handleChange} className="ring-1 ring-black p-2 rounded-sm">
                        <option value="">Select Lesson Type</option>

                        {lessonTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.typeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label > Video Link </label>
                    <input className="ring-1 ring-black p-2 rounded-sm" type="text" name="videoLink" onChange={handleChange} />
                </div>

                <div>
                    <label > reference </label>
                    <input className="ring-1 ring-black p-2 rounded-sm" type="text" name="lessonref" onChange={handleChange} />
                </div>

                <button type='submit' className='p-2 w-full bg-green-300' > Create new Lesson </button>




            </form>
        </div>
    )
}

export default AddNewLesson