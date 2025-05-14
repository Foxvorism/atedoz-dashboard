"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';

export default function PricelistEdit({ id }: { id: number }) {

    const [studio, setStudio] = useState({
        id: 0,
        nama_studio: "",
        longitude: "",
        latitude: "",
        deskripsi_posisi: "",
    });

    const fetchStudiosById = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/studios/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data) {
                setStudio({
                    id: response.data.id,
                    nama_studio: response.data.nama_studio || "",
                    longitude: response.data.longitude || "",
                    latitude: response.data.latitude || "",
                    deskripsi_posisi: response.data.deskripsi_posisi || null,
                });
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


    const updateStudio = async (e: React.FormEvent) => {
        e.preventDefault();

        Swal.fire({
            title: "Loading...",
            text: "Please wait...",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/studios/${studio.id}`,
                {
                    nama_studio: studio.nama_studio,
                    longitude: studio.longitude,
                    latitude: studio.latitude,
                    deskripsi_posisi: studio.deskripsi_posisi,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Data studio berhasil diperbarui.",
                timer: 2000,
                showConfirmButton: false,
            });
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

    useEffect(() => {
        fetchStudiosById();
    }, [id]);

    return (
        <form onSubmit={updateStudio}>
            <ComponentCard title="Edit Studio Form" href="/studios">
                <div className="space-y-6">
                    <div>
                        <Label>Studio Name</Label>
                        <Input
                            type="text"
                            placeholder="Masukan nama studio"
                            name="nama_paket"
                            value={studio.nama_studio}
                            onChange={(e) => setStudio({ ...studio, nama_studio: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tm">Latitude</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Masukan koordinat garis lintang"
                                name="longitude"
                                value={studio.longitude}
                                onChange={(e) => setStudio({ ...studio, longitude: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="tm">Longitude</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Masukan koordinat garis bujur"
                                name="latitude"
                                value={studio.latitude}
                                onChange={(e) => setStudio({ ...studio, latitude: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Event Description</Label>
                        <Input
                            type="text"
                            value={studio.deskripsi_posisi}
                            name="deskripsi"
                            onChange={(e) => setStudio({ ...studio, deskripsi_posisi: e.target.value })}
                            placeholder="Masukan deskripsi layanan"
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
