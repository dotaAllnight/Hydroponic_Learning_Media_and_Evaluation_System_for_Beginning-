// types.ts

export type LessonType = {
    id: string;
    typeName: string;
}[];

export type Lesson = {
    lessonId: string;
    title: string;
    description: string;
    content: string;
    videoLink?: string;
    img?: string;
    lessonref: string;
    createdAt: string;
};

