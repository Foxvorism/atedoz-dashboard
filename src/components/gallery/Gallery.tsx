"use client";
import axios from "axios";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GridIcon, TrashBinIcon, PencilIcon } from "../../icons";

type Photo = {
    id: number;
    foto: string;
    deskripsi: string;
};

interface Category {
    id: number;
    judul: string;
    thumbnail?: string;
    updated_at:string;
}

export default function Gallery() {
    const { isOpen: isModalPhotoOpen, openModal: openModalPhoto, closeModal: closeModalPhoto } = useModal();
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/categories/`, {
                headers: {
                    'content-type': 'application/json',
                }
            });

            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                console.warn("⚠️ Format response tidak sesuai harapan:", response.data);
            }
        } catch (error) {
            console.error("Server error:", error);
            setError("Terjadi kesalahan saat mengambil data kategori.");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan saat mengambil data kategori.',
            });
        } finally {
            setLoading(false);
        }
    };

    function formatTanggalIndo(dateString: string): string {
        if (!dateString) return "-";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "-";

        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
    }

    const sortedCategories = [...categories].sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateA - dateB;
    });

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedCategories.map((category) => (
                    <div
                        key={category.id}
                        className="relative w-full bg-gray-100 rounded-lg overflow-hidden hover:scale-[102%]"
                    >
                        <Link href={`/gallery/detail/${category.id}`}>
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${category.thumbnail}`}
                                alt={category.judul}
                                className="aspect-video w-full object-cover cursor-pointer"
                                />
                            <div className="p-4">
                                <h2 className="text-xl truncate">{category.judul}</h2>
                                <h3 className="text-gray-400 text-xs">{formatTanggalIndo(category.updated_at)}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
