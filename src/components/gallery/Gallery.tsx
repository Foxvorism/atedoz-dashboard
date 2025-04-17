"use client";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { GridIcon } from "../../icons/index";

const Gallery: React.FC = () => {
    const { isOpen: isModalPhotoOpen, openModal: openModalPhoto, closeModal: closeModalPhoto } = useModal();
    const { isOpen: isModalAddOpen, openModal: openModalAdd, closeModal: closeModalAdd } = useModal();
    
    const [selectedPhoto, setSelectedPhoto] = useState<{ id: number; url: string, alt: string } | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // For previewing the selected image
    const [altText, setAltText] = useState<string>(""); // For the alt text input

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

    // Handle file input change (image preview)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string); // Set the image preview
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle alt text input change
    const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAltText(e.target.value);
    };

    // Function to open the second modal (Add photo modal)
    const handleAddPhotoClick = () => {
        openModalAdd();  // Open the second modal when the button is clicked
    };

    return (
        <div className="">
            {/* Button to open the "Add Photo" modal */}
            <button 
                className="flex w-full justify-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                onClick={handleAddPhotoClick}  // Open the second modal
            >
                <div className="mr-1">
                    <GridIcon />
                </div>
                Add Photo to the Gallery
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {sortedPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative w-full pt-[100%] bg-gray-100 rounded-lg overflow-hidden hover:scale-[102%]"
                        onClick={() => handlePhotoClick(photo)} // Handle click event for first modal
                    >
                        <img
                            src={photo.url}
                            alt={photo.alt}
                            className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                        />
                    </div>
                ))}
            </div>

            {/* First Modal to display selected photo's ID and URL */}
            {isModalPhotoOpen && selectedPhoto && (
                <Modal isOpen={isModalPhotoOpen} onClose={closeModalPhoto} className="max-w-[45vw]">
                    <div className="w-full">
                        <img
                            src={selectedPhoto.url}
                            alt={selectedPhoto.alt}
                            className="rounded-xl object-cover aspect-square"
                        />
                    </div>
                </Modal>
            )}

            {/* Second Modal for "Add Photo" */}
            {isModalAddOpen && (
                <Modal isOpen={isModalAddOpen} onClose={closeModalAdd} className="max-w-[700px] p-6 lg:p-10">
                    <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                        <div>
                            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                                Add Photo to the Gallery
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Plan your next big moment: schedule or edit an event to stay on
                                track
                            </p>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div className="mb-3">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Chose Photo from your File
                                    </label>
                                    {/* Input for selecting an image */}
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 mb-3"
                                    />
                                    
                                    {/* Preview the selected image */}
                                    {imagePreview && (
                                        <div className="mb-4 flex justify-center items-center">
                                            <img src={imagePreview} alt="Preview" className="w-[20vw] aspect-square object-cover rounded-lg border border-gray-300 bg-transparent" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Alternate Text
                                    </label>
                                    {/* Input for the alt text */}
                                    <input
                                        type="text"
                                        value={altText}
                                        onChange={handleAltTextChange}
                                        placeholder="Enter alt text for the image"
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Gallery;