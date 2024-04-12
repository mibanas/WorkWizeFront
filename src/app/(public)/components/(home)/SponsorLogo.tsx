import React from 'react'
import Image from 'next/image'

const SponsorLogo = () => {
  return (
    <section className='h-auto bg-[#e0ddc7] mx-0 flex items-center justify-center'>

        <div>
        <Image 
            src="/images/company/cdg.png"
            alt=""
            className="h-full max-w-full"
            width={500}
            height={500}
        />
        </div>
        
        <div>
        <Image 
            src="/images/company/simplon.png"
            alt=""
            className="h-full max-w-full"
            width={300}
            height={300}
        />
        </div>

        <div>
        <Image 
            src="/images/company/cdg.png"
            alt=""
            className="h-full max-w-full"
            width={500}
            height={500}
        />
        </div>

        <div>
        <Image 
            src="/images/company/simplon.png"
            alt=""
            className="h-full max-w-full"
            width={300}
            height={300}
        />
        </div>

  </section>
  )
}

export default SponsorLogo