"use client";
import React, { useState, FC, ReactNode, FormEvent } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';
// import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '../../icons';

export default function PricelistInput() {
    
  const [message, setMessage] = useState("");

  return (
    <form>
        <ComponentCard title="New Pricelist Form" href="/pricelist">
            <div className="space-y-6">
                <div>
                    <Label>Service Name</Label>
                    <Input type="text" placeholder="Masukan nama layanan" />
                </div>
                <div>
                    <Label htmlFor="tm">Service Price</Label>
                    <div className="relative">
                        <Input
                        type="number"
                        placeholder="Masukan harga layanan"
                        className="pl-[62px]"
                        />
                        <span className="absolute left-0 top-1/2 flex h-11 w-[46px] text-sm -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
                            IDR
                        </span>
                    </div>
                </div>
                <div>
                    <Label>Service Description</Label>
                    <TextArea
                        value={message}
                        onChange={(value) => setMessage(value)}
                        rows={6}
                        placeholder="Masukan deskripsi layanan"
                    />
                </div>


                <div>
                    <button 
                        type="submit"
                        className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                    >
                        Submit a New User
                    </button>
                </div>
            </div>
        </ComponentCard>
    </form>
  );
}
