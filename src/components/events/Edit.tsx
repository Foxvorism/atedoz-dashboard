"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDropzone } from "react-dropzone";
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import DatePicker from '../form/date-picker';
import Input from '../form/input/InputField';


export default function EventsEdit({ id }: { id: number }) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    // Track if we're using a new file or keeping existing image
    const [isNewFile, setIsNewFile] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setEvent(prev => ({ ...prev, thumbnail: file }));
                setIsNewFile(true); // Mark that we're using a new file
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

    const [event, setEvent] = useState({
        id: 0,
        nama_event: "",
        deskripsi_event: "",
        tanggal_event: null as Date | null,
        thumbnail: null as File | string | null,
        longitude: "",
        latitude: ""
    });

    const fetchEventsById = async () => {
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

            const data = response.data;

            // Cek data valid dan tipe objek, bukan array atau null
            if (!data || typeof data !== "object" || Array.isArray(data)) {
                Swal.fire({
                    icon: "error",
                    title: "Data tidak valid",
                    text: "Data event yang diterima tidak valid atau kosong.",
                });
                return;
            }

            setEvent({
                id: data.id ?? 0,
                nama_event: data.nama_event ?? "",
                deskripsi_event: data.deskripsi_event ?? "",
                tanggal_event: data.tanggal_event ? new Date(data.tanggal_event) : null,
                thumbnail: data.thumbnail ?? null,
                longitude: data.longitude?.toString() ?? "",
                latitude: data.latitude?.toString() ?? "",
            });

            if (data.thumbnail) {
                setImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${data.thumbnail}`);
            } else {
                setImagePreview(null);
            }

            setIsNewFile(false); // Reset new file flag when loading existing data

            console.log("📦 Data event:", data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal Mengambil Data",
                text: "Terjadi kesalahan saat mengambil data event.",
                showConfirmButton: true,
            });
        }
    };


    const updateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        Swal.fire({
            title: "Loading...",
            text: "Please wait...",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        const formData = new FormData();
        formData.append("_method", "PUT"); // Laravel method spoofing
        formData.append("nama_event", event.nama_event);
        formData.append("deskripsi_event", event.deskripsi_event);
        formData.append(
            "tanggal_event",
            event.tanggal_event ? event.tanggal_event.toISOString().split("T")[0] : ""
        );
        if (event.longitude) {
            formData.append("longitude", event.longitude.toString());
        }
        if (event.latitude) {
            formData.append("latitude", event.latitude.toString());
        }

        // Handle thumbnail properly based on what type it is
        if (isNewFile && event.thumbnail instanceof File) {
            // If it's a new file, send the file
            formData.append("thumbnail", event.thumbnail);

        }

        try {
            await axios.post( // gunakan POST, bukan PUT
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/events/${event.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Data event berhasil diperbarui.",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error: any) {
            const message = error?.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi.";
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/signin";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal Memperbarui",
                    text: message,
                    showConfirmButton: true,
                });
            }
        }
    };

    useEffect(() => {
        fetchEventsById();
    }, [id]);

    return (
        <form onSubmit={updateEvent}>
            <ComponentCard title="Edit Event Form" href="/events">
                <div className="space-y-6">
                    <div>
                        <Label>Select a Photo</Label>
                        {imagePreview ? (
                            <div className="flex justify-center mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-[40vw] aspect-[3/2] object-cover rounded-lg border border-gray-300 bg-transparent mr-3"
                                />
                                <div>
                                    <button
                                        className="flex justify-center items-center text-sm w-7 h-7 rounded-md font-bold border text-center p-2 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                                        onClick={e => {
                                            e.preventDefault();
                                            setImagePreview(null);
                                            setEvent(prev => ({ ...prev, thumbnail: null }));
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="transition border border-gray-300 border-solid cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500"
                                {...getRootProps()}
                            >
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
                            placeholder="Masukan nama Event"
                            name="nama_event"
                            value={event.nama_event}
                            onChange={(e) => setEvent({ ...event, nama_event: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Tanggal Event</Label>
                        <DatePicker
                            id="event-date"
                            mode="single"
                            label={undefined}
                            placeholder="Pilih tanggal event"
                            defaultDate={event.tanggal_event ?? undefined}
                            onChange={([date]: Date[]) => {
                                setEvent({ ...event, tanggal_event: date || null });
                            }}

                        />
                    </div>
                    <div>
                        <Label htmlFor="tm">Deskripsi Event</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Masukan koordinat garis lintang"
                                name="deskripsi_event"
                                value={event.deskripsi_event}
                                onChange={(e) => setEvent({ ...event, deskripsi_event: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="tm">Longitude</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Masukan koordinat garis bujur"
                                name="longitude"
                                value={event.longitude}
                                onChange={(e) => setEvent({ ...event, longitude: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label>Latitude</Label>
                        <Input
                            type="text"
                            name="latitude"
                            value={event.latitude}
                            onChange={(e) => setEvent({ ...event, latitude: e.target.value })}
                            placeholder="Masukan latitude (opsional)"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </ComponentCard>
        </form>
    );
}