import DeleteLessonPage from "@/components/DeleteLessonPage";
import { Lesson } from "../../../types/types";




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
        <div>
            <DeleteLessonPage lessons={lessons} /> {/* ส่งข้อมูลไปยัง Client Component ผ่าน props */}
        </div>
    );
};

export default AdminLessonPage;
