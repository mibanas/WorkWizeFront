'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { FaPencil } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FaUser, FaEnvelope, FaPhoneAlt, FaBriefcase } from 'react-icons/fa';
import Link from "next/link";
import { deleteJobOffer } from "@/api/offre/offreApi";
import { useSelector } from "react-redux"
import { RootState } from "@/GlobalRedux/Store/store"


const getNextStatus = (currentStatus: string): string | null => {
    const statusMap: { [key: string]: string } = {
        'Préparation': 'Candidature soumise',
        'Candidature soumise': 'Relance en attente',
        'Relance en attente': 'Relance après soumission',
        'Relance après soumission': 'Entretien(s)',
        'Entretien(s)': 'Remerciement après entretien',
        'Remerciement après entretien': 'En attente de décision',
        'En attente de décision': 'Résultat final'
    };

    return statusMap[currentStatus] || null;
};

const JobOfferPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const toast = useToast();
    
    const jobOfferId  = params.id;

    // Assuming you have a way to fetch job offer data based on ID
    const [jobOfferData, setJobOfferData] = useState<any>(null);
    const [date, setDate] = useState(new Date());
    const { error } = useSelector((state: RootState) => state.offre);

    const handleDelete = async () => {
        try {
        await deleteJobOffer(jobOfferData._id);
        router.push("/dashboard/offres");
        } catch (error) {
            console.error("Failed to delete job offer", error);
            toast({
                title: "Error",
                description: "An error occurred while creating the job offer.",
                duration: 5000,
            });
        }
    };

    const handleSubmit = async (e : any) => {        
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:3002/api/v1/offre/status/${jobOfferData.status._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ date })
            });
            if (response.ok) {
                router.push(`/dashboard/offres/`)
            } else {
                console.error('Failed to update date');
            }
        } catch (error) {
            console.error('Failed to update date', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken') || null
        const fetchJobOffer = async () => {
            
        const response = await fetch(`http://localhost:3002/api/v1/offre/${jobOfferId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        if (response.ok) {
            const data = await response.json();
            setJobOfferData(data.data);
        }
        };
        if (!token || error) {            
            router.push('/login');
        } else { 
            if (jobOfferId) {
                fetchJobOffer();
            }
        }
    }, [jobOfferId]);

  if (!jobOfferData) {
    return (
        <div className="flex flex-col items-center justify-center space-y-3 h-screen">
        <Skeleton className="h-[250px] w-[250px] p-5 rounded-xl" />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

  return (
    
    <div className="container mx-auto px-4 py-8">
        <Card >
        <CardHeader>
            <CardTitle>{jobOfferData.title}</CardTitle>
            <CardDescription>{jobOfferData.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="my-4 ">
                <p className="text-sm font-bold leading-none">Source de l'offre:</p>
                <p className="text-sm text-muted-foreground">{jobOfferData.source}</p>

                <div className="flex items-center space-x-2">
                    <Link href={jobOfferData.link} target="_blank" rel="noopener noreferrer">
                        {jobOfferData.link}
                    </Link>
                    <p className="text-sm text-muted-foreground">Publié le: {new Date(jobOfferData.publicationDate).toLocaleDateString()}</p>
                </div>

            </div>
            {jobOfferData.company && (
                <div className="mb-4">
                    <p className="text-sm font-bold leading-none mb-3">Informations sur l'entreprise:</p>
                    <p className="text-sm text-muted-foreground ml-3">Nom de l'entreprise: {jobOfferData.company.companyName}</p>
                    <p className="text-sm text-muted-foreground ml-3">Ville: {jobOfferData.company.city}</p>
                    <p className="text-sm text-muted-foreground ml-3">Email: {jobOfferData.company.email}</p>
                    <p className="text-sm text-muted-foreground ml-3">Téléphone: {jobOfferData.company.phone}</p>
                    <p className="text-sm text-muted-foreground ml-3">Site web: {jobOfferData.company.website}</p>
                </div>
            )}

           <div>
                <p className="text-sm font-bold leading-none mb-2">Etat d'avancement </p>
                <p className="text-sm text-muted-foreground ml-3"><span className="font-bold">Status </span>: {jobOfferData.status.name}</p>
                <p className="text-sm text-muted-foreground ml-3"><span className="font-bold">Deadline </span> {jobOfferData.status.date.split('T')[0]}</p>
           
                {jobOfferData.status.name !== 'Résultat final' && (
                    <div>
                        <p className="text-sm font-bold leading-none mt-6">Passer à l'étape suivante :</p>
                        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
                            <div className="grid gap-3 w-12">
                                <Label htmlFor="publicationDate">Sélectionner la date limite :</Label>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border w-auto pl-3 text-left font-normal"
                                />
                            </div>
                            <Button type="submit" className="w-[300px]">
                                {getNextStatus(jobOfferData.status.name)}
                            </Button>
                        </form>
                    </div>
                )}
            </div>
            <CardContent className="grid gap-4">
                {/* Other contents */}
                <div className="mb-4">
                    <p className="text-sm font-bold leading-none mb-2">Recruteur(s):</p>
                    {jobOfferData.recruiters.map((recruiter, index) => (
                    <div key={index} className="flex  space-x-2">
                        <div className="flex items-center space-x-1 ml-2">
                            <FaUser className="h-4 w-4 text-black" />
                            <p className="text-sm text-muted-foreground">{recruiter.fullName}</p>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                            <FaEnvelope className="h-4 w-4 text-black" />
                            {recruiter.email && <p className="text-sm text-muted-foreground">Email: {recruiter.email}</p>}
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                            <FaPhoneAlt className="h-4 w-4 text-black" />
                            {recruiter.phone && <p className="text-sm text-muted-foreground">Téléphone: {recruiter.phone}</p>}
                        </div>
                            <div className="flex items-center space-x-1 ml-2">
                            <FaBriefcase className="h-4 w-4 text-black" />
                            <p className="text-sm text-muted-foreground ml-2">Poste: {recruiter.responsibility}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </CardContent>

        </CardContent>


        <CardFooter className="flex justify-end ">
            <Button  className="w-full mx-2" onClick={handleDelete}>
                <FaPencil className="mr-2 h-4 w-4" /> Supprimer
            </Button>
        </CardFooter>
        </Card>


        <Toaster />
    </div>
  );
};

export default JobOfferPage;
