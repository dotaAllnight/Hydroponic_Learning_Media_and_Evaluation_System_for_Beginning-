"use client";


import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

type Inputs = {
    topic: string;
    content: string;
    ownerId: string;
    img: string;
}

const AddQuestionboard = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [inputs, setInputs] = useState<Inputs>({
        topic: "",
        content: "",
        ownerId: "",
        img: "",
    })
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File>()

    const upload = async () => {
        const data = new FormData();
        data.append("file", file!);
        data.append("upload_preset", "duxvcxdq");

        const res = await fetch("https://api.cloudinary.com/v1_1/dcozis1lq/image/upload", {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Upload failed:", errorData);
            throw new Error(`Upload failed: ${errorData.message}`);
        }

        const resData = await res.json();
        return resData.secure_url; // ใช้ secure_url
    };




    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const item = (target.files as FileList)[0]
        setFile(item)

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };




    // ใน handleSubmit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = await upload();
            const userId = session?.user.id;

            if (!userId) {
                console.error("User ID not found");
                return;
            }

            if (!inputs.topic || !inputs.content || !url) {
                console.error("Missing required fields");
                setLoading(false);
                return;
            }

            const res = await fetch("http://localhost:3000/api/addquestionboard", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    img: url,
                    topic: inputs.topic,
                    content: inputs.content,
                    ownerId: userId
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("API Error:", errorData);
                throw new Error(`API Error: ${errorData.message}`);
            }

            setLoading(false);
            router.push(`/myquestionboard`);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };





    return (
        <div className='bg-[#0e3452] min-h-screen p-15 '>
            <form className='shadow-lg flex flex-wrap gap-4 p-8' onSubmit={handleSubmit}>
                <h1 className='text-4xl font-semibold text-[#d1d6db]'>
                    ADD New QuesionBoard
                </h1>

                <div className="w-full flex flex-col gap-2 text-[#6d96be]">
                    <label> Image</label>
                    <input
                        className="ring-1  p-2 rounded-md"
                        type="file"
                        onChange={handleChangeImg}
                    />

                </div>

                <div className='w-full flex flex-col gap-2 text-[#6d96be]'>
                    <label htmlFor="topic">Topic</label>
                    <input
                        className="ring-1 ring-black p-2 rounded-sm bg-[#0e293e] text-[#d1d6db]"
                        type="text"
                        name="topic"
                        id="topic"
                        value={inputs.topic} // ค่าจาก state inputs
                        onChange={handleChange} // เรียกใช้งาน handleChange เมื่อมีการเปลี่ยนแปลง
                        placeholder="add topic here..."
                    />
                </div>

                <div className='w-full flex flex-col gap-2 text-[#6d96be]'>
                    <label htmlFor="content">Content</label>
                    <textarea
                        className="ring-1 ring-black p-2 rounded-sm bg-[#0e293e] text-[#d1d6db]"
                        name="content"
                        id="content"
                        value={inputs.content}
                        onChange={handleChange}
                        placeholder="Add content here..." // เพิ่ม hint text ที่แสดงใน textarea
                        rows={4} // จำนวนแถวเริ่มต้นของ textarea
                    />
                </div>
                <button type="submit" className="mt-4 p-2 bg-[#04b78f] text-white rounded">Submit</button>
            </form>
        </div>
    )
}


export default AddQuestionboard