"use client";
import React, { useState, FC, ReactNode, FormEvent } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Select from '../form/Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon, TimeIcon } from '../../icons';
import DatePicker from '@/components/form/date-picker';

export default function ScheduleInput() {
    
  const [showPassword, setShowPassword] = useState(false);
  const studio = [
    { value: "admin", label: "Admin" },
    { value: "customer", label: "Customer" },
  ];

  const time_slot = [
    { value: "08.00 - 08.50", label: "08.00 - 08.50"},
    { value: "09.00 - 09.50", label: "09.00 - 09.50"},
    { value: "10.00 - 10.50", label: "10.00 - 10.50"},
    { value: "11.00 - 11.50", label: "11.00 - 11.50"},
    { value: "11.00 - 11.50", label: "11.00 - 11.50"},
  ]
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <form>
        <ComponentCard title="New Schedule Form" href="/schedule">
            <div className="space-y-6">
                <div>
                    <Label>Studio</Label>
                    <div className="relative">
                        <Select
                            options={studio}
                            placeholder="Select the studio"
                            onChange={handleSelectChange}
                            className="dark:bg-dark-900"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon/>
                        </span>
                    </div>
                </div>
                <div>
                    <DatePicker
                        id="date-picker"
                        label="Date Picker Input"
                        placeholder="Select a date"
                        onChange={(dates, currentDateString) => {
                        // Handle your logic
                        console.log({ dates, currentDateString });
                        }}
                    />
                </div>

                <div>
                    <Label htmlFor="tm">Time Picker Input</Label>
                    <div className="relative">
                        <Select
                            options={time_slot}
                            placeholder="Select the time"
                            onChange={handleSelectChange}
                            className="dark:bg-dark-900"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <TimeIcon />
                        </span>
                    </div>
                </div>

                <div>
                    <button 
                        type="submit"
                        className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                    >
                        Create a new Schedule
                    </button>
                </div>
            </div>
        </ComponentCard>
    </form>
  );
}
