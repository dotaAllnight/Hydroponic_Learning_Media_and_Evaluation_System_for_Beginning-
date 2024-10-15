// types.ts

export type User = {
    id: string;
    name: string;
    email: string;

};


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
    lessonTypeId?: string;

};

export type Questionborad = {
    id: string;
    topic: string;
    img?: string;
    content: string;
    createdAt: string;
    owner: User; // Ensure this is of type User

    answers: Answer[]; // Array of answers related to this question board
};

export type Answer = {
    id: string;
    content_answer: string;
    createdAt: string;
    questiosnboradId: string; // Reference to the related Questionborad
    authorId: string; // Reference to the author (User)
};



