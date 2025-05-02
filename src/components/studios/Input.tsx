"use client";
import React, { useState, FC, ReactNode, FormEvent } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';

export default function StudioInput() {
    const [message, setMessage] = useState("");

    return (
        <form>
            <ComponentCard title="New Studio Form" href="/studios">
                <div className="space-y-6">
                    <div>
                        <div>
                            <Label>Studio Name</Label>
                            <Input type="text" placeholder="Masukan nama studio" />
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div>
                                <Label>Latitude</Label>
                                <Input type="text" placeholder="Masukan koordinat garis lintang" />
                            </div>
                            <div>
                                <Label>Longitude</Label>
                                <Input type="text" placeholder="Masukan koordinat garis bujur" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label>Event Description</Label>
                        <TextArea
                            value={message}
                            onChange={(value) => setMessage(value)}
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
