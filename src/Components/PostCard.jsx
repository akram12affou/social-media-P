import React from 'react'

function PostCard({e}) {
  return (
    <div>
          <h1>{e.title}</h1>
          <p>{e.postText}</p>
          <p>{e.userEmail}</p>
          {e.createdAt && <p>{new Date(e.createdAt).toLocaleString('en-GB',{timeZone:'UTC'})}</p>}
    </div>
  )
}

export default PostCard