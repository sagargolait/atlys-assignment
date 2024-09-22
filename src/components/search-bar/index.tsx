'use client'

import Image from 'next/image';
import React, { useState } from 'react'

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");

    return (
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-2 w-full">
            <Image
                src='/google-logo.svg'
                alt='logo'
                width={92}
                height={30}
                className="mb-4 sm:mb-0 sm:mr-4"
            />
            <div className="flex items-center border border-gray-300 w-full max-w-xl rounded-full px-4 py-2 bg-white">
                <input
                    type="text"
                    placeholder="Search Google"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow outline-none text-gray-700 text-sm sm:text-base"
                />

                <div className="flex space-x-2 ml-2">
                    <Image src='/google-mic.svg' alt='mic' width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                    <Image src='/google-image-search.svg' alt='image search' width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                    <Image src='/search.svg' alt='search' width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>
        </div>
    )
}

export default SearchBar