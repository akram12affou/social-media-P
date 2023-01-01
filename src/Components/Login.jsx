import React,{useEffect} from 'react'
import { db, auth } from '../firebaseconfigu'
import { signInWithEmailAndPassword } from 'firebase/auth'
function Login() {


    console.log(user)
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const login = async() => {
       try{
         await signInWithEmailAndPassword(auth,email,password);
         setEmail('')
         setPassword('')
       }catch(err){
           console.log(err.message)
       }
  }
  return (
    <div>
        <h1>Login</h1>
        <label htmlFor="" >email : </label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
         <br />
        <label htmlFor="" >password : </label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}  />
        <br />
        <button onClick={login}>Log In</button>
    </div>
  )
}

export default Login