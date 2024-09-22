import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Img } from '@/types';
import Link from 'next/link';
import { MdMoreVert, MdClose } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoShareSocialSharp, IoBookmarkOutline } from "react-icons/io5";

type ImageViewerProps = {
    image: Img;
    onClose: () => void;
    images: Img[];
    setSelectedImage: (image: Img) => void;
};

export default function ImageViewer({ image, onClose, images, setSelectedImage }: ImageViewerProps) {
    const currentIndex = images.findIndex((img) => img.id === image.id);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            handleNext();
        }

        if (touchStart - touchEnd < -75) {
            handlePrev();
        }
    };

    return (
        <div
            className="relative overflow-scroll max-h-[100vh] border md:mx-2 rounded-lg bg-white h-full shadow-xl p-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className='flex justify-between gap-2 mb-2'>
                <Link href={image.url}>{image.author}</Link>
                <div className='flex gap-2 items-center cursor-pointer'>
                    {!isMobile && (
                        <>
                            <button onClick={handlePrev}><IoIosArrowBack size={24} /></button>
                            <button onClick={handleNext}><IoIosArrowForward size={24} /></button>
                        </>
                    )}
                    <MdMoreVert size={24} />
                    <MdClose onClick={onClose} size={24} />
                </div>
            </div>
            {/* Image Display */}
            <div className="relative w-full">
                <Image
                    src={image.download_url}
                    alt={image.author}
                    width={image.width}
                    height={image.height}
                />
            </div>
            <div className='flex justify-between mt-2'>
                <a href={image.download_url} className='hover:underline'>{image.author}</a>
                <Link href={image.url}>
                    <button className='p-2 text-sm text-white px-4 flex items-center gap-2 rounded-full border bg-[#1b73e6]'>
                        Visit <IoIosArrowForward size={16} />
                    </button>
                </Link>
            </div>
            <p className='text-sm'>Images maybe be subject to copyright. <a className='hover:underline' href={'/'}>Learn More</a></p>
            <div className='flex justify-between gap-2 mt-4'>
                <button className='flex bg-[#e7f1fd] outline-none items-center justify-center gap-1 p-2 px-4 w-full rounded-full'><IoShareSocialSharp />Share</button>
                <button className='flex bg-[#e7f1fd] outline-none items-center justify-center gap-1 p-2 px-4 w-full rounded-full' ><IoBookmarkOutline />Save</button>
            </div>
        </div>
    );
}