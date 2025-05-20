"use client";
import React, { useState, useEffect } from "react";
import { PageIcon, PencilIcon, TrashBinIcon } from "../../icons/index";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

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
                            <button className="bg-yellow-500 p-1 rounded-md text-black flex justify-center items-center">
                                <PencilIcon className="mr-1" />
                                <span>Edit</span>
                            </button>
                            <button className="bg-red-500 p-1 rounded-md text-white flex justify-center items-center">
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