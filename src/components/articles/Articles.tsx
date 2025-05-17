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
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/`, {
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

    useEffect(() => {
        fetchArticles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

//    const articles = [
//       { id: 1, url: "https://images.unsplash.com/photo-1744566917536-792e7f28c4c8?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 1", title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi similique error excepturi quo natus! Modi sit voluptas impedit veniam rerum, et reprehenderit doloribus harum enim adipisci, ullam, aperiam eligendi facilis." },
//       { id: 2, url: "https://images.unsplash.com/photo-1736796312243-e1510b8b5c3a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 2", title: "title 2" },
//        { id: 3, url: "https://images.unsplash.com/photo-1744278955687-2a0216448268?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 3", title: "title 3" },
//        { id: 4, url: "https://images.unsplash.com/photo-1744762561513-4388d8326a74?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 4", title: "title 4" },
//        { id: 5, url: "https://plus.unsplash.com/premium_photo-1669223464660-08f06bffabc0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 5", title: "title 5" },
//    ];

    // Sort articles by id in descending order
    const sortedArticles = [...articles].sort((a, b) => b.id - a.id);

    // Function to handle opening the modal with the article data
    const handleArticleClick = (article:Article) => {
        setSelectedArticle(article);  // Set the selected article's id and url
        // openModalArticle();  // Open the modal
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
                        onClick={() => handleArticleClick(article)} // Handle click event for first modal
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${article.thumbnail}`}
                            alt={article.judul}
                            className="aspect-video w-full object-cover cursor-pointer"
                        />
                        <div className="p-4">
                            <h2 className="text-xl truncate">{article.judul}</h2>
                            <h3 className="text-gray-400 text-xs">{article.updated_at.slice(0,10)}</h3>
                        </div>
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