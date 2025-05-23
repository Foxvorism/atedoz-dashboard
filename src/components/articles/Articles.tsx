"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PageIcon, PencilIcon, TrashBinIcon } from "../../icons/index";

interface Article {
    id: number;
    url: string;
    alt: string;
    title: string;
    judul: string;
    thumbnail?: string;
    updated_at:string;
}

const Articles: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/articles/`, {
                headers: {
                    'content-type': 'application/json',
                }
            });

            if (Array.isArray(response.data)) {
                setArticles(response.data);
            } else {
                console.warn("⚠️ Format response tidak sesuai harapan:", response.data);
            }
        } catch (error) {
            console.error("Server error:", error);
            setError("Terjadi kesalahan saat mengambil data artikel.");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan saat mengambil data artikel.',
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
        fetchArticles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const sortedArticles = [...articles].sort((a, b) => {
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
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/articles/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Update UI: filter out artikel yang dihapus
            setArticles(prev => prev.filter(article => article.id !== id));

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
            <Link href="/articles/input">
                <button 
                    className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                >
                    <div className="mr-1">
                        <PageIcon />
                    </div>
                    Create a new Article
                </button>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedArticles.map((article) => (
                    <div
                        key={article.id}
                        className="relative w-full bg-gray-100 rounded-lg overflow-hidden hover:scale-[102%]"
                    >
                        <Link href={`/articles/detail/${article.id}`}>
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${article.thumbnail}`}
                                alt={article.judul}
                                className="aspect-video w-full object-cover cursor-pointer"
                                />
                            <div className="p-4">
                                <h2 className="text-xl truncate">{article.judul}</h2>
                                <h3 className="text-gray-400 text-xs">{formatTanggalIndo(article.updated_at)}</h3>
                            </div>
                        </Link>
                        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                            <Link href={`/articles/edit/${article.id}`} className="w-full">
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
                                    e.stopPropagation(); // biar gak ke-trigger modal/article click
                                    handleDelete(article.id);
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

export default Articles;