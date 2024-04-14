'use client'

import Link from "next/link"
import {
  MoreHorizontal,
  PlusCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/GlobalRedux/Store/store"
import { useEffect, useState } from "react"
import { fetchAllOffersAsync } from "@/GlobalRedux/Features/offre/Slice/offre"
import {  JobOffersResponse } from '@/interfaces/offre/offre';
import { useRouter } from "next/navigation"

interface JobOffersState {
  jobOffers: JobOffersResponse | null;
  loading: boolean;
  error: string | null;
}

function formatDateWithSir(dateString :string) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}


const Offre = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { jobOffers, error } = useSelector((state: RootState) => state.offre);
  const [page, setPage] = useState(1)




  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
  const handleNextPage = () => {
    if (page * 10 < (jobOffers?.count ?? 0)) {
      setPage(page + 1);
    }
  };

  
  useEffect(() => {
    
    if (!localStorage.getItem('accessToken') || error) {
      router.push('/login');
    } else {
      dispatch(fetchAllOffersAsync({ page: page, limit: 10 }));
    }

  }, [dispatch, page])

  if (!jobOffers) {
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">

        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Link href="/dashboard/offres/addoffre">
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Ajouter
                      </span>
                    </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="all">

              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Offres</CardTitle>
                  <CardDescription>
                    Liste des offres.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Offre</TableHead>
                        <TableHead className="hidden md:table-cell">Date Publication</TableHead>
                        <TableHead className="hidden md:table-cell">Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Date Création</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>

                    {jobOffers && jobOffers.data.length === 0 ? (
                          <TableRow>
                              <TableCell colSpan={6} className="text-center">Aucune offre disponible</TableCell>
                          </TableRow>
                      ) : (
                          jobOffers && jobOffers.data && jobOffers.data.map((offre, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{offre.title}</TableCell>
                          
                                <TableCell className="hidden md:table-cell">
                                  {offre.publicationDate ? formatDateWithSir(offre.publicationDate) : 'N/A'}
                                </TableCell>   
                                                  
                                <TableCell className="hidden md:table-cell">
                                  {offre.company ? offre.company.companyName : 'N/A'}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {offre.status?.name || 'Draft'} 
                                  </Badge>
                                </TableCell>  
                                <TableCell className="hidden md:table-cell">
                                  {offre.status ? formatDateWithSir(offre.status?.date) : 'N/A'}
                                </TableCell>
                                {/* <TableCell className="hidden md:table-cell">
                                  {offre.publicationDate ? formatDateWithSir(offre.createdAt) : 'N/A'}
                                </TableCell> */}
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    {/* <DropdownMenuItem><Link href={`/edit/${offre._id}`}>Edit</Link></DropdownMenuItem> */}
                                    <DropdownMenuItem><Link href={`/dashboard/offres/offre/${offre._id}`}>Lire</Link></DropdownMenuItem>
                                    {/* <DropdownMenuItem><Link href="/create">Create</Link></DropdownMenuItem> */}
                                    {/* <DropdownMenuItem><Link href={`/update/${offre._id}`}>Update</Link></DropdownMenuItem> */}
                                  </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                
                <CardFooter>
                <div className="text-xs text-muted-foreground mr-6">
                  Page {page} sur {Math.ceil((jobOffers?.count ?? 0) / 10)}
                </div>
                  <div className="flex space-x-2">
    
                    <Button 
                      size="sm" 
                      disabled={page === 1}
                      className="h-8 gap-1 disabled:opacity-50 focus:outline-none"
                      onClick={handlePreviousPage}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Précédent
                      </span>
                    </Button>

                    <Button 
                      size="sm" 
                      disabled={page * 10 >= (jobOffers?.count ?? 0)}
                      className="h-8 gap-1 disabled:opacity-50 focus:outline-none"
                      onClick={handleNextPage}
                    >
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Suivant
                      </span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>

                  </div>
                </CardFooter>


              </Card>


            </TabsContent>
          </Tabs>
        </main>
        
      </div>
    </div>
  )
}

export default Offre