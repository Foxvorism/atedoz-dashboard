"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import DatePicker from '../form/date-picker';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';


export default function EventInput() {

    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [eventDetails, setEventDetails] = useState({
        nama_event: "",
        deskripsi_event: "",
        tanggal_event: "",
        thumbnail: null as File | null,
        longitude: "",
        latitude: ""
    });

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setEventDetails(prev => ({ ...prev, thumbnail: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [],
            "image/jpeg": [],
            "image/webp": [],
            "image/svg+xml": [],
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleDescriptionChange = (value: string) => {
        setEventDetails({ ...eventDetails, deskripsi_event: value });
    };

    const handleDateChange = (tanggal_event: string) => {
        setEventDetails({ ...eventDetails, tanggal_event });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        Swal.fire({
            title: 'Loading...',
            text: 'Mohon tunggu sebentar...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const formData = new FormData();
        formData.append("nama_event", eventDetails.nama_event);
        formData.append("tanggal_event", eventDetails.tanggal_event);
        formData.append("deskripsi_event", eventDetails.deskripsi_event || "");
        if (eventDetails.longitude) {
            formData.append("longitude", eventDetails.longitude.toString());
        }
        if (eventDetails.latitude) {
            formData.append("latitude", eventDetails.latitude.toString());
        }

        if (eventDetails.thumbnail instanceof File) {
            formData.append("thumbnail", eventDetails.thumbnail);
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/events`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Event berhasil ditambahkan.',
                timer: 2000,
                showConfirmButton: false
            });

            // Reset
            setEventDetails({
                nama_event: "",
                deskripsi_event: "",
                tanggal_event: "",
                thumbnail: null,
                longitude: "",
                latitude: ""
            });
            setImagePreview(null);



        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan saat mengirim data.',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ComponentCard title="New Event Form" href="/events">
                <div className="space-y-6">
                    <div>
                        <Label>Select a Photo</Label>
                        {imagePreview && (
                            <div className="flex justify-center mb-4">
                                <img src={imagePreview} alt="Preview" className="w-[40vw] aspect-[3/2] object-cover rounded-lg border border-gray-300 bg-transparent mr-3" />

                                <div>
                                    <button
                                        className="flex justify-center items-center text-sm w-7 h-7 rounded-md font-bold border text-center p-2 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setEventDetails(prev => ({ ...prev, thumbnail: null }));
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        )}

                        {!imagePreview && (
                            <div
                                className="transition border border-gray-300 border-solid cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500" {...getRootProps()}>
                                <div
                                    className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
                                ${isDragActive
                                            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                                            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="dz-message flex flex-col items-center m-0!">
                                        {/* Icon Container */}
                                        <div className="mb-[22px] flex justify-center">
                                            <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                                <svg
                                                    className="fill-current"
                                                    width="29"
                                                    height="28"
                                                    viewBox="0 0 29 28"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        {/* Text Content */}
                                        <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                                            {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
                                        </h4>
                                        <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                                            Drag and drop your PNG, JPG, WebP, SVG images here or browse
                                        </span>
                                        <span className="font-medium underline text-theme-sm text-brand-500">
                                            Browse File
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <Label>Event Title</Label>
                        <Input
                            type="text"
                            name="nama_event"
                            value={eventDetails.nama_event}
                            onChange={handleInputChange}
                            placeholder="Masukan judul acara" />
                    </div>

                    <div>
                        <DatePicker
                            id="date-picker"
                            label="Event Date"
                            placeholder="Select a date"
                            onChange={(dates, currentDateString) => {
                                handleDateChange(currentDateString);
                            }}
                        />
                    </div>

                    <div>
                        <Label>Event Description</Label>
                        <TextArea
                            value={eventDetails.deskripsi_event}
                            onChange={handleDescriptionChange}
                            rows={10}
                            placeholder="Masukan deskripsi acara"
                        />

                        <div className="space-y-4">
                            <Label>Longitude</Label>
                            <Input
                                type="text"
                                name="longitude"
                                value={eventDetails.longitude}
                                onChange={handleInputChange}
                                placeholder="Masukan longitude (opsional)"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label>Latitude</Label>
                            <Input
                                type="text"
                                name="latitude"
                                value={eventDetails.latitude}
                                onChange={handleInputChange}
                                placeholder="Masukan latitude (opsional)"
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                        >
                            Submit New Event
                        </button>
                    </div>
                </div>
            </ComponentCard>
        </form>
    );
}
