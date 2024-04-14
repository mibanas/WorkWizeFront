// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTg3NjhmZTQzMDc2MTEzNWFlOTBiYyIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTI5OTkyMDQsImV4cCI6MTcxMzYwNDAwNH0.0oo7poCByV2YHbXeMeH5dbMWbTAcyEaj5R-L6FuGmXg'
export const getAllJobOffers = async ({ page, limit }: { page: number; limit: number }) => {
    const tokens = localStorage.getItem('accessToken');
   const response = await fetch(`http://localhost:3002/api/v1/offre/all?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens}`
        }
    })

    return response.json();
};


export const createJobOffer : any = async (jobOfferData: any) => {
    try {
        const tokens = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:3002/api/v1/offre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokens}`
            },
            body: JSON.stringify(jobOfferData),
        });
        return response.json();
    } catch (error) {
        throw new Error('Failed to create job offer');
    }
};


export const createCompany : any = async (offerId : string, companyData: any) => {
    const tokens = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`http://localhost:3002/api/v1/company/${offerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokens}`
            },
            body: JSON.stringify(companyData),
        });
        return response.json();
    } catch (error) {
        throw new Error('Failed to create company');
    }
};

export const createRecruiter : any = async (offerId : string, recruitersData: any) => {
    const tokens = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`http://localhost:3002/api/v1/recruiter/${offerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokens}`
            },
            body: JSON.stringify(recruitersData),
        });
        return response.json();
    } catch (error) {
        throw new Error('Failed to create company');
    }
};



export const deleteJobOffer = async (id: string) => {
    const tokens = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`http://localhost:3002/api/v1/offre/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokens}`
            },

        });
        return response.json();
    } catch (error) {
        throw new Error('Failed to delete job offer');
    }
};
