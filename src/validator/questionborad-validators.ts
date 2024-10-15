


export interface QuestionboardDetail {
    id: string;
    topic: string; // หัวข้อของ Questionboard
    content?: string; // เนื้อหาของ Questionboard (อาจจะไม่จำเป็น)
    img?: string | null; // รูปภาพที่เกี่ยวข้อง (อาจจะไม่จำเป็น)
    createdAt: Date; // วันที่สร้าง
    owner: { // ข้อมูลเจ้าของ
        id: string; // รหัสเจ้าของ
        name: string | null; // ชื่อเจ้าของ (อาจจะเป็น null)
        email: string; // อีเมลของเจ้าของ
    };
    answers: Array<{ // รายการคำตอบ
        id: string; // รหัสคำตอบ
        content_answer: string; // เนื้อหาคำตอบ
        createdAt: Date; // วันที่สร้างคำตอบ
        author: { // ข้อมูลผู้เขียนคำตอบ
            id: string; // รหัสผู้เขียน
            name: string | null; // ชื่อผู้เขียน (อาจจะเป็น null)
        };
    }>;
}
