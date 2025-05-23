"use client";
import axios from "axios";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PencilIcon, TableIcon, TrashBinIcon } from "../../icons/index";


const Events: React.FC = () => {
  const [events, setEvents] = useState<{
    thumbnail: string;
    nama_event: ReactNode;
    tanggal_event: string;
    updated_at: any; id: number; url: string; alt: string; title: string
  }[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<{ id: number; url: string; alt: string; title: string } | null>(null);
  // Function to fetch events from the API
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

  const deleteEvents = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1B1B1B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Loading...',
          text: 'Mohon tunggu sebentar...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        try {
          // Pastikan id yang dikirimkan adalah valid
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/events/${id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            }
          );
          await fetchEvents();  // Refresh data setelah dihapus
          Swal.fire(
            'Deleted!',
            'Your event data has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error while deleting the price:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Delete',
            text: 'Terjadi kesalahan saat menghapus data.',
          });
        }
      }
    });
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  // Sort events by id in descending order
  const sortedEvents = [...events].sort((a, b) => b.id - a.id);

  // Function to handle opening the modal with the event data
  const handleEventClick = (event: { id: number; url: string; alt: string, title: string }) => {
    setSelectedEvent(event);  // Set the selected event's id and url
    // openModalEvent();  // Open the modal
  };

  return (
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            className="relative w-full bg-gray-100 rounded-lg overflow-hidden hover:scale-[102%]"
            onClick={() => handleEventClick(event)} // Handle click event for first modal
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${event.thumbnail}`}
              alt={event.alt}
              className="object-cover w-full cursor-pointer aspect-video"
            />
            <div className="p-4">
              <h2 className="text-xl truncate">{event.nama_event}</h2>
              <h3 className="text-xs text-gray-400">{event.tanggal_event}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
              <button className="flex items-center justify-center p-1 text-black bg-yellow-500 rounded-md hover:bg-yellow-400">
                <Link href={`/events/edit/${event.id}`}>
                  <span className="flex items-center">
                    <PencilIcon className="mr-1" />
                    Edit
                  </span>
                </Link>
              </button>
              <button className="flex items-center justify-center p-1 text-white bg-red-500 rounded-md hover:bg-red-400"
                onClick={() => deleteEvents(event.id)}>
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