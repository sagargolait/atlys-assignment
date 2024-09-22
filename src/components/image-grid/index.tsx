import { Img } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ImageGridProps {
    images: Img[],
    onImageClick: (image: Img) => void;
}

const ImageGrid = ({ images, onImageClick }: ImageGridProps) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {images.map((image) => (
                <div key={image.id} className="flex flex-col rounded-lg" onClick={() => onImageClick(image)}>
                    <div className='relative w-full pb-[75%]'>
                        <Image
                            src={`https://picsum.photos/id/${image.id}/250/200`}
                            alt={image.author}
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg cursor-pointer"
                            width={250}
                            height={200}
                        />
                    </div>
                    <div className="mt-2 text-sm">
                        <Link href={image.url} replace className="hover:underline">
                            {image.author}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ImageGrid