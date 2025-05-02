"use client";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { GridIcon } from "../../icons/index";
import Link from "next/link";

const Gallery: React.FC = () => {
    const { isOpen: isModalPhotoOpen, openModal: openModalPhoto, closeModal: closeModalPhoto } = useModal();
    
    const [selectedPhoto, setSelectedPhoto] = useState<{ id: number; url: string, alt: string } | null>(null);

    const photos = [
        { id: 1, url: "https://images.unsplash.com/photo-1744566917536-792e7f28c4c8?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 1" },
        { id: 2, url: "https://images.unsplash.com/photo-1736796312243-e1510b8b5c3a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 2" },
        { id: 3, url: "https://images.unsplash.com/photo-1744278955687-2a0216448268?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 3" },
        { id: 4, url: "https://images.unsplash.com/photo-1744762561513-4388d8326a74?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 4" },
        { id: 5, url: "https://plus.unsplash.com/premium_photo-1669223464660-08f06bffabc0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 5" },
    ];

    // Sort photos by id in descending order
    const sortedPhotos = [...photos].sort((a, b) => b.id - a.id);

    // Function to handle opening the modal with the photo data
    const handlePhotoClick = (photo: { id: number; url: string; alt: string }) => {
        setSelectedPhoto(photo);  // Set the selected photo's id and url
        openModalPhoto();  // Open the modal
    };

    return (
        <div className="">
            <Link href="/gallery/input">
                <button 
                className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                >
                    <div className="mr-1">
                        <GridIcon />
                    </div>
                    Add Photo to the Gallery
                </button>
            </Link>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {sortedPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative w-full bg-gray-100 rounded-lg overflow-hidden hover:scale-[102%]"
                        onClick={() => handlePhotoClick(photo)} // Handle click event for first modal
                    >
                        <img
                            src={photo.url}
                            alt={photo.alt}
                            className="aspect-square w-full h-full object-cover cursor-pointer"
                        />
                    </div>
                ))}
            </div>

            {/* First Modal to display selected photo's ID and URL */}
            {isModalPhotoOpen && selectedPhoto && (
                <Modal isOpen={isModalPhotoOpen} onClose={closeModalPhoto} className="lg:max-w-[45vw] max-w-[80vw]">
                    <div className="w-full">
                        <img
                            src={selectedPhoto.url}
                            alt={selectedPhoto.alt}
                            className="rounded-xl object-cover aspect-square"
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Gallery;