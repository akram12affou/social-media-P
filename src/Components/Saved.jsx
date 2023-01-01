import { collection,doc, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import {useState} from 'react'
import { db, auth } from '../firebaseconfigu'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
 function Saved() {
  const [user , setUser] = useState('')
  const [savedpost,setSavedpost] = useState([])
  useEffect(() => {
   onAuthStateChanged(auth , CurrentUser => {  
     setUser(CurrentUser)
     localStorage.setItem('userEmail' , auth?.currentUser?.email)
   },[])})
   const savedpostsdef = collection(db , 'savedposts')
   const q =  query(savedpostsdef, where("userEmail", "==", auth?.currentUser?.email || localStorage.getItem('userEmail') || "")); 
   const getSavedPosts = async() => {
    const data = await getDocs(q)
    setSavedpost(data.docs.map((data) => (
      {...data.data() , id : data.id}
    )))
  }
  useEffect(() => {
    getSavedPosts()
    
  },[])
  const deleteSavedPost = async (id) => {
    console.log(id)
    await deleteDoc(doc(db , 'savedposts' , id))
    getSavedPosts()
  }
  return (
    <div>{savedpost.map((e) => {
      return(
        <div key={e.id}>
        <h1>{e.title}</h1>
        <p>{e.postText}</p>
        <p>{e.userEmail}</p>
        <button onClick={() =>deleteSavedPost(e.id)}>delete from save</button>
      </div>
      )
    })}</div>
  )
}

export default Saved