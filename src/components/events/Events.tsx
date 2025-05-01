"use client";
import React, { useState } from "react";
import { TableIcon } from "../../icons/index";

const Events: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<{ id: number; url: string, alt: string, title: string } | null>(null);

    const events = [
        { id: 1, url: "https://images.unsplash.com/photo-1744566917536-792e7f28c4c8?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 1", title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi similique error excepturi quo natus! Modi sit voluptas impedit veniam rerum, et reprehenderit doloribus harum enim adipisci, ullam, aperiam eligendi facilis." },
        { id: 2, url: "https://images.unsplash.com/photo-1736796312243-e1510b8b5c3a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 2", title: "title 2" },
        { id: 3, url: "https://images.unsplash.com/photo-1744278955687-2a0216448268?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 3", title: "title 3" },
        { id: 4, url: "https://images.unsplash.com/photo-1744762561513-4388d8326a74?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 4", title: "title 4" },
        { id: 5, url: "https://plus.unsplash.com/premium_photo-1669223464660-08f06bffabc0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photo 5", title: "title 5" },
    ];

    // Sort events by id in descending order
    const sortedEvents = [...events].sort((a, b) => b.id - a.id);

    // Function to handle opening the modal with the event data
    const handleEventClick = (event: { id: number; url: string; alt: string, title: string }) => {
        setSelectedEvent(event);  // Set the selected event's id and url
        // openModalEvent();  // Open the modal
    };

    return(
        <div className="">
            <button 
                className="flex w-full justify-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                // onClick={handleAddPhotoClick}  // Open the second modal
            >
                <div className="mr-1">
                    <TableIcon />
                </div>
                Create a new Event
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedEvents.map((event) => (
                    <div
                        key={event.id}
                        className="relative w-full bg-gray-100 rounded-lg overflow-hidden hover:scale-[102%]"
                        onClick={() => handleEventClick(event)} // Handle click event for first modal
                    >
                        <img
                            src={event.url}
                            alt={event.alt}
                            className="aspect-video w-full object-cover cursor-pointer"
                        />
                        <div className="p-4">
                            <h2 className="text-xl truncate">{event.title}</h2>
                            <h3 className="text-gray-400 text-xs">19 April 2025</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;