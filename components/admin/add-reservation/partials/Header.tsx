"use client";

import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

export default function Header() {

    const [quantity, setQuantity] = useState(1);
    return (
        <section className="animate-card bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-900">
                Regular Reservations With Reservation
            </h1>
            <p className="text-gray-600 mt-1">1 hour 30 minutes</p>

            <button className="mt-4 px-4 py-2 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                Recurring Appointment
            </button>

            <div className="mt-8 flex items-center gap-6">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-pink-200 rounded-md">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-pink-400 hover:bg-pink-50">
                        <Minus size={18} />
                    </button>
                    <span className="px-4 font-semibold w-10 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-pink-400 hover:bg-pink-50">
                        <Plus size={18} />
                    </button>
                </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">Time Zone: Eastern Time (GMT-04:00)</p>
        </section>
    )
}
