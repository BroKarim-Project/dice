import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { X } from 'lucide-react';

export default function AddTodo({ onClose, selectedColor, }) {
  const colorOptions = [
    {
      id: 1,
      label: 'yellow',
      value: '#FFC976',
    },
    {
      id: 2,
      label: 'orange',
      value: '#FE9C75',
    },
    {
      id: 3,
      label: 'purple',
      value: '#B693F8',
    },
    {
      id: 4,
      label: 'blue',
      value: '#03C2E6',
    },
    {
      id: 5,
      label: 'green',
      value: '#C0CA7B',
    },
  ];
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  // console.log('selectedColor in NoteModal:', selectedColor);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== '' && content !== '') {
      await addDoc(collection(db, 'todos'), {
        title,
        content,
        color: selectedColor,
        completed: false,
      });
      setTitle('');
      setContent('');
    }
  };
  const closeModal = () => {
    onClose();
  };

  return (
    <div className="flex fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-y-auto overflow-x-hidden max-w-[500px]   justify-center items-center" style={{ backgroundColor: selectedColor }} id="noteModal">
      <div className="relative p-4 w-full max-w-2xl">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Create Note</h3>
          <button onClick={closeModal}>
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900">
            Title
          </label>
          <input type="text" placeholder="Enter todo..." value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900">
            NOte
          </label>
          <input type="text" placeholder="Enter todo..." value={content} onChange={(e) => setContent(e.target.value)} />
          <div className='flex justify-center items-center'>
            <button href="#_" type='submit' class="group relative inline-block overflow-hidden rounded bg-purple-50 px-5 py-2.5 font-medium text-purple-600">
              <span class="absolute left-0 top-0 mb-0 flex h-0 w-full translate-y-0 transform bg-purple-600 opacity-90 transition-all duration-200 ease-out group-hover:h-full"></span>
              <span class="relative group-hover:text-white">Button Text</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
