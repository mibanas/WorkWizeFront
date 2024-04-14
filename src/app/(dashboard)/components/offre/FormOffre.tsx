'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { createJobOffer, createCompany, createRecruiter } from "@/api/offre/offreApi";
import { useRouter } from 'next/navigation'

const JobOfferForm = () => {
    const router = useRouter()
    const { toast } = useToast()
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [step, setStep] = useState(1); 
    const [offreId, setOffreId] = useState('')

    const [formOffre, setFormOffre] = useState({
        title: "",
        description: "",
        link: "",
        publicationDate: new Date(),
        source: "",
    });

    const [formCompany, setFormCompany] = useState({
        companyName: "",
        city: "",
        email: "",
        phone: "",
        website: "",
    });

    const [idx, setIdx] = useState(0);
    const [recruiters, setRecruiters] = useState([
        {
            fullName: "",
            position: "",
            phone: "",
            email: "",
            responsibility: "",
            jobOfferPublished: false,
        },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (step === 1) {
            setFormOffre((prev) => ({
                ...prev,
                [name]: value,
                publicationDate: date ? date : new Date(),
            }));
        }
        if (step === 2) {
            setFormCompany((prev) => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
        if (step === 1) {
            try {
                const addOffre = await createJobOffer(formOffre);
                if (!addOffre.success) {
                    toast({
                        title: "Error",
                        description: `${addOffre.error}`,
                        duration: 5000,
                    });
                }
                setOffreId(addOffre.data._id);
                setStep(2);
                toast({
                    title: "Success",
                    description: addOffre.message,
                    duration: 5000,
                });
            } catch (error : any) {
                console.error("Error creating job offer:", error);
                toast({
                    title: "Error",
                    description: `An error occurred while creating the job offer. : ${error.message}`,
                    duration: 5000,
                });
            }
        } else if (step === 2) {
            try {
                const addCompany = await createCompany(offreId, formCompany);
                toast({
                    title: "Success",
                    description: addCompany.message,
                    duration: 5000,
                });
                setStep(3);
            } catch (error) {
                console.error("Error creating company:", error);
                toast({
                    title: "Error",
                    description: "An error occurred while creating the company.",
                    duration: 5000,
                });
            }
        } else if (step === 3) {
            try {
                const addRecruiter = await createRecruiter(offreId, recruiters);
                toast({
                    title: "Success",
                    description: addRecruiter.message,
                    duration: 5000,
                });            
                router.push('/dashboard/offres')

            } catch (error) {
                    console.error("Error creating recruiter:", error);
                toast({
                    title: "Error",
                    description: "An error occurred while creating the recruiter.",
                    duration: 5000,
                });
                
            }
        }
        
      };

    const handleAddRecruiter = () => {
        setRecruiters((prev) => [...prev, { fullName: "", position: "", phone: "", email: "", responsibility: "", jobOfferPublished: false }]);
        setIdx(idx + 1);
    };

    const handleChangeRecruiter = (e: any, recruiterIndex: number) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setRecruiters((prev) =>
            prev.map((recruiter, i) =>
                i === recruiterIndex ? { ...recruiter, [name]: newValue } : recruiter
            )
        );
    };

    useEffect(()=> {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
        }
    }, [])

    return (
        <>
            {step === 1 && 
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Titre de l'offre : </Label>
                        <Input
                        id="title"
                        name="title"
                        type="text"
                        // value={formOffre.title}
                        onChange={handleChange}
                        // required
                        />
                    </div>
        
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description : </Label>
                        <Textarea
                        id="description"
                        name="description"
                        // value={formOffre.description}
                        onChange={handleChange}
                        className="min-h-32"
                        />
                    </div>
        
                    <div className="grid gap-2">
                        <Label htmlFor="link">Lien : </Label>
                        <Input
                        id="link"
                        name="link"
                        type="text"
                        // value={formOffre.link}
                        onChange={handleChange}
                        required
                        />
                    </div>
        
                    <div className="grid gap-3 w-12"  >
                        <Label htmlFor="publicationDate">Date de publication : </Label>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border w-auto pl-3 text-left font-normal"
                        />
                    </div>
        
                    <div className="grid gap-2">
                        <Label htmlFor="source">Source : </Label>
                        <Input
                        id="source"
                        name="source"
                        type="text"
                        // value={formOffre.source}
                        onChange={handleChange}
                        required
                        />
                    </div>
        
                    <Button type="submit" className="w-[300px]">
                        Ajouter l'entreprise 
                    </Button>
                  </form>
            }
            {step === 2 &&
                 <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="companyName">Nom de l'entreprise</Label>
                        <Input
                            id="companyName"
                            name="companyName"
                            type="text"
                            // value={formCompany.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                            id="city"
                            name="city"
                            type="text"
                            // value={formCompany.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            // value={formCompany.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            // value={formCompany.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="website">Site Web</Label>
                        <Input
                            id="website"
                            name="website"
                            type="text"
                            // value={formCompany.website}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-[300px]">
                        Ajouter les recruteurs
                    </Button>
                </form>
            }
            {step === 3  && 
                
                recruiters.map((recruiter, index) => (
                    <form key={index} className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="fullName">Nom complet</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={recruiter.fullName}
                                onChange={(e) => handleChangeRecruiter(e, index)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="position">Poste</Label>
                            <Input
                                id="position"
                                name="position"
                                type="text"
                                value={recruiter.position}
                                onChange={(e) => handleChangeRecruiter(e, index)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={recruiter.phone}
                                onChange={(e) => handleChangeRecruiter(e, index)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={recruiter.email}
                                onChange={(e) => handleChangeRecruiter(e, index)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="responsibility">Responsabilité</Label>
                            <Input
                                id="responsibility"
                                name="responsibility"
                                type="text"
                                value={recruiter.responsibility}
                                onChange={(e) => handleChangeRecruiter(e, index)}
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="jobOfferPublished">Cette offre est publié par ce recruteur : </Label>
                            <input
                                id="jobOfferPublished"
                                name="jobOfferPublished"
                                type="checkbox"
                                checked={recruiter.jobOfferPublished}
                                onChange={(e) => handleChangeRecruiter(e, index)}
                            />
                            </div>

         
                        {/* <Button type="button" onClick={handleAddRecruiter}>Ajouter un autre recruteur</Button> */}
                        {idx === index && <Button type="submit">Envoyer les données</Button>}
                    </form>
                ))

            }
          
            <Toaster />
        </>
    );
};

export default JobOfferForm;
