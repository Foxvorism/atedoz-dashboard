"use client";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";

interface Props {
  id: number;
}

export default function EditForm({ id }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isNewFile, setIsNewFile] = useState(false);

  const [articleData, setArticleData] = useState({
    id: 0,
    judul: "",
    content: "",
    thumbnail: null as File | null,
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setArticleData((prev) => ({ ...prev, thumbnail: file }));
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

  const fetchArticleById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/articles/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        Swal.fire({
          icon: "error",
          title: "Data tidak valid",
          text: "Data artikel yang diterima tidak valid atau kosong.",
        });
        return;
      }

      setArticleData({
        id: data.id ?? 0,
        judul: data.judul ?? "",
        content: data.content ?? "",
        thumbnail: null,
      });

      if (data.thumbnail) {
        setImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/photos/${data.thumbnail}?t=${Date.now()}`);
      } else {
        setImagePreview(null);
      }

      setIsNewFile(false);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  useEffect(() => {
    fetchArticleById();
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleData((prev) => ({ ...prev, judul: e.target.value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticleData((prev) => ({ ...prev, content: e.target.value }));
  };

  const updateArticle = async (e: FormEvent) => {
    e.preventDefault();

    if (!articleData.judul.trim()) {
      Swal.fire("Error", "Judul tidak boleh kosong", "error");
      return;
    }
    if (!articleData.content.trim()) {
      Swal.fire("Error", "Konten tidak boleh kosong", "error");
      return;
    }

    Swal.fire({
      title: "Loading...",
      text: "Sedang mengupdate artikel...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("judul", articleData.judul);
    formData.append("content", articleData.content);

    if (isNewFile && articleData.thumbnail instanceof File) {
      formData.append("thumbnail", articleData.thumbnail);
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/articles/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Artikel berhasil diperbarui.",
        timer: 2000,
        showConfirmButton: false,
      });

      fetchArticleById();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui artikel.",
      });
    }
  };

  return (
    <form onSubmit={updateArticle}>
      <ComponentCard title="Edit Article Form" href="/articles">
        <div className="space-y-6">
          <div>
            <Label>Select a Photo</Label>
             {/* Preview the selected image */}
            {imagePreview && (
              <div className="mb-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-[40vw] aspect-[3/2] object-cover rounded-lg border border-gray-300 bg-transparent mr-3"
                />
                <div>
                  <button
                    className="flex justify-center items-center text-sm w-7 h-7 rounded-md font-bold border text-center p-2 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                    onClick={() => {
                      setImagePreview(null);
                      console.log("imagePreview", imagePreview);
                      setArticleData({ ...articleData, thumbnail: null });
                    }}
                    type="button"
                  >
                    X
                  </button>
                </div>
              </div>
            )}

            {!imagePreview && (
              <div
                className="transition border border-gray-300 border-solid cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500"
                {...getRootProps()}
              >
                <div
                  className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${
                    isDragActive
                      ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                      : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="dz-message flex flex-col items-center m-0!">
                    <div className="mb-[22px] flex justify-center">
                      <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                        {/* SVG upload icon */}
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
            <Label>Article Title</Label>
            <Input
              type="text"
              placeholder="Masukkan judul artikel"
              value={articleData.judul}
              onChange={handleTitleChange}
            />
          </div>

          <div>
            <Label>Content</Label>
            <TextArea
              value={articleData.content}
              onChange={(val: string) => setArticleData({ ...articleData, content: val })}
              rows={10}
              placeholder="Masukkan konten artikel"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
            >
              Update Article
            </button>
          </div>
        </div>
      </ComponentCard>
    </form>
  );
}
