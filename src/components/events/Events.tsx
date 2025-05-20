"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { TableIcon, PencilIcon, TrashBinIcon } from "../../icons/index";
import Link from "next/link";
import axios from "axios";

const Events: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/events`, {
                headers: {
                    'content-type': 'application/json',
                }
            });
            if (Array.isArray(response.data)) {
                setEvents(response.data);
            } else {
                console.warn("⚠️ Format response tidak sesuai harapan:", response.data);
            }
        } catch (error) {
            console.error("❌ Gagal mengambil data events:", error);
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

    const sortedEvents = [...events].sort((a, b) => {
        const dateA = new Date(a.tanggal_event).getTime();
        const dateB = new Date(b.tanggal_event).getTime();
        return dateA - dateB;
    });


    useEffect(() => {
        fetchEvents();
    }, []);
    

    return(
        <div className="">
            <Link href="/events/input">
                <button 
                    className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                >
                    <div className="mr-1">
                        <TableIcon />
                    </div>
                    Create a new Event
                </button>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedEvents.map((event) => (
                    <div
                        key={event.id}
                        className="relative w-full bg-gray-100 rounded-lg overflow-hidden hover:scale-[102%]"
                    >
                        <Link href={`/events/detail/${event.id}`}>
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${event.thumbnail}`}
                                alt={event.alt}
                                className="aspect-video w-full object-cover cursor-pointer"
                                />
                            <div className="p-4">
                                <h2 className="text-xl truncate">{event.nama_event}</h2>
                                <h3 className="text-gray-400 text-xs">{formatTanggalIndo(event.tanggal_event)}</h3>
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

export default Events;