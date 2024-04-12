// sectionData.ts
export interface SectionData {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
}

export const fonctionalityData: SectionData[] = [
    {
        imageSrc: "/images/1.png",
        imageAlt: "",
        title: "Centralisez et suivez vos candidatures en toute simplicité",
        description: "Fini les recherches interminables et les candidatures perdues ! Avec Workwize, retrouvez toutes vos candidatures en un seul endroit et suivez leur statut en temps réel. Recevez des notifications pour chaque étape du processus de recrutement et ne manquez aucune opportunité. Personnalisez votre suivi en adaptant le statut de vos candidatures et en ajoutant des notes et commentaires pour chaque candidature."
    },
    {
        imageSrc: "/images/fonctionality/1.png",
        imageAlt: "",
        title: "Fixez-vous des objectifs et mesurez votre succès",
        description: "Définissez des objectifs de recherche d'emploi clairs et suivez vos progrès grâce à des outils de suivi performants. Mesurez l'efficacité de votre recherche d'emploi et optimisez vos actions pour maximiser vos chances de réussite. Bénéficiez de conseils personnalisés pour booster votre recherche d'emploi et atteindre vos objectifs."
    },
    {
        imageSrc: "/images/fonctionality/2.png",
        imageAlt: "",
        title: "Restez en contact avec les recruteurs et optimisez vos chances",
        description: "Workwize vous permet de rester en contact permanent avec les recruteurs. Envoyez des relances automatiques ou personnalisées pour montrer votre intérêt et démarquez-vous des autres candidats. Exprimez votre intérêt pour les postes qui vous correspondent et entretenez de bonnes relations avec les recruteurs. Remerciez-les après un entretien et renforcez votre position."
    }
];
