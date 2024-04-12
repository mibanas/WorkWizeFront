import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'} className='flex items-end gap-2'>
        <div className='capitalize text-[#241d22] text-xl font-extrabold tracking-wide'>WORKWIZE</div>
    </Link>
  )
}

export default Logo