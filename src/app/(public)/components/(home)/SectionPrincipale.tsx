import Image from 'next/image'
import { logoPrincipalSection } from '../../constants/logoPrincipalSectio'
import ImageWithIcons from './ImageWithIcons'

const SectionPrincipale = () => {
  return (
    <>
        <section className="relative container flex flex-col justify-center items-center w-full h-[910px] md:flex-row md:justify-between text-[#241d22] font-montserrat">
            <div className="w-full mx-3 md:w-1/2 pr-8 relative z-10 ">
              <h1 className="text-5xl font-medium">WORKWIZE</h1>
              <h1 className="text-6xl font-extrabold uppercase mt-2">Boostez votre recherche d'emploi</h1>
              <p className="mt-10 text-lg">Workwize est l'application web qui révolutionne votre recherche d'emploi. Centralisez vos candidatures, recevez des alertes, relancez les recruteurs, fixez-vous des objectifs et optimisez vos chances de décrocher le poste de vos rêves.</p>
            </div>
            <Image 
              src="/images/1.png"
              width={500}
              height={500}
              alt="Image"
              className="w-full mx-3 md:w-1/2 mt-8 md:mt-0"
            />
            {/* Icone en arrière-plan */}

            <ImageWithIcons images={logoPrincipalSection} />

        </section>
    </>
  )
}

export default SectionPrincipale