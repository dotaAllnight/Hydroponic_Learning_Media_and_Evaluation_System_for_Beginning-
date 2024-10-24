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
    const [isAdmin, setIsAdmin] = useState(false); //เพิ่มส่วนนี้



    useEffect(() => { //เพิ่มส่วนน

        if (session?.user?.role === 'Admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
            router.push('/'); // redirect ถ้าไม่ใช่ admin
        }
    }, [session]);






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
        <div className='bg-[#0e3452] min-h-screen p-15 '>

            <form onSubmit={handleSubmit} className='shadow-lg flex flex-col gap-4 p-8'>
                <h1 className='text-4xl font-semibold text-[#6d96be] mb-8'>
                    ADD New Lesson
                </h1>

                <div className='w-[70%] flex flex-col gap-2 text-[#6d96be]'>
                    <label> Title </label>
                    <input
                        className="ring-1 ring-black p-2 rounded-sm bg-[#0e293e] text-[#d1d6db]"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="add Title here..."
                    />
                </div>

                <div className='w-[70%] flex flex-col gap-2 text-[#6d96be]'>
                    <label> Desc </label>
                    <input
                        className="ring-1 ring-black p-2 rounded-sm bg-[#0e293e] text-[#d1d6db]"
                        type="text"
                        name="description"
                        onChange={handleChange}
                        placeholder="add Description here..."
                    />
                </div>

                <div className='w-[70%] flex flex-col gap-2 text-[#6d96be]'>
                    <label> Content </label>
                    <textarea
                        className="ring-1 ring-black p-2 rounded-sm h-40 bg-[#0e293e] text-[#d1d6db]"
                        name="content"
                        onChange={handleChange}
                        placeholder="add Content here..."
                    />


                </div>

                <div className='w-[70%] flex flex-col gap-2 text-[#6d96be]'>
                    <label> Lesson Type </label>
                    <select name="lessonTypeId" onChange={handleChange}
                        className="ring-1 ring-black p-2 rounded-sm bg-[#0e293e]">
                        <option value="">Select Lesson Type</option>
                        {lessonTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.typeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='w-[70%] flex flex-col gap-2 text-[#6d96be]'>
                    <label> Video Link </label>
                    <input
                        className="ring-1 ring-black p-2 rounded-sm bg-[#0e293e]"
                        type="text"
                        name="videoLink"
                        onChange={handleChange}
                        placeholder="add Video Link here..."
                    />
                </div>

                <div className='w-[70%] flex flex-col gap-2 text-[#6d96be]'>
                    <label> Reference </label>
                    <input
                        className="ring-1 ring-black p-2 rounded-sm bg-[#0e293e]"
                        type="text"
                        name="lessonref"
                        onChange={handleChange}
                        placeholder="add Reference here..."
                    />
                </div>

                <div className='flex p-8 w-full'>
                    <button type='submit'
                        className='p-2 w-[20%] bg-[#04b78f]'>
                        Create new Lesson
                    </button>
                </div>
            </form>



        </div>
    )
}

export default AddNewLesson