//inisialisai firebase
import { initializeApp } from 'firebase/app';
//Firestore adalah layanan basis data cloud NoSQL yang ditawarkan oleh Firebase, yang memungkinkan Anda menyimpan dan menyinkronkan data aplikasi Anda secara real-time
//disini kita ingin dapatin instance firestore di firebse
import { getFirestore } from 'firebase/firestore';

//config
const firebaseConfig = {
  apiKey: 'AIzaSyCXfwbQq4D4-livKk87bDVeq2BHkXM5yMI',
  authDomain: 'dice-notepad.firebaseapp.com',
  projectId: 'dice-notepad',
  storageBucket: 'dice-notepad.appspot.com',
  messagingSenderId: '372375000518',
  appId: '1:372375000518:web:a94100e5c8c875e50c4ec7',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//kita export database, biar bisa dipake di file lain dalma kasus ini file note
export {db}