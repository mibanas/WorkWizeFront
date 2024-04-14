import React from 'react'
import Link from "next/link"

import {
    Home,
    LineChart,
    Users,
    BriefcaseBusiness,
    Siren,
    Handshake
  } from "lucide-react"



const Navbare = () => {
  return (
    <div className="flex-1">
        <nav className="grid items-start px-2 text-lg font-bold lg:px-4">
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-black px-3 py-2 mb-20 text-white transition-all"
            >
                <Home className="h-6 w-6 " />
                Dashboard
            </Link>
            <Link
                href="/dashboard/offres"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <BriefcaseBusiness className="h-6 w-6" />
                Offres
            </Link>
            {/* <Link
                href="/dashboard/application"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
                <Handshake className="h-6 w-6" />
                Postuler
            </Link>
            <Link
                href="/dashboard/relance"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
            >
                <Siren className="h-6 w-6" />
                Relances
            </Link>
            <Link
                href="/dashboard/entretien"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Users className="h-6 w-6" />
                Entretiens
            </Link>
            <Link
                href="/dashboard/statistique"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <LineChart className="h-6 w-6" />
                Statistiques
            </Link> */}
        </nav>
    </div>
  )
}

export default Navbare