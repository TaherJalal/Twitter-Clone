import React , {useState} from 'react'
import axios from 'axios'

function signup() {

    let [firstName ,setFirstName] = useState("")
    let [lastName ,setLastName] = useState("")
    let [username ,setUserName] = useState("")
    let [email ,setEmail] = useState("")
    let [password,setPassword] = useState("")

    const post = () => {
        axios.post("http://localhost:3000/api/auth/signup" , {
            firstName,
            lastName,
            username,
            email,
            password
        })
    }


  return (
    <>
<div className='capitalize h-screen w-screen flex justify-center items-center font-montserrat'>
    <form onSubmit={post} className='flex flex-col gap-6 w-80 bg-purple-300 rounded-md shadow-xl '>

        <input type="text" className='bg-purple-300 text-white placeholder-purple-400 focus:border-blue-400' required={true} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
             
        <input type="text" className='bg-purple-300 text-white placeholder-purple-400' required={true} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
            
           
        <input type="text" className='bg-purple-300 text-white placeholder-purple-400' required={true} placeholder='User Name' onChange={(e) => setUserName(e.target.value)}/>
            
        <input type="email" className='bg-purple-300 text-white placeholder-purple-400' required={true} placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}/>
            
        <input type="password" className='bg-purple-300 text-white placeholder-purple-400' required={true} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      
      <div className='flex justify-center'>
    <button type="submit" className='hover:bg-purple-400 w-20 rounded-md'>Submit</button>
      </div>
    </form>
</div>
    </>
  )
}

export default signup