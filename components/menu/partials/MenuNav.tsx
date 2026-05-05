"use client"
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { menuItems } from '../config/constant';

const menuItemClasses =
  'flex items-center gap-4 border border-zinc-100 rounded-lg p-2.5 bg-white shadow-sm';


const MenuPage: NextPage = () => {
  // 1. Initialize state. Default to 'All' to show everything.
  const [activeCategory, setActiveCategory] = useState('All');

  const filterOptions = ['All', 'Breakfast Sandwiches', 'Breakfast', 'Brunch (Saturday & Sunday)', 'CRAFFLES'];

  // 2. Filter the data based on state
  const displayedItems = activeCategory === 'All' 
    ? menuItems
    : menuItems.filter(cat => cat.category.includes(activeCategory));

  return (
    <>
      <Head>
        <title>Menu | Casa De Flora Bar</title>
      </Head>

      <div className="min-h-screen  font-display">
        <main className="px-10 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-extralight tracking-widest text-gray">
              OUR <span className="font-extralight italic text-primary">MENU</span>
            </h1>
            
            {/* Filter Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm uppercase tracking-wider">
              {filterOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveCategory(item)}
                  className={`transition-colors duration-200 font-medium ${
                    activeCategory === item 
                    ? 'text-primary border-b border-primary' 
                    : 'text-gray hover:text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Render filtered categories */}
          <div className="max-w-7xl mx-auto">
            {displayedItems.map((category) => (
              <section key={category.category} className="mb-20 animate-fadeIn">
                <h2 className="text-3xl text-center mb-10 text-[#333] tracking-wider uppercase">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, idx) => (
                    <div key={`${category.category}-${idx}`} className={menuItemClasses}>
                      <div className="w-20 h-20 flex-shrink-0 relative bg-zinc-100 rounded">
                        <Image
                          src={item.src}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[13px] font-medium text-[#444] leading-tight">
                          {item.name}
                        </h4>
                        {item?.price && (
                          <p className="font-bold text-[#333] mt-1 text-[13px]">{item?.price}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
      
      {/* Optional: Add basic fade-in animation to tailwind config or global css */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default MenuPage;