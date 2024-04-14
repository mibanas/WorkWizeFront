'use client'

import { FormEvent, useState } from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';

// icons 
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";


const FormRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  
        async function onSubmit(event: FormEvent<HTMLFormElement>) {
            event.preventDefault()
        
            const target = event.target as HTMLFormElement
        
            const firstName = (target.elements.namedItem('firstname') as HTMLInputElement)?.value.trim()
            const lastName = (target.elements.namedItem('lastname') as HTMLInputElement)?.value.trim()
            const email = (target.elements.namedItem('email') as HTMLInputElement)?.value.trim()
            const password = (target.elements.namedItem('password') as HTMLInputElement)?.value
            const confirmPassword = (target.elements.namedItem('passwordconfirm') as HTMLInputElement)?.value
        
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                setError('Merci de remplir tous les champs')
                return;
            }
        
            if (password !== confirmPassword) {
                setError('Les mots de passe ne correspondent pas')
                return;
            }
        
            const data = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }
        
            try {
                const response = await fetch('http://localhost:3002/api/v1/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
        
                if (!response.ok) {
                    let errorMessage = 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer plus tard.';
                    const responseData = await response.json();
        
                    if (response.status === 409) {
                        errorMessage = 'Un compte avec cet email existe déjà.';
                        toast.error(errorMessage);

                    } else if (response.status === 400) {                        
                        errorMessage = responseData.error;
                        toast.error(errorMessage);
                    }
        
                    setError(errorMessage);
                    return
                }
                const responseData = await response.json()
                toast.success(responseData.message)            
                target.reset()
                router.push('/login')
        
            } catch (error: any) {        
                console.log(error.message);
                setError(error.message);
            }
        }
    


    
    return (
        <div className="h-screen">
            <div className="flex flex-col p-32">
                <div>
                    <Toaster />
                    {/* Votre contenu */}
                </div>
                <h1 className="text-2xl font-bold mb-4 pr-8">Inscription </h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#173e5d] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                        <label htmlFor="firstname" className="block text-sm mb-5 font-bold w-full text-[#173e5d] ">
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            autoComplete="off"
                            placeholder="Prénom"
                            required
                            className="w-full focus:ring-transparent focus:outline-none border-none bg-transparent"
                        />
                    </div>

                    <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#173e5d] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                        <label htmlFor="lastname" className="block text-sm mb-5 font-bold w-full text-[#173e5d]">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            autoComplete="off"
                            placeholder="Nom"
                            required
                            className="w-full  focus:ring-transparent focus:outline-none border-none bg-transparent"
                        />
                    </div>
                    <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#173e5d] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                        <label htmlFor="email" className="block text-sm mb-5 font-bold w-full text-[#173e5d]">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Adresse email"
                            required
                            className="w-full appearance-none focus:ring-transparent focus:outline-none border-none bg-transparent"
                        />
                    </div>
                    <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#173e5d] p-3 relative hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                        <label htmlFor="password" className="block text-sm mb-5 font-bold w-full text-[#173e5d]">
                            Mot de passe
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
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
                    <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#173e5d] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                        <label htmlFor="passwordconfirm" className="block text-sm mb-5 font-bold w-full text-[#173e5d]">
                            Vérification du mot de passe
                        </label>
                        <input
                            type="password"
                            id="passwordconfirm"
                            name="passwordconfirm"
                            autoComplete="off"
                            placeholder="Vérification du mot de passe"
                            required
                            className="w-full focus:ring-transparent focus:outline-none border-none bg-transparent"
                        />
                    </div>
                    {error && <div className="mb-4 bg-[#5c0810] text-white border-l-8 border-l-[#87231c] p-3 relative hover:bg-[#87231c] hover:border-l-[#5c0810]">{error}</div>}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-[#f8f3ed] border-l-8 border-l-[#173e5d] py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300"
                        >
                            S'inscrire
                        </button>
 

                        <Link 
                        href="/login"
                        className="bg-[#f8f3ed] border-l-8 border-l-[#173e5d] ml-5 py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300"
                        >
                            Déjà inscrit ?
                        </Link>

                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default FormRegister;
