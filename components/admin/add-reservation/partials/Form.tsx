import { X } from 'lucide-react'
import React from 'react'

export default function Form() {
    return (
        <aside className="animate-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
            <div className="mb-6">
                <h2 className="text-lg font-medium">Regular Reservations</h2>
                <p className="text-sm text-gray-500">1 hour 30 minutes</p>
            </div>

            <div className="bg-pink-50 border border-pink-100 p-4 rounded-lg relative mb-6">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"><X size={16} /></button>
                <p className="text-xs font-medium text-gray-700">Apr 26, Sunday - 10:00 - 10:30 AM</p>
                <p className="text-sm mt-1">2 Seat Selected</p>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="text-sm text-gray-600 block mb-1">Name (required)</label>
                    <input type="text" className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-1 focus:ring-pink-300" placeholder="Name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600 block mb-1">Email (required)</label>
                        <input type="email" className="w-full border border-gray-200 p-3 rounded focus:outline-none" placeholder="Email" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 block mb-1">Phone</label>
                        <input type="tel" className="w-full border border-gray-200 p-3 rounded focus:outline-none" placeholder="Phone" />
                    </div>
                </div>
                <div>
                    <label className="text-sm text-gray-600 block mb-1">Number of Guests</label>
                    <select className="w-full border border-gray-200 p-3 rounded focus:outline-none bg-white">
                        <option>8 Person</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm text-gray-600 block mb-1">Message (Optional)</label>
                    <textarea className="w-full border border-gray-200 p-3 rounded focus:outline-none h-32" placeholder="Tell us What kind of event..."></textarea>
                </div>

                <label className="flex items-start gap-2 cursor-pointer mt-4">
                    <input type="checkbox" className="mt-1 accent-black" />
                    <span className="text-xs text-gray-600 leading-tight">
                        By checking, you accept <span className="underline">Terms of Service</span> & <span className="underline">Privacy Policy</span>
                    </span>
                </label>

                <button type="submit" className="w-full bg-black text-white py-4 mt-6 uppercase tracking-widest font-medium hover:bg-gray-800 transition-colors">
                    Submit
                </button>
            </form>
        </aside>
    )
}
