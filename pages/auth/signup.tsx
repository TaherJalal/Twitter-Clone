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
    <div className='w-60 capitalize'>
        <form onSubmit={post}>

            <div className='flex flex-col'>
                <label>first name</label>
                <input type="text" onChange={(e) => setFirstName(e.target.value)}/>

                <div className='flex flex-col'>
                <label>last name</label>
                <input type="text" onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div className='flex flex-col'>
                <label>username</label>
                <input type="text" onChange={(e) => setUserName(e.target.value)}/>
            </div>

            <div className='flex flex-col'>
                <label>email address</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='flex flex-col'>
                <label>password</label>
                <input type="text" onChange={(e) => setPassword(e.target.value)}/>
            </div>

            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default signup