//ini cuman card aja, ntra bakal ditampilin di app.js
//itulah kenapa di app.js kita bakal fetch data
//masalah saat ini kita tak bisa ubah dari tampilan tapi maih bisa ubah dari database

import React, { useState } from 'react';
import { CircleCheck, PencilLine, Trash2, Pencil } from 'lucide-react';

export default function Note({ note, toggleComplete, handleDelete, handleEdit, onClose, selectedColor }) {
  // const defaultSelection = selectedColor || notes.find((note) => note.id === editingNoteId)?.color || '';
  const [radioColor, setRadioColor] = useState(null);
  const [newTitle, setNewTitle] = React.useState(note.title);
  const [newContent, setNewContent] = useState(note.content);
  const [showTools, setShowTools] = useState(false);

  const [content, setContent] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const tools = [
    {
      icon: <CircleCheck id="i" color="#000" />,
      onClick: () => toggleComplete(note),
      className: 'button-complete',
    },
    {
      icon: <PencilLine id="i" color="#000" />,
      onClick: () => handleEdit(note, newTitle, newContent),
      className: 'button-edit',
    },
    {
      icon: <Trash2 id="i" color="#000" />,
      onClick: () => handleDelete(note.id),
      className: 'button-delete',
    },
  ];

  //edit mode jadi kita g pake punay sebeleh
  const handleChange = async (e) => {
    e.preventDefault();
    const updatedTitle = e.target.value;
    if (note.complete === true) {
      setNewTitle(note.title);
    } else {
      setNewTitle(updatedTitle);
      await handleEdit(note.id, updatedTitle); // Panggil fungsi untuk memperbarui Firestore
    }
  };

  return (
    <>
      <div className="mt-4 rounded-[1rem]  bg-white flex flex-col px-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2">
        {/* content */}
        <div  className="flex items-start flex-col gap-2 mb-2">
          <input style={{ textDecoration: note.completed && 'line-through' }} type="text" value={newTitle !== '' ? newTitle : note.title} onChange={handleChange} className="text-2xl bg-red-300 font-semibold" />
          <input value={newContent} className="text-lg" />
        </div>

        <div className="flex items-center gap-2 ">
          <button className=" p-2 rounded-full bg-black" onClick={() => setShowTools(!showTools)}>
            <Pencil size={15} color="#fff" />
          </button>
          {showTools && (
            <ul className=" border-t flex justify-end w-full items-center  border-gray-100 ">
              {tools.map((tool, index) => (
                <li key={index}>
                  <button className={tool.className} onClick={tool.onClick}>
                    {tool.icon}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
