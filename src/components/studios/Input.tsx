"use client";
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';

export default function StudioInput() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [studios, setStudioData] = useState([]);

    const [studio, setStudio] = useState({
        id: 0,
        nama_studio: "",
        longitude: "",
        latitude: "",
        deskripsi_posisi: ""
    });

    const createStudio = async (e: FormEvent) => {
        e.preventDefault();
        Swal.fire({
            title: 'Loading...',
            text: 'Mohon tunggu sebentar...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const bodyFormData = new FormData();
        bodyFormData.append('nama_studio', studio.nama_studio);
        bodyFormData.append('longitude', String(parseFloat(studio.longitude)));
        bodyFormData.append('latitude', String(parseFloat(studio.latitude)));
        bodyFormData.append('deskripsi_posisi', studio.deskripsi_posisi);

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/studios`,
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            console.log(res.data);

            // Refresh data
            getStudioData();

            // Reset form
            setStudio({
                id: 0,
                nama_studio: "",
                longitude: "",
                latitude: "",
                deskripsi_posisi: ""
            });

            setOpen(false);
            Swal.close();

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Paket harga berhasil ditambahkan.',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan saat mengirim data.',
            });
        }
    };


    const getStudioData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/packages`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.data.data) {
                setStudioData(response.data.data);
                console.log(response.data.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.error("Server error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'error terjadi',
                    text: 'mohon coba lagi nanti.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };


    useEffect(() => {
        getStudioData();
    }, []);

    return (
        <form onSubmit={createStudio}>
            <ComponentCard title="New Studio Form" href="/studios">
                <div className="space-y-6">
                    <div>
                        <div>
                            <Label>Studio Name</Label>
                            <Input
                                type="text"
                                placeholder="Masukan nama studio"
                                value={studio.nama_studio}
                                onChange={(e) => setStudio({ ...studio, nama_studio: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <Label>Latitude</Label>
                                <Input
                                    type="text"
                                    placeholder="Masukan koordinat garis lintang"
                                    value={studio.latitude}
                                    onChange={(e) => setStudio({ ...studio, latitude: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>Longitude</Label>
                                <Input
                                    type="text"
                                    placeholder="Masukan koordinat garis bujur"
                                    value={studio.longitude}
                                    onChange={(e) => setStudio({ ...studio, longitude: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label>Event Description</Label>
                        <TextArea
                            value={studio.deskripsi_posisi}
                            onChange={(value) => setStudio({ ...studio, deskripsi_posisi: value })}
                            rows={6}
                            placeholder="Masukan deskripsi studio"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                        >
                            Create a new Studio
                        </button>
                    </div>
                </div>
            </ComponentCard>
        </form>
    );
}
