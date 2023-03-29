import React , {useState} from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import Image from 'next/image'

function signup() {

    let [firstName ,setFirstName] = useState("")
    let [lastName ,setLastName] = useState("")
    let [username ,setUserName] = useState("")
    let [email ,setEmail] = useState("")
    let [password,setPassword] = useState("")
    const [displayImage ,setDisplayImage] = useState("/user/display-picture.jpg")

    const post = () => {
        axios.post("http://localhost:3000/api/auth/signup" , {
            firstName,
            lastName,
            username,
            email,
            password,
            displayImage
        })
    }


  return (
    <>
    <Navbar />

<div className='capitalize h-90-h w-screen flex justify-center items-center font-montserrat'>
    
    <form onSubmit={post} className='flex flex-col gap-6 w-80 bg-purple-300 rounded-md shadow-xl p-2 transition hover:-translate-y-2 hover:ease-in-out duration-500'>

    <div className='flex gap-4 flex-col text-xs justify-center items-center'>

    <img src={displayImage} height={100} width={100} alt="public\user\display-picture.jpg" />
   <input type="file" onChange={(e) => setDisplayImage(e.target.value)} />

    </div>
      
        
      <input type="text" className='bg-purple-300 text-white placeholder-purple-400 text-sm focus:border-blue-400' required={true} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
           
      <input type="text" className='bg-purple-300 text-white placeholder-purple-400 text-sm' required={true} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
          
      <input type="text" className='bg-purple-300 text-white placeholder-purple-400 text-sm focus:border-transparent' required={true} placeholder='User Name' onChange={(e) => setUserName(e.target.value)}/>
            
      <input type="email" className='bg-purple-300 text-white placeholder-purple-400 text-sm' required={true} placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}/>
            
      <input type="password" className='bg-purple-300 text-white placeholder-purple-400 text-sm placeholder:focus { outline: none;} ' required={true} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      
      <Link href='/auth/signin' className='text-purple-400 text-xs'>Already Registered?</Link>
      
      <div className='flex justify-center'>
    <button type="submit" className='hover:bg-purple-400 w-16 rounded-md text-sm transition ease-in-out duration-500'>Submit</button>
      </div>
      
    </form>
</div>
    </>
  )
}

export default signup