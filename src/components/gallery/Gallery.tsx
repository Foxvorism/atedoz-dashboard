"use client";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GridIcon, TrashBinIcon } from "../../icons";

type Photo = {
    id: number;
    foto: string;
    deskripsi: string;
};

export default function Gallery() {
    const { isOpen: isModalPhotoOpen, openModal: openModalPhoto, closeModal: closeModalPhoto } = useModal();
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);

    const handlePhotoClick = (photo: Photo) => {
        setSelectedPhoto(photo);
        openModalPhoto();
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Loading...",
                    text: "Mohon tunggu sebentar...",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/galleries/${id}`,
                        {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to delete");
                    }

                    await getGalleryPhotos(); // refresh data setelah delete

                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                } catch (error) {
                    console.error("❌ Error deleting photo:", error);
                    Swal.fire("Error!", "Failed to delete the file.", "error");
                }
            }
        });
    };


    const getGalleryPhotos = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/galleries`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();

            if (Array.isArray(data)) {
                setPhotos(data);
            } else {
                console.warn("⚠️ Unexpected response format:", data);
            }
        } catch (error) {
            console.error("❌ Failed to fetch gallery photos:", error);
        }
    };

    useEffect(() => {
        getGalleryPhotos();
    }, []);

    const sortedPhotos = [...photos].sort((a, b) => b.id - a.id);

    return (
        <div>
            <Link href="/gallery/input">
                <button className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]">
                    <div className="mr-1">
                        <GridIcon />
                    </div>
                    Add Photo to the Gallery
                </button>
            </Link>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                {sortedPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className="w-full bg-gray-100 rounded-lg hover:scale-[102%] transition"
                        onClick={() => handlePhotoClick(photo)}
                    >
                        <div className="relative w-full overflow-hidden rounded-t-lg">
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${photo.foto}`}
                                alt={photo.deskripsi || `Photo ${photo.id}`}
                                className="object-cover w-full h-full cursor-pointer aspect-square"
                            />
                        </div>

                        <button
                            className="flex items-center justify-center w-full p-1 text-white bg-red-500 rounded-b-lg hover:bg-red-600"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(photo.id);
                            }}
                        >
                            <TrashBinIcon className="mr-1" />
                            <span>Delete</span>
                        </button>
                    </div>
                ))}
            </div>

            {isModalPhotoOpen && selectedPhoto && (
                <Modal isOpen={isModalPhotoOpen} onClose={closeModalPhoto} className="lg:max-w-[45vw] max-w-[80vw]">
                    <div className="w-full">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${selectedPhoto.foto}`}
                            alt={selectedPhoto.deskripsi}
                            className="object-cover w-full rounded-xl aspect-square"
                        />
                        {selectedPhoto.deskripsi && (
                            <p className="mt-2 text-sm text-center text-gray-700">{selectedPhoto.deskripsi}</p>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
}
