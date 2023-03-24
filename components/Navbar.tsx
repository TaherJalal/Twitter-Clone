import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='flex gap-4 mx-4 my-2 justify-end'>
    <Link href="/auth/signin">Sign In</Link>
    <Link href="/auth/signup">Sign Up</Link>
  </div>
  )
}

export default Navbar