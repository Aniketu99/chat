import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'

const User = () => {

  const InputText = useRef(null);

  const navigate = useNavigate();
  
  const handelJoin = ()=>{
    navigate(`/chat/${InputText.current.value.trim()}`);
  }

  return (

    <div>
       <div>
           <h1 className='text-color'>Enter Chat Room</h1>
          <input ref={InputText} type="text" onKeyDown={(e) => e.key === 'Enter' && handelJoin()} />
          <button onClick={handelJoin}>Join Room</button>
       </div>
    </div>
  )
}

export default User;
