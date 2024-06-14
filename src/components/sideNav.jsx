import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function SideNav({ openModal }) {
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  const colors = [
    {
      name: 'yellow',
      hashcode: '#FFC976',
    },
    {
      name: 'orange',
      hashcode: '#FE9C75',
    },
    {
      name: 'purple',
      hashcode: '#B693F8',
    },
    {
      name: 'blue',
      hashcode: '#03C2E6',
    },
    {
      name: 'green',
      hashcode: '#C0CA7B',
    },
  ];

  const toggleMenu = (e) => {
    setMenuExpanded(!isMenuExpanded);
    e.prevenDefault();
  };

  const handleColorClick = () => {
    // setSelectedColor(color.hashcode);
    // console.log('handleColorClick selectedColor: ', color.name);
    openModal();
  };

  return (
    <>
      <div className="flex h-screen w-16 flex-col border-e bg-white pt-4">
        <div className="inline-flex h-16 w-16 items-center justify-center" style={{ marginBottom: 20 }}>
          <span className="grid h-10 w-10 place-content-center  text-lg font-semibold text-black">Dice</span>
        </div>
        <div className="inline-flex h-16 w-16 items-center justify-center">
          <button href="" className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 bg-black " onClick={toggleMenu}>
            <Plus color="#fff" />
          </button>
        </div>
        <div className={`border-t border-gray-100 transition-all duration-300 ${isMenuExpanded ? 'h-auto' : 'h-0'} overflow-hidden`}>
          <div className="px-2">
            <div className="py-4">
              <ul className="space-y-1 border-t border-gray-100 pt-4">
                {colors.map((color, index) => (
                  <li key={index}>
                    <button className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700" onClick={() => handleColorClick()}>
                      <div
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-600"
                        style={{
                          backgroundColor: color.hashcode,
                          margin: '5px 0',
                        }}
                      />

                      <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">Add a(n) {color.name} note.</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
