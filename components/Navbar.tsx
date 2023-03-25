import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <>
    <div className='flex justify-between px-4 py-2 gap-4'>

      <div className='flex gap-4'>
      <Link href='/'>Home</Link>
    </div>

    <div className='flex gap-4 justify-end'>
    <Link href="/auth/signin">Sign In</Link>
    <Link href="/auth/signup">Sign Up</Link>
  </div>

    </div>
  </>
  )
}

export default Navbar