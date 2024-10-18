import DeleteLessonPage from "@/components/DeleteLessonPage";
import { Lesson } from "../../../types/types";
import { PenIcon, Plus } from "lucide-react";
import Link from "next/link";




const getData = async (): Promise<Lesson[]> => {
    const res = await fetch("http://localhost:3000/api/lessons", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch lessons!");
    }

    return res.json();
};




const AdminLessonPage = async () => {
    const lessons = await getData(); // ดึงข้อมูลใน Server Component

    return (
        <div className="w-screen bg-gradient-to-r from-[#03fc9d] to-[#028a6b] text-[#003b2f] min-h-screen flex items-center justify-center">
            <Link href="/add">
                <button className="h-7 md:h-36border-[3px] border-spacing-4 border-dashed grid place-items-center group">
                    <span className="inline-flex flex-col items-center gap-x-1 font-medium group-hover:text-pink-600 transition-colors duration-150">
                        <Plus className="w-5 h-5" />
                        <span>Create New Lesson</span>
                    </span>
                </button>
            </Link>

            <Link href="/admin/edit">
                <button className="h-7 md:h-36border-[3px] border-spacing-4 border-dashed grid place-items-center group">
                    <span className="inline-flex flex-col items-center gap-x-1 font-medium group-hover:text-pink-600 transition-colors duration-150">
                        <PenIcon className="w-5 h-5" />
                        <span>Edit Lesson</span>
                    </span>
                </button>
            </Link>


            <DeleteLessonPage lessons={lessons} />
        </div>
    );
};

export default AdminLessonPage;
