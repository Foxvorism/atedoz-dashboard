"use client";
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
// import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '../../icons';

export default function PricelistInput() {

    const [message, setMessage] = useState("");

    const [open, setOpen] = useState(false)

    const [pricelist, setPricelistData] = useState([]);

    const [pricelists, setPricelists] = useState({
        id: 0,
        nama_paket: "",
        harga: "",
        deskripsi: "",
        thumbnail: null
    });

    const createPricelist = async (e: FormEvent) => {
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
        bodyFormData.append('nama_paket', pricelists.nama_paket);
        bodyFormData.append('harga', String(Number(pricelists.harga)));
        bodyFormData.append('deskripsi', pricelists.deskripsi);
        if (pricelists.thumbnail) {
            bodyFormData.append('thumbnail', pricelists.thumbnail);
        }
    
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/packages`,
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
            getPriceListData();
    
            // Reset form
            setPricelists({
                id: 0,
                nama_paket: "",
                harga: "",
                deskripsi: "",
                thumbnail: null
            });
    
            setOpen(false);
            Swal.close();
    
            // ✅ Tambahkan notifikasi sukses
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
    

    const getPriceListData = async () => {
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
                setPricelistData(response.data.data);
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
        getPriceListData();
    }, []);



    return (
        <form onSubmit={createPricelist}>
            <ComponentCard title="New Pricelist Form" href="/pricelist">
                <div className="space-y-6">
                    <div>
                        <Label>Service Name</Label>
                        <Input
                            type="text"
                            placeholder="Masukan nama layanan"
                            name="nama"
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
                            Submit a New Package
                        </button>
                    </div>
                </div>
            </ComponentCard>
        </form>
    );
}
