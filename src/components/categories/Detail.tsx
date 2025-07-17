"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Image from 'next/image'; // ✅ Tambahkan ini
import { TableIcon, PencilIcon, TrashBinIcon } from "../../icons/index";
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import axios from "axios";

export default function ArticleDetail({ id }: { id: number }) {
    const [article, setArticle] = useState({
        id: 0,
        judul: "",
        content: "",
        thumbnail: "",
        updated_at: "",
    });

    const fetchArticleById = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/articles/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data) {
                setArticle({
                    id: response.data.id,
                    judul: response.data.judul || "",
                    thumbnail: response.data.thumbnail || "",
                    content: response.data.content || "",
                    updated_at: response.data.updated_at || "",
                });
                console.log(response.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Data tidak ditemukan",
                    text: "Pricelist ID tidak sesuai.",
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error: any) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            Swal.fire({
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
            localStorage.removeItem("token");
            window.location.href = "/signin";
        } else {
            Swal.fire({
                icon: "error",
                title: "An error occurred",
                text: "Please try again later.",
                showConfirmButton: false,
                timer: 1500,
            });
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
        fetchArticleById();
        console.log("UPDATED_AT RAW:", article.updated_at);
    }, [id]);

    return (
        <>
            <ComponentCard title={`Detail of  ${article.judul}`} href="/articles">
                <div className="text-center mb-5">
                    <h2 className="text-2xl font-bold">{article.judul}</h2>
                    <h2 className="text-lg font-normal text-gray-800/50">
                        {formatTanggalIndo(article.updated_at)}
                    </h2>
                </div>

                <div className="flex justify-center items-center mb-10">
                    <Image
                        layout="intrinsic" // Menggunakan layout intrinsic agar width menyesuaikan dengan height
                        width={300} // Tentukan lebar gambar sebagai referensi rasio
                        height={0} 
                        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${article.thumbnail}`}
                        alt={article.thumbnail}
                        className="aspect-video rounded-xl w-[80%] h-full object-cover cursor-pointer"
                    />
                </div>

                <div className="text-justify mx-16">
                    <p className="text-lg font-light">{article.content}</p>
                </div>
            </ComponentCard>
        </>
    )
}