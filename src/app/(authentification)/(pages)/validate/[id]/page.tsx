'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const ValidateAcount = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const id = params.id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3002/api/v1/auth/validate/${id}`);
            if (!response.ok) {
                const data = await response.json();
                setError(false);
                setErrorMessage(data.message);
            } else {

                const data = await response.json();
                if (!data.success) {
                    console.log("🚀 ~ fetchData ~ false data:", data)
                    
                    setError(true);
                    setErrorMessage(data.message);
                } 
            }

            
        } catch (error) {
            setError(true);
            setErrorMessage('Échec de la validation du compte');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const validateAccount = () => {
            if (id) {
                fetchData();
            } else {
                console.log('here');
                
                setError(true);
                setErrorMessage('ID de compte manquant dans les paramètres d\'URL');
                setLoading(false);
            }
        };

        validateAccount();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {loading && 
                <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#efa34a] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                    Validation du compte en cours...
                </div>
            }

            {!loading && 
                <>
                    {error && 
                        <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#88221d] p-3 hover:bg-[#e03848] hover:border-l-[#87231c] hover:text-white hover:font-semibold">
                            Erreur : {errorMessage}
                        </div>
                    }

                    {!error && 
                        <div className="mb-4 bg-[#f8f3ed] border-l-8 border-l-[#efa34a] p-3 hover:bg-[#e6e1da] hover:border-l-[#efa34a]">
                            {errorMessage}
                        </div>
                    }

                    <div className='flex flex-col gap-6'>
                        <div>
                            <Link 
                                href="/register"
                                className="bg-[#f8f3ed] border-l-8 border-l-[#8a8659] ml-5 py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300"
                            >
                                Register
                            </Link>
                        </div>

                        <div>
                            <Link 
                                href="/login"
                                className="bg-[#f8f3ed] border-l-8 border-l-[#8a8659] ml-5 py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300"
                            >
                                Login
                            </Link>
                        </div>

                        <div>
                            <Link 
                                href="/"
                                className="bg-[#f8f3ed] border-l-8 border-l-[#8a8659] ml-5 py-2 px-4 hover:bg-[#173e5d] hover:border-l-[#efa34a] hover:text-white transition-colors duration-300"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
        
                </>
            }
        </div>
    );
};

export default ValidateAcount;

