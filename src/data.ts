
type LessonCard = {
    lessonId: number;
    lessontitle: string;
    description: string;
    img?: string | null;
    videolink?: string;

};

type Lessons = LessonCard[]

export const featuredLessons: Lessons = [
    {
        lessonId: 1,
        lessontitle: "Basic for hydroponic1",
        description: "Hydroponic vegetables are grown without soil, using nutrient-rich water instead to deliver essential minerals directly to the plants.",
        img: "/hydro3.png",
        videolink: "https://www.youtube.com/embed/wBcnUUkdavE?si=VL0xJuI4O18orh5c",

    },

    {
        lessonId: 2,
        lessontitle: "Basic for hydroponic2",
        description: "This method of farming allows for faster growth and higher yields compared to traditional soil cultivation",
        img: "/hydro4.png",
        videolink: "https://www.youtube.com/embed/wBcnUUkdavE?si=VL0xJuI4O18orh5c",

    },

    {
        lessonId: 3,
        lessontitle: "Basic for hydroponic3",
        description: "Hydroponic systems are also more water-efficient, making them an environmentally friendly option for sustainable agriculture.",
        img: "/hydro5.png",
        videolink: "https://www.youtube.com/embed/wBcnUUkdavE?si=VL0xJuI4O18orh5c",

    },
    {
        lessonId: 4,
        lessontitle: "Basic for hydroponic1",
        description: "Hydroponic vegetables are grown without soil, using nutrient-rich water instead to deliver essential minerals directly to the plants.",
        img: "/hydro3.png",
        videolink: "https://www.youtube.com/embed/wBcnUUkdavE?si=VL0xJuI4O18orh5c",

    },

    {
        lessonId: 5,
        lessontitle: "Basic for hydroponic2",
        description: "This method of farming allows for faster growth and higher yields compared to traditional soil cultivation",
        img: "/hydro4.png",
        videolink: "https://www.youtube.com/embed/wBcnUUkdavE?si=VL0xJuI4O18orh5c",

    },

    {
        lessonId: 6,
        lessontitle: "Basic for hydroponic3",
        description: "Hydroponic systems are also more water-efficient, making them an environmentally friendly option for sustainable agriculture.",
        img: "/hydro5.png",
        videolink: "https://www.youtube.com/embed/wBcnUUkdavE?si=VL0xJuI4O18orh5c",

    },
];


type LessonList = {
    id: number;
    lessontype: string;
    title: string;
    desc?: string;
    img?: string;

}[];

export const lessonList: LessonList = [
    {
        id: 1,
        lessontype: "INFO",
        title: "Hydroponic INFO",
        desc: "การปลูกผักแบบไฮโดรโปนิกส์เป็นวิธีการปลูกพืชที่ใช้สารละลายธาตุอาหารแทนดิน ซึ่งช่วยให้พืชสามารถเติบโตได้อย่างรวดเร็วและมีคุณภาพสูง โดยไม่ต้องใช้พื้นที่มากและสามารถควบคุมปัจจัยต่างๆ ",
        img: "/hydro5.png",

    },

    {
        id: 2,
        lessontype: "METHODS",
        title: "Hydroponic METHODS",
        desc: " NFT : น้ำและสารอาหารไหลผ่านรากพืชในท่อโปร่ง เพื่อให้พืชได้รับสารอาหารอย่างต่อเนื่องและระบบแบบอื่นๆ",
        img: "/hydro5.png",

    },

    {
        id: 3,
        lessontype: "NUTRIENTS",
        title: "Hydroponic NUTRIENTS",
        desc: "สารอาหารที่ใช้ในระบบไฮโดรโปนิกส์ประกอบด้วยธาตุหลัก ได้แก่ ไนโตรเจน (N), ฟอสฟอรัส (P), และโพแทสเซียม (K)  นอกจากนี้ยังมีธาตุรองอื่นๆ การใช้สารอาหารที่มีความสมดุลและการควบคุมระดับ pH",
        img: "/hydro5.png",

    },

    {
        id: 4,
        lessontype: "GROWING PLANS",
        title: "Hydroponic GROWING PLANS",
        desc: "การเลือกพืช, การเตรียมระบบ, การเตรียมสารอาหาร, การปลูกและการดูแล, การเก็บเกี่ยว",
        img: "/hydro5.png",

    },

    {
        id: 5,
        lessontype: "BENEFITS ",
        title: "Hydroponic BENEFITS",
        desc: "การใช้พื้นที่อย่างมีประสิทธิภาพ: สามารถปลูกพืชในพื้นที่จำกัด เช่น ในบ้านหรือบนหลังคา ทำให้เหมาะสำหรับพื้นที่เมือง และอื่นๆ",
        img: "/hydro5.png",

    },
]


type LessonMenu = {
    id: number;
    lessontype: string;
    title: string;
    desc?: string;
    img: string;
    videlink?: string;

}[];

export const menu: LessonMenu = [

    {
        id: 1,
        lessontype: "INFO",
        title: "Hydroponic INFO",
        desc: "การปลูกผักแบบไฮโดรโปนิกส์เป็นวิธีการปลูกพืชที่ใช้สารละลายธาตุอาหารแทนดิน ซึ่งช่วยให้พืชสามารถเติบโตได้อย่างรวดเร็วและมีคุณภาพสูง โดยไม่ต้องใช้พื้นที่มากและสามารถควบคุมปัจจัยต่างๆ ",
        img: "/hydro5.png",

    },

    {
        id: 2,
        lessontype: "METHODS",
        title: "Hydroponic METHODS",
        desc: " NFT : น้ำและสารอาหารไหลผ่านรากพืชในท่อโปร่ง เพื่อให้พืชได้รับสารอาหารอย่างต่อเนื่องและระบบแบบอื่นๆ",
        img: "/hydro4.png",

    },

    {
        id: 3,
        lessontype: "NUTRIENTS",
        title: "Hydroponic NUTRIENTS",
        desc: "สารอาหารที่ใช้ในระบบไฮโดรโปนิกส์ประกอบด้วยธาตุหลัก ได้แก่ ไนโตรเจน (N), ฟอสฟอรัส (P), และโพแทสเซียม (K)  นอกจากนี้ยังมีธาตุรองอื่นๆ การใช้สารอาหารที่มีความสมดุลและการควบคุมระดับ pH",
        img: "/hydro3.png",

    },

    {
        id: 4,
        lessontype: "GROWING PLANS",
        title: "Hydroponic GROWING PLANS",
        desc: "การเลือกพืช, การเตรียมระบบ, การเตรียมสารอาหาร, การปลูกและการดูแล, การเก็บเกี่ยว",
        img: "/hydro5.png",

    },

    {
        id: 5,
        lessontype: "BENEFITS ",
        title: "Hydroponic BENEFITS",
        desc: "การใช้พื้นที่อย่างมีประสิทธิภาพ: สามารถปลูกพืชในพื้นที่จำกัด เช่น ในบ้านหรือบนหลังคา ทำให้เหมาะสำหรับพื้นที่เมือง และอื่นๆ",
        img: "/hydro5.png",

    },

]

export const singleLessonPage: LessonCard = {

    lessonId: 1,
    lessontitle: "Basic for hydroponic1",
    description: "Hydroponic vegetables are grown without soil, using nutrient-rich water instead to deliver essential minerals directly to the plants.",
    img: "/hydro3.png",
    videolink: "https://www.youtube.com/embed/wBcnUUkdavE?si=VL0xJuI4O18orh5c",

}