import React , {useState} from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Link from 'next/link'


function signup() {
    let [email ,setEmail] = useState("")
    let [password,setPassword] = useState("")

    const post = () => {
        axios.post("http://localhost:3000/api/auth/signin" , {
            email,
            password
        })
    }


  return (
    <>
    <Navbar />
<div className='capitalize h-90-h w-screen flex justify-center items-center font-montserrat'>
    
    <form onSubmit={post} className='flex flex-col gap-6 w-80 bg-purple-300 rounded-md shadow-xl p-2 transition hover:-translate-y-2 hover:ease-in-out duration-500'>
            
        <input type="email" className='bg-purple-300 text-white placeholder-purple-400 text-smS border-transparent ' required={true} placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}/>
            
        <input type="password" className='bg-purple-300 text-white placeholder-purple-400 text-sm border-transparent' required={true} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>

        <Link href='/auth/signup' className='text-purple-400 text-xs'>Not Registered?</Link>


      <div className='flex justify-center'>
<button type="submit" className='hover:bg-purple-400 w-16 rounded-md text-sm transition ease-in-out duration-500 '>Submit</button>
      </div>
    </form>
</div>
    </>
  )
}

export default signup