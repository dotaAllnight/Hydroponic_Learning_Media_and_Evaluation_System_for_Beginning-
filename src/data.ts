
type Lesson = {
    lessonId: number;
    lessonType: string;
    description: string;
    img?: string | null;
    content: string;
    videoLink?: string;
    lessonRef?: string;
    /*createdAt: Date;
    updatedAt?: Date;*/
};

type Lessons = Lesson[]

export const featuredLessons: Lessons = [
    {
        lessonId: 1,
        lessonType: "Info",
        description: "This Description",
        img: "/temporary/p1.png",
        content: "content here...",
        videoLink: "XD",
        lessonRef: "google.com",

    },
];