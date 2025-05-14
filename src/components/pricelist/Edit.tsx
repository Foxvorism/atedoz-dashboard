"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';

export default function PricelistEdit({ id }: { id: number }) {

    const [pricelist, setPricelist] = useState({
        id: 0,
        nama_paket: "",
        harga: "",
        deskripsi: "",
        thumbnail: null,
      });

    const fetchPricelistById = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/packages/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
    
          if (response.data) {
            setPricelist({
              id: response.data.id,
              nama_paket: response.data.nama_paket || "",
              harga: response.data.harga || "",
              deskripsi: response.data.deskripsi || "",
              thumbnail: response.data.thumbnail || null,
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


    const updatePricelist = async (e: React.FormEvent) => {
        e.preventDefault();
    
        Swal.fire({
          title: "Loading...",
          text: "Please wait...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });
    
        try {
          await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/packages/${pricelist.id}`,
            {
              nama_paket: pricelist.nama_paket,
              harga: pricelist.harga,
              deskripsi: pricelist.deskripsi,
              thumbnail: pricelist.thumbnail,
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
            text: "Pricelist berhasil diperbarui.",
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
        fetchPricelistById();
      }, [id]);

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
                            value={pricelist.nama_paket}
                            onChange={(e) => setPricelist({ ...pricelist, nama_paket: e.target.value })}
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
                                value={pricelist.harga}
                                onChange={(e) => setPricelist({ ...pricelist, harga: e.target.value })}
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
                            value={pricelist.deskripsi}
                            name="deskripsi"
                            onChange={(e) => setPricelist({ ...pricelist, deskripsi: e.target.value })}
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
