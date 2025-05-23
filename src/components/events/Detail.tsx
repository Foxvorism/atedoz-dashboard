"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Image from 'next/image'; // ✅ Tambahkan ini
import { TableIcon, PencilIcon, TrashBinIcon } from "../../icons/index";
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import axios from "axios";

export default function EventDetail({ id }: { id: number }) {
    const [event, setEvent] = useState({
        id: 0,
        thumbnail: "",
        nama_event: "",
        tanggal_event: "",
        deskripsi_event: "",
        longitude: "",
        latitude: ""
    });

    const fetchEventById = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/events/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data) {
                setEvent({
                    id: response.data.id,
                    thumbnail: response.data.thumbnail || "",
                    nama_event: response.data.nama_event || "",
                    deskripsi_event: response.data.deskripsi_event || null,
                    tanggal_event: response.data.tanggal_event || "",
                    longitude: response.data.longitude || "",
                    latitude: response.data.latitude || "",
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
        fetchEventById();
        console.log("UPDATED_AT RAW:", event.tanggal_event);
    }, [id]);

    return (
        <>
            <ComponentCard title={`Detail of  ${event.nama_event}`} href="/events">
                <div className="text-center mb-5">
                    <h2 className="text-2xl font-bold">{event.nama_event}</h2>
                    <h2 className="text-lg font-normal text-gray-800/50">
                        {formatTanggalIndo(event.tanggal_event)}
                    </h2>
                </div>

                <div className="flex justify-center items-center mb-3">
                    <Image
                        layout="intrinsic" // Menggunakan layout intrinsic agar width menyesuaikan dengan height
                        width={300} // Tentukan lebar gambar sebagai referensi rasio
                        height={0} 
                        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${event.thumbnail}`}
                        alt={event.thumbnail}
                        className="aspect-video rounded-xl w-[80%] h-full object-cover cursor-pointer"
                    />
                </div>
                <div className="text-center mb-5">
                    <h2 className="text-sm font-medium text-gray-800/50">Location : {event.longitude}, {event.latitude}</h2>
                </div>

                <div className="text-justify mx-16">
                    <p className="text-lg font-light">{event.deskripsi_event}</p>
                </div>
            </ComponentCard>
        </>
    )
}