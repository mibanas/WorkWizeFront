import { FC } from 'react';
import Image from 'next/image';

interface SectionProps {
    data: SectionData;
}

interface SectionData {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
}

const FonctionalityRight: FC<SectionProps>  = ({ data }) => {
    return (
        <section className="flex flex-col mb-28 container md:flex-row items-center md:justify-between my-8 md:container max-w-screen-lg">
            
            <div className="md:w-1/2 flex flex-col items-center md:items-start">
                <h2 className="text-3xl mb-12 font-extrabold mb-4 text-[#2b405c]">{data.title}</h2>
                <p className="text-lg">{data.description}</p>
            </div>


            <div className="md:w-1/2 flex justify-center">
                <Image
                    src={data.imageSrc}
                    alt={data.imageAlt}
                    width={500}
                    height={500}
                />
            </div>
        
        </section>
    )
}

export default FonctionalityRight