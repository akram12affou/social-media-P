import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {  signOut,onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseconfigu'
function NavBar() {
  const [user , setUser] = React.useState('')
  const navigate = useNavigate()
  useEffect(() => {
 onAuthStateChanged(auth , CurrentUser => {  
   setUser(CurrentUser)
 })
  },[])
  const logOut = async () => {
    await signOut(auth);
    navigate('/');
  }
  return (
    <div>
        {!user && <Link to='register'><button>regiser</button></Link>}
        <Link to='/'><button>Posts</button></Link>
       {user && <Link to='saved'><button>Saved</button></Link>}
        <div className='user'>
        {user?.email} 
        {user && <button onClick={logOut}>Log out</button>}
        </div>
        
    </div>
  )
}

export default NavBar