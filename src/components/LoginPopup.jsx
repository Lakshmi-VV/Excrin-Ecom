import React, { useState } from 'react';
import { useSignIn } from 'react-auth-kit';

const LoginPopup = ({ onClose, onLoginSuccess , onLoginFail }) => {
    const [emailOrName, setEmailOrName] = useState('');
    const[password, setPassword] = useState('');
    const signIn = useSignIn();

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();
        // console.log(users);
        const user = users.find(u => (u.email === emailOrName || u.username === emailOrName )&& u.password === password);
 
    const generateToken = (email, username) => {
            const timestamp = new Date().getTime();
            console.log(timestamp);
            return `${btoa(email)}-${btoa(username)}-${timestamp}`;
        };

        if (user) {
            const token = generateToken(user.email, user.username);
            console.log(token)
            signIn({
                token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { email: user.email, username: user.username , password: user.password }
            });
            onLoginSuccess();
            onClose();
        } else {
            onLoginFail();
        }
    };

    

    return (
        <>

        <div className="popup bg-gray-300 w-1/4">
            <div className="popup-inner">
                <div className='font-bold text-xl text-center mb-6'>Login !!</div>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold '>Email / Username : </label>
                        <input className='border w-full p-2' type="text" value={emailOrName} onChange={(e) => setEmailOrName(e.target.value)} required
                         placeholder=' Enter your mail or name'/>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold'>Password : </label>
                        <input className='border w-full p-2' type="text" value={password} onChange={(e) => setPassword(e.target.value)} required
                        placeholder=' Enter password' />
                    </div>
                    <div className='flex justify-between mt-6'>
                   
                    <button className='border border-red-300 py-1 px-2' onClick={onClose}>Close</button>
                    <button className='border border-green-300 flex  py-1 px-2' type="submit ">Login</button>
                    </div>
                </form>
                
            </div>
        </div>
        </>
    );
};

export default LoginPopup;
