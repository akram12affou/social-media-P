import { addDoc, collection, deleteDoc,doc, getDocs, orderBy, query, Timestamp, where} from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { db, auth } from '../firebaseconfigu'
import { onAuthStateChanged } from 'firebase/auth'

function Posts() {
  const [arrOfIds , setArrOfIds] = useState([])
  const [posts , setPosts] = useState([])
  const [title , setTitle] = useState('')
  const [text , setText] = useState('')
  const [savedpost,setSavedpost] = useState([])
  const postsdef = collection(db , 'posts')
  
  const savedpostsdef = collection(db , 'savedposts')
  const q =  query(savedpostsdef, where("userEmail", "==", auth?.currentUser?.email || localStorage.getItem('userEmail') || "") ); 
  const postq = query(postsdef,orderBy("createdAt"))
  const [user , setUser] = useState('')
  // let normalDate = 
  // console.log(normalDate)

 
  useEffect(() => {
   onAuthStateChanged(auth , CurrentUser => {  
     setUser(CurrentUser)
   },[])})
   
   const getSavedPosts = async() => {
    const data = await getDocs(q)
    setSavedpost(data.docs.map((data) => (
      {...data.data() , id : data.id}
    )))
    
  }
  const getIdsOfSavedPosts = async() => {
    const data = await getDocs(q)
    setArrOfIds(data.docs.map((data) => (
       data.data().postId
    )))
  }
 
  useEffect(() => {
    getSavedPosts()
    getIdsOfSavedPosts()
}
    ,[])
  const getPosts = async() => {
    const data = await getDocs(postq)
    setPosts(data.docs.map((data) => (
      {...data.data() , id : data.id}
    )))
   
  }

  useEffect(() => {getPosts()} , [])
   const addPost  = async () => {
    const d = new Date();
    await addDoc(postsdef,{
      postText : text,
      title ,
      userEmail : user?.email,
      createdAt : d.getTime()
    })
    setTitle('')
    setText('')
    getPosts()
   }

  const addToSavedPosts = async (title,postText,writerEmail,currentUserEmail,id) => {
    getIdsOfSavedPosts()
    await addDoc(savedpostsdef,{
      postId :id,
      postText ,
      title ,
      userEmail : currentUserEmail,
      writerEmail: writerEmail,
    })
    getSavedPosts()
  }
  const deletePost =async (id) => {
      await deleteDoc(doc(db , 'posts' , id))
      getPosts()
  }
  return (
    <center>
 {user ? <>  
   <label htmlFor="">title :</label><input value={title} onChange={e => setTitle(e.target.value)}></input>
      <label htmlFor="">text :</label><input value={text} onChange={e => setText(e.target.value)}></input>
      <button onClick={addPost}>add Post</button></> : <h1>to add Post enregister</h1> }
    {posts.map((e) => {
       return(
        <div key={e.id}>
          <h1>{e.title}</h1>
          <p>{e.postText}</p>
          <p>{e.userEmail}</p>
          <p>{new Date(e.createdAt).toLocaleString('en-GB',{timeZone:'UTC'})}</p>
          {user && <button onClick={() => addToSavedPosts(e.title,e.postText,e.userEmail,user?.email,e.id)} disabled={arrOfIds.includes(e.id)}>Save the post</button>}
          {(user && auth?.currentUser?.email == e.userEmail) && <button onClick={() => deletePost(e.id)}>Delete</button>}
        </div>
       )
      })}
    </center>
  )
}

export default Posts