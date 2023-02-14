import React, { useState } from 'react'
import './indexes.css'
import { auth, storage, db } from '../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';
const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const Navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const file = e.target[0].files[0];
        const displayName = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;
        setLoading(true);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })
                        // adding new data to db
                        await setDoc(doc(db, "Users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL

                        });
                        // adding chat data
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        Navigate('/')
                    });
                }
            )


        } catch (error) {
            console.log('error', error)
            setError(true)
            setLoading(false);

        }


    }

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
                <input type="password" placeholder="Password" id="password" />
                <br />
                {
                    error ? <p>User already exist</p> : null
                }



                <button >
                    {loading ? "Loading..." : "Register me"}
                </button>


                <div class="social">
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>Do you have an account? <Link style={{ color: 'white', fontWeight: 'bold' }} to={'/login'}>login..</Link> </p>
                </div>
            </form>
        </>
    )
}


export default Register
