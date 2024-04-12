'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '@/interfaces/auth/authentification';

import {loginUser} from '@/GlobalRedux/Features/auth/Slice/authSlice'

// icons 
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { AppDispatch } from '@/GlobalRedux/Store/store'
import { RootState } from '@/GlobalRedux/Store/store';

const FormLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    const loading = useSelector((state:  RootState ) => state.authentification.loading);
    const loginError = useSelector((state: RootState ) => state.authentification.errors?.message);

    console.log('loginError : ',loginError);
    
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (loginError) {
            toast.error(loginError); // Utilisation de react-hot-toast pour afficher les erreurs
        }
        return
    }, [loginError]);


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const target = event.target as HTMLFormElement;
    
        const email = (target.elements.namedItem('email') as HTMLInputElement)?.value.trim();
        const password = (target.elements.namedItem('password') as HTMLInputElement)?.value;
    
        if (!email || !password) {
          setError('Merci de remplir tous les champs');
          return;
        }
    
        const data = {
          email: email,
          password: password
        };
                
        try {
          await dispatch(loginUser(data)); // Assuming loginUser dispatches actions
          // Handle successful login (e.g., redirect)
        } catch (error) {
          console.error('Login error:', error);
        }
      }


    return (
        <div className="h-screen">
            <div className="flex flex-col p-32">
                <h1 className="text-2xl font-bold mb-4 pr-8">Connexion</h1>
                <div>
                    <Toaster />
                    {/* Votre contenu */}
                </div>
                <form onSubmit={onSubmit}>
                    <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#173e5d] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                        <label htmlFor="email" className="block text-sm mb-5 font-bold w-full text-[#173e5d] ">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Adresse email"
                            required
                            className="w-full focus:ring-transparent focus:outline-none border-none bg-transparent"

                        />
                    </div>
                    <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#173e5d] p-3 relative hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                        <label htmlFor="password" className="block text-sm mb-5 font-bold w-full text-[#173e5d]">
                            Mot de passe
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            // value={'password123'}
                            id="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Mot de passe"
                            required
                            className="w-full focus:ring-transparent focus:outline-none border-none bg-transparent"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? (
                                <IoEyeOffOutline className="h-5 w-5 text-[#173e5d]" />
                            ) : (
                                <IoEyeOutline className="h-5 w-5 text-[#173e5d]" />
                            )}
                        </button>
                    </div>
                    
                    {loginError && (
                        <div className="mb-4 bg-red-200 text-red-800 p-2">{loginError}</div>
                    )}                    
                    
                    {/* <button
                        type="submit"
                        disabled={!loading}
                        className={`bg-[#f8f3ed] border-l-8 border-l-[#173e5d] py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {!loading ? 'Connexion en cours...' : 'Connexion'}
                    </button> */}

                    <button
                        type="submit"
                        className="bg-[#f8f3ed] border-l-8 border-l-[#173e5d] py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300"
                    >
                        S'inscrire
                    </button>


                    <Link 
                        href="/register"
                        className="bg-[#f8f3ed] border-l-8 border-l-[#173e5d] ml-5 py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300"
                    >
                        Register
                    </Link>


                </form>
            </div>
        </div>
    );
};


export default FormLogin;
