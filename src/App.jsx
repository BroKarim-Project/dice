/*
MASALAH SAAT INI 
- State tidak tersimpan sehingga modal abes kebuka langsung ketutup
  bisa jadi karena 
  > salah dalam menanggani event, misal ada yang memicu clodeModal aktif 
  > atau ada yang membaut isOpenModal berubah tanpa sengaja


*/

import React, { useState, useEffect } from 'react';
import Title from './components/title';
import AddTodo from './components/addToDo';
import Note from './components/note';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import SideNav from './components/sideNav';
import HeaderNav from './components/headerNav';

function App() {
  const [notes, setNotes] = React.useState([]);
  // const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  const openModal = () => {
    console.log('Opening Modal');
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    // setSelectedColor(null);
  };
  console.log('isModalOpen:', isModalOpen);

  //meastikan bahwa state note selalu up todate dengan data di firestrore secara real-time
  React.useEffect(() => {
    //membaut query ke koleksi todos, sehingga bisa diubah2, ini juga
    const q = query(collection(db, 'todos'));
    //onSnapShot ini membuat apk kita otomatis bereaksi terhadip perubaha di firestore
    //sehingga setiap perubah di koloksi todos akan langsung tercermin di UI kita
    const unsub = onSnapshot(q, (querySnapshot) => {
      //buat array kosong untuk nyimpan data notes
      let notesArray = [];
      //menambahkan ssetiap data ke notesArray
      querySnapshot.forEach((doc) => {
        notesArray.push({ ...doc.data(), id: doc.id });
      });
      //perbarui state note dengan array terbaru
      setNotes(notesArray);
    });
    return () => unsub();
  }, []);

  // const handleEdit = async (note, title) => {
  //   try {
  //     if (!note.id) throw new Error('Invalid note ID');
  //     await updateDoc(doc(db, 'todos', note.id), { title, content });
  //   } catch (error) {
  //     console.error('Error updating note title: ', error);
  //   }
  // };
  const handleEdit = async (note, newTitle, newContent) => {
    try {
      if (!note.id) throw new Error('Invalid note ID');

      // Update data di Firestore dengan nama properti yang sesuai
      await updateDoc(doc(db, 'todos', note.id), {
        title: newTitle,
        content: newContent,
      });
    } catch (error) {
      console.error('Error updating note: ', error);
    }
  };
  const toggleComplete = async (note) => {
    await updateDoc(doc(db, 'todos', note.id), { completed: !note.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };
  return (
    <>
      <main className="flex ">
        <div className="flex">
          <SideNav setSelectedColor={setSelectedColor} openModal={openModal} />
        </div>
        <div className="relative">
          {/* <Title /> */}
          {/* <AddTodo onClose={closeModal} /> */}
          {isModalOpen && <AddTodo selectedColor={selectedColor} onClose={closeModal} />}
        </div>

        <div className="flex-1 ">
          <HeaderNav />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {notes.map((note) => (
              <Note key={note.id} note={note} selectedColor={selectedColor} toggleComplete={toggleComplete} handleDelete={handleDelete} handleEdit={handleEdit} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
