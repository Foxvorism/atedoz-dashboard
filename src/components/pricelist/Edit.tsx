"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';

export default function PricelistEdit({ id }: { id: number }) {

    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    
    // Initialize pricelist as an object, not an array
    const [pricelists, setPricelists] = useState({
        id: 0,
        nama_paket: "",
        harga: "",
        deskripsi: "",
        thumbnail: null
    });

    const getDetailPricelist = async (id: number) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/packages/${id}`,
                {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }
                }
            );

            const data = response.data.data;

            if (data) {
                setPricelists({
                    id: data.id,
                    nama_paket: data.nama_paket,
                    harga: data.harga,
                    deskripsi: data.deskripsi,
                    thumbnail: data.thumbnail || null,
                });
            } else {
                console.error("No data found for this pricelist");
            }

        } catch (error) {
            console.error("Gagal mengambil detail pricelist:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getDetailPricelist(id);
        }
    }, [id]);

    const updatePricelist = async (e: React.FormEvent) => {
        e.preventDefault();

        if (pricelists.id === 0) {
            console.error("ID is undefined or 0, cannot update");
            Swal.fire({
                icon: 'error',
                title: 'ID tidak valid',
                text: 'Data Pricelist tidak ditemukan.',
                showConfirmButton: true,
            });
            return;
        }

        Swal.fire({
            title: 'Loading...',
            text: 'Mohon tunggu sebentar...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const pricelistData = {
            nama_paket: pricelists.nama_paket,
            harga: pricelists.harga,
            deskripsi: pricelists.deskripsi,
            thumbnail: pricelists.thumbnail,
        };

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/packages/${pricelists.id}`,
                pricelistData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                }
            );

            const data = response.data?.data;

            if (!data) {
                console.error("Data tidak ditemukan dalam respons:", response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Data tidak ditemukan',
                    text: 'Tidak ada data layanan dengan ID tersebut.',
                    timer: 2000,
                    showConfirmButton: false
                });
                return;
            }

            // Reset state after successful update
            setPricelists({
                id: 0,
                nama_paket: '',
                harga: '',
                deskripsi: '',
                thumbnail: null
            });

            Swal.close();
            setOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                const logout = () => {
                    localStorage.removeItem('token');
                    window.location.href = '/signin';
                };
                logout();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error terjadi',
                    text: 'Mohon coba lagi nanti.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <form onSubmit={updatePricelist}>
            <ComponentCard title="Edit Pricelist Form" href="/pricelist">
                <div className="space-y-6">
                    <div>
                        <Label>Service Name</Label>
                        <Input
                            type="text"
                            placeholder="Masukan nama layanan"
                            name="nama_paket"
                            value={pricelists.nama_paket}
                            onChange={(e) => setPricelists({ ...pricelists, nama_paket: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tm">Service Price</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="Masukan harga layanan"
                                className="pl-[62px]"
                                name="harga"
                                value={pricelists.harga}
                                onChange={(e) => setPricelists({ ...pricelists, harga: e.target.value })}
                            />
                            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] text-sm -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
                                IDR
                            </span>
                        </div>
                    </div>
                    <div>
                        <Label>Service Description</Label>
                        <Input
                            type="text"
                            value={pricelists.deskripsi}
                            name="deskripsi"
                            onChange={(e) => setPricelists({ ...pricelists, deskripsi: e.target.value })}
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
