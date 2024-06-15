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
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const [content, setContent] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

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
      <div className="mt-4 rounded-[1rem] min-h-[200px] shadow-md  flex flex-col justify-between px-2 py-2" style={{ backgroundColor: note.color }}>
        {/* content */}
        <div className="flex items-start flex-col h-full gap-2 mb-2">
          <input style={{ textDecoration: note.completed && 'line-through' }} type="text" value={newTitle !== '' ? newTitle : note.title} onChange={handleChange} className="text-2xl  bg-transparent  font-semibold" />
          <textarea
            value={newContent}
            className="text-lg flex-1 text-start  w-full pr-2 border-none outline-none  resize-none bg-transparent focus:ring-0"
            style={{ overflow: isClicked ? 'auto' : 'hidden' }}
            onClick={() => setIsClicked(true)}
            onMouseLeave={() => setIsClicked(false)}
          />
        </div>

        <div className="flex items-center gap-2 ">
          <button className=" p-2 rounded-full bg-black" onClick={() => setShowTools(!showTools)}>
            <Pencil size={15} color="#fff" />
          </button>
          {showTools && (
            <ul className="  flex justify-end w-full items-center   ">
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
