"use client";


import {useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

type Inputs = {
    topic: string;
    content: string;
    ownerId: string
}

const AddQuestionboard = () => {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const { data: session } = useSession(); 
    const [inputs, setInputs] = useState<Inputs>({
        topic: "",
        content: "",
        ownerId: "",
    })
    const [loading, setLoading] = useState(false);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userId = session?.user.id



            if (!userId) {
                console.error("User ID not found");
                return;
            }


            const res = await fetch("http://localhost:3000/api/addquestionboard", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: inputs.topic,
                    content: inputs.content,
                    ownerId: userId
                }),
            });

            setLoading(false);
            router.push(`/myquestionboard`);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };



    return (
        <div>
            <form className='shadow-lg flex flex-wrap gap-4 p-8' onSubmit={handleSubmit}>
                <h1 className='text-4xl font-semibold text-gray-600'>
                    ADD New QuesionBoard
                </h1>

                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="topic">Topic</label>
                    <input
                        className="ring-1 ring-black p-2 rounded-sm"
                        type="text"
                        name="topic"
                        id="topic"
                        value={inputs.topic} // ค่าจาก state inputs
                        onChange={handleChange} // เรียกใช้งาน handleChange เมื่อมีการเปลี่ยนแปลง
                        placeholder="add topic here..."
                    />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="content">Content</label>
                    <textarea
                        className="ring-1 ring-black p-2 rounded-sm"
                        name="content"
                        id="content"
                        value={inputs.content}
                        onChange={handleChange}
                        placeholder="Add content here..." // เพิ่ม hint text ที่แสดงใน textarea
                        rows={4} // จำนวนแถวเริ่มต้นของ textarea
                    />
                </div>
                <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">Submit</button>
            </form>
        </div>
    )
}


export default AddQuestionboard