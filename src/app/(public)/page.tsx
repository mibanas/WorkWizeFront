import FonctionalityLeft from "./components/(home)/FonctionalityLeft";
import FonctionalityRight from "./components/(home)/FonctionalityRight";
import Footer from "./components/(home)/Footer";
import SectionPrincipale from "./components/(home)/SectionPrincipale";
import SponsorLogo from "./components/(home)/SponsorLogo";
import { fonctionalityData } from './constants/fonctionalityData'

export default function Home() {
  return (
    <>
      <main className="antialiased">
          <SectionPrincipale />
          <SponsorLogo />

          <h1 className='container mt-20 mb-20 text-4xl font-light'>Les Fonctoinalités de <span className='font-extrabold text-[#2b405c]'>WorkWize</span></h1>


          {fonctionalityData.map((fonctionality, index) => {
            if(index % 2 === 0) {
              return (
                <FonctionalityLeft key={index} data={fonctionality}/>
              )
            } else {
              return (
                <FonctionalityRight key={index} data={fonctionality}/>
              )
            }
          })}

          <Footer />
      </main>
    </>
  );
}
