"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PageIcon, PencilIcon, TrashBinIcon } from "../../icons/index";

interface Category {
    id: number;
    judul: string;
    thumbnail?: string;
    updated_at:string;
}

const Categories: React.FC = () => {
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

    useEffect(() => {
        fetchCategory();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const sortedCategories = [...categories].sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateA - dateB;
    });

    const handleDelete = async (id: number) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/categories/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Update UI: filter out artikel yang dihapus
            setCategories(prev => prev.filter(category => category.id !== id));

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Article data has been deleted",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Error while deleting the article:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to Delete",
                text: "Terjadi kesalahan saat menghapus data.",
            });
        }
    }
};

    return(
        <div>
            <Link href="/categories/input">
                <button 
                    className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                >
                    <div className="mr-1">
                        <PageIcon />
                    </div>
                    Create a new Category
                </button>
            </Link>

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
                        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                            <Link href={`/categories/edit/${category.id}`} className="w-full">
                                <button
                                    className="bg-yellow-500 p-1 rounded-md text-black flex justify-center items-center w-full"
                                    onClick={(e) => e.stopPropagation()} // biar gak trigger modal
                                >
                                    <PencilIcon className="mr-1" />
                                    <span>Edit</span>
                                </button>
                                </Link>
                            <button
                                className="bg-red-500 p-1 rounded-md text-white flex justify-center items-center"
                                onClick={(e) => {
                                    e.stopPropagation(); // biar gak ke-trigger modal/category click
                                    handleDelete(category.id);
                                }}
                            >
                                <TrashBinIcon className="mr-1" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;