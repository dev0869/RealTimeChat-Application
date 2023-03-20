import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './indexes.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const Navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password)
            Navigate('/')


        } catch (error) {
            setError(true)
            console.log(error)
            setLoading(false);

        }

    }
    return (
        <>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form onSubmit={handleSubmit} className='login'>
                <h3 className='logo'>Dev<span>T</span>alk</h3>
                <br />
                <h3>Login</h3>

                <label htmlFor="username"><span>Email</span></label>
                <input type="text" placeholder="Email" id="username" required />

                <label htmlFor="password"><span>Password</span></label>
                <input type="password" placeholder="Password" id="password" required />

                <button>
                    {loading ? "Loading..." : "Login"}
                </button>
                <div class="social">
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>you don't have any account? <Link style={{ color: 'white', fontWeight: 'bold' }} to={'/register'}>Register..</Link> </p>
                    {error && <p style={{ textAlign: 'center', marginTop: '20px', color: 'red', fontSize: '13px' }} >This Email is not registered!</p>}

                </div>
            </form>
        </>
    )
}

export default Login