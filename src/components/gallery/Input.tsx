"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function GalleryInput() {
    // State untuk file foto dan preview
    const [foto, setFoto] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // State untuk deskripsi dan studio
    const [deskripsi, setDeskripsi] = useState("");
    const [studio, setStudio] = useState("");

    // Dropdown options studio
    const options = [
        { value: "1", label: "Atedoz Space G.g Kelor" },
        { value: "2", label: "Atedoz Space Bogor Baru" },
    ];

    // Dropzone handler
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setFoto(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [],
            "image/jpeg": [],
            "image/webp": [],
            "image/svg+xml": [],
        },
        multiple: false,
    });

    // Jika user pilih studio dari dropdown
    const handleSelectChange = (value: string) => {
        setStudio(value);
    };

    // Kalau user browse manual file selain drag-drop
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFoto(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // Submit form ke backend
    const createGallery = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!foto) {
            Swal.fire("Error", "Foto belum dipilih.", "error");
            return;
        }
        // if (!studio) {
        //     Swal.fire("Error", "Cabang studio belum dipilih.", "error");
        //     return;
        // }

        Swal.fire({
            title: "Loading...",
            text: "Mohon tunggu sebentar...",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const formData = new FormData();
            formData.append("foto", foto);
            formData.append("deskripsi", deskripsi);
            // formData.append("photo_studio_id", studio); // ✅ fix: gunakan variabel yang benar

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/galleries`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            Swal.close();

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Foto berhasil ditambahkan.",
                timer: 2000,
                showConfirmButton: false,
            });

            // Reset form
            setFoto(null);
            setDeskripsi("");
            setStudio("");
            setImagePreview(null);
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Terjadi kesalahan saat mengirim data.",
            });
            console.error(error);
        }
    };


    return (
        <form onSubmit={createGallery} className="space-y-6">
            <ComponentCard title="New Gallery Form" href="/gallery">
                <div className="space-y-6">
                    <div>
                        <Label>Select a Photo</Label>
                        {imagePreview ? (
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-[40vw] aspect-[3/2] object-cover rounded-lg border border-gray-300 bg-transparent"
                                />
                                <button
                                    type="button"
                                    className="flex justify-center items-center text-sm w-7 h-7 rounded-md font-bold border p-2 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFoto(null);
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ) : (
                            <div
                                {...getRootProps()}
                                className={`transition border border-gray-300 border-solid cursor-pointer rounded-xl hover:border-brand-500 p-7 lg:p-10 ${isDragActive
                                    ? "border-brand-500 bg-gray-100"
                                    : "border-gray-300 bg-gray-50"
                                    }`}
                            >
                                <input {...getInputProps()} onChange={handleFileChange} />
                                <div className="flex flex-col items-center m-0 dz-message">
                                    <div className="mb-[22px] flex justify-center">
                                        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700">
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
                                    <h4 className="mb-3 text-xl font-semibold text-gray-800">
                                        {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
                                    </h4>
                                    <span className="text-center mb-5 block max-w-[290px] text-sm text-gray-700">
                                        Drag and drop your PNG, JPG, WebP, SVG images here or browse
                                    </span>
                                    <span className="text-sm font-medium underline text-brand-500">
                                        Browse File
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
{/* 
                    <div>
                        <Label>Studio</Label>
                        <div className="relative">
                            <Select
                                options={options}
                                placeholder="Pilih cabang studio"
                                onChange={(value) => handleSelectChange(value || "")}
                                className="dark:bg-dark-900"
                            />

                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2">
                                <ChevronDownIcon />
                            </span>
                        </div>
                    </div> */}

                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            placeholder="Masukan deskripsi gambar"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center items-center rounded-lg border p-2 text-lg text-white bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-500)]"
                        >
                            Submit Photo to Gallery
                        </button>
                    </div>
                </div>
            </ComponentCard>
        </form>
    );
}
