"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";

export default function PricelistEdit({ id }: { id: number }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isNewFile, setIsNewFile] = useState(false);

  const [pricelist, setPricelist] = useState({
    id: 0,
    nama_paket: "",
    harga: "",
    deskripsi: "",
    thumbnail: null as File | string | null,
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setPricelist((prev) => ({ ...prev, thumbnail: file }));
        setIsNewFile(true);
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

  const fetchPricelistById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/packages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        Swal.fire({
          icon: "error",
          title: "Data tidak valid",
          text: "Data pricelist tidak valid atau kosong.",
        });
        return;
      }

      setPricelist({
        id: data.id ?? 0,
        nama_paket: data.nama_paket ?? "",
        harga: data.harga ?? "",
        deskripsi: data.deskripsi ?? "",
        thumbnail: data.thumbnail ?? null,
      });

      if (data.thumbnail) {
        setImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${data.thumbnail}`);
      } else {
        setImagePreview(null);
      }

      setIsNewFile(false);
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
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("nama_paket", pricelist.nama_paket);
      formData.append("harga", pricelist.harga);
      formData.append("deskripsi", pricelist.deskripsi);
      if (isNewFile && pricelist.thumbnail instanceof File) {
        formData.append("thumbnail", pricelist.thumbnail);
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/packages/${pricelist.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
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
        title: "Terjadi kesalahan",
        text: "Silakan coba lagi nanti.",
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
                      setPricelist(prev => ({ ...prev, thumbnail: null }));
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
            <Label>Service Price</Label>
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
