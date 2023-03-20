import React, { useState } from 'react'
import './indexes.css'
import { auth, storage, db } from '../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';
import imageCompression from 'browser-image-compression';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const Navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const file = e.target[0].files[0];
  const displayName = e.target[1].value;
  const email = e.target[2].value;
  const password = e.target[3].value;
  setLoading(true);

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);

    // compress the image before uploading
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.3, // maximum allowed size in MB
      maxWidthOrHeight: 500, // maximum allowed width or height
    });

    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, compressedFile);
    uploadTask.on(
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          // adding new data to db
          await setDoc(doc(db, 'Users', res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          // adding chat data
          await setDoc(doc(db, 'userChats', res.user.uid), {});
          Navigate('/');
        });
      }
    );
  } catch (error) {
    console.log('error', error);
    setError(true);
    setLoading(false);
  }
};

    return (
        <>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>
                <Stack direction={'column'} alignItems={'center'}>
                    <div className="wrapper">
                        <input className='myFile' style={{ position: 'absolute' }} type="file" placeholder="file" id="file" required />

                    </div>
                    <span style={{ fontSize: '14px' }}>*upload an avatar*</span>

                </Stack>
                <input type="text" placeholder="UserName" id="name" autoComplete='off' required />
                <input type="text" placeholder="Email " id="username" autoComplete='off' required />
                <input type="password" maxLength={6} placeholder="enter 6 digits Password" id="password" />
                <br />


                <button >
                    {loading ? "Loading..." : "Register me"}
                </button>


                <div class="social">
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>Do you have an account? <Link style={{ color: 'white', fontWeight: 'bold' }} to={'/login'}>login..</Link> </p>
                </div>
                {
                    error && <p style={{textAlign:'center'}}>Something went wrong!</p>
                }

            </form>


        </>
    )
}


export default Register