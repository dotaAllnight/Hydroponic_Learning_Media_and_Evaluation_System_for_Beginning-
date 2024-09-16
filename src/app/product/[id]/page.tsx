import { Lesson } from "../../../../types/types";
import Image from "next/image";

const getData = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/lessons/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data!");
    }

    return res.json();
}

const SingleProduct = async ({ params }: { params: { id: string } }) => {
    const singleProduct: Lesson = await getData(params.id);

    return (
        <div className='p-4 lg:px-20 xl:px-40 h-screen flex flex-col md:flex-row justify-center items-center text-gray-600'>
            {/* Video Container */}
            <div className='flex flex-col items-center md:w-1/2 mb-4 md:mb-0'>
                {singleProduct.videoLink && (
                    <div className='relative w-full pb-[56.25%]'>
                        <iframe
                            className='absolute top-0 left-0 w-full h-full'
                            src={singleProduct.videoLink}
                            title="Video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>

            {/* Text Container */}
            <div className='flex flex-col items-center md:w-1/2 text-center md:pl-12'>
                <h1 className='text-2xl font-bold mb-4'>{singleProduct.title}</h1>
                <p className='text-lg mb-4'>{singleProduct.description}</p>

                {singleProduct.img && (
                    <div className='mt-4'>
                        <p className='text-xl mb-2'>{singleProduct.content}</p>
                        <p className='text-lg'>{singleProduct.lessonref}</p>
                    </div>
                )}
            </div>
        </div>
    );

}

export default SingleProduct;
