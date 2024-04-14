'use client'

import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        // Exemple de notification
        toast.success('Message envoyé avec succès !');
    };

    return (
        <main className="overflow-x-hidden pt-24 lg:pt-28 antialiased bg-[#f8f3ed]">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-[#2b405c] mt-8 mb-4">Contactez-nous</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="mb-4 bg-[#ebddcc] border-l-8 border-l-[#173e5d] p-3 hover:bg-[#e6e1da] hover:text-[#87231c] hover:border-l-[#efa34a]">

                    <label htmlFor="name" className="block text-sm mb-5 font-bold w-full text-[#173e5d] ">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full focus:ring-transparent focus:outline-none border-none bg-transparent "
                        required
                    />
                  </div>
                  <div className="mb-4 bg-[#ebddcc] border-l-8 border-l-[#173e5d] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">

                  <label htmlFor="email" className="block text-sm mb-5 font-bold w-full text-[#173e5d] ">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full focus:ring-transparent focus:outline-none border-none bg-transparent"
                        required
                    />
                  </div>

                  <div className="mb-4 bg-[#ebddcc] border-l-8 border-l-[#173e5d] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">

                    <label htmlFor="firstname" className="block text-sm mb-5 font-bold h-auto w-full text-[#173e5d] ">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full h-64 focus:ring-transparent focus:outline-none border-none bg-transparent"
                        required
                    ></textarea>

                  </div>
                    <button
                        type="submit"
                        className="bg-[#173e5d] border-l-8 text-white font-bold border-l-[#efa34a] py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300"
                        >
                        Envoyer
                    </button>

          
                </form>
            </div>
        </main>
    );
};

export default Contact;
