import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(()=>{
        localStorage.removeItem("token");
        window.location.href = "/";
    },[])
  return (
    <div>
      <h1>Logout</h1>
    </div>
  )
}

export default Logout