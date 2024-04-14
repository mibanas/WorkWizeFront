export interface Recruiter {
    _id: string;
    userId: string;
    fullName: string;
    position: string;
    phone: string;
    email: string;
    responsibility: string;
    jobOfferPublished: boolean;
    __v: number;
}

export interface Status {
    _id: string;
    name: string;
    date: string;
    __v: number;
}

export interface Company {
    _id: string;
    companyName: string;
    city: string;
    email: string;
    phone: string;
    website: string;
    isDeleted: boolean;
    __v: number;
}

export interface JobOffer {
    _id: string;
    userId: string;
    title: string;
    description: string;
    link: string;
    publicationDate: string;
    updatedAt: string;
    createdAt : string;
    recruiters: Recruiter[];
    source: string;
    isDeleted: boolean;
    status: Status;
    __v: number;
    company: Company;
}

export interface JobOffersResponse {
    count : number | undefined
    success: boolean;
    data: JobOffer[];
}
