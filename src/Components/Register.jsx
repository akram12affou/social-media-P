import React from 'react'
import { Link } from 'react-router-dom'
import { db, auth } from '../firebaseconfigu'
import {useState,useEffect} from 'react'
import { createUserWithEmailAndPassword, signOut, updateCurrentUser } from 'firebase/auth'
function Register() {



  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const resiter = async() => {
     try{
       await createUserWithEmailAndPassword(auth,email,password);
       setEmail('')
       setPassword('')
     }catch(err){
         console.log(err.message)
     }
}

  return (
    <div>
        <h1>Sign In</h1>
        <label htmlFor="" >email : </label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
         <br />
        <label htmlFor="" >password : </label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}  />
        <br />
        <button onClick={resiter}>sign in</button>
       <Link to='/login'><p>already have an acount ?</p></Link>

    </div>
  )
}

export default Register