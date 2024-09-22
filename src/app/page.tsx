'use client';

import ImageGrid from "@/components/image-grid";
import SearchBar from "@/components/search-bar";
import ImageViewer from "@/components/image-viewer";
import { Img } from "@/types";
import { useEffect, useState, useRef } from "react";
import { lockBodyScroll, unlockBodyScroll } from "@/utils/useBodyScrollLock";

async function getImages(page: number, limit = 30): Promise<Img[]> {
  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error('Failed to fetch images');
  }
  return res.json();
}

export default function Home() {
  const [images, setImages] = useState<Img[]>([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<Img | null>(null);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const newImages = await getImages(page);
        setImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedImage) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }

    return () => {
      unlockBodyScroll();
    };
  }, [selectedImage]);

  const handleImageClick = (image: Img) => {
    setSelectedImage(image);
  };

  const handleCloseViewer = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container max-w-[100vw] px-4 py-8">
      <SearchBar />
      <div className="flex flex-col md:flex-row relative">
        <div className={`transition-all duration-300 ${selectedImage ? 'md:w-2/3' : 'w-full'}`}>
          <ImageGrid images={images} onImageClick={handleImageClick} />
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-50 md:static md:z-auto md:w-1/3 md:sticky md:top-4 md:self-start md:max-h-[calc(100vh-2rem)]">
            <ImageViewer
              image={selectedImage}
              onClose={handleCloseViewer}
              images={images}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}
      </div>
      {loading && <p>Loading more images...</p>}
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
}