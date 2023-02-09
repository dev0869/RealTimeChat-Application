import React, { useEffect, useRef } from "react";
import './indexes.css'
import { useMessageContext } from '../context.js/MessageContext'
import { useChatContext } from '../context.js/AuthContext';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Messages = ({ Message }) => {
  const { currentUser } = useChatContext()

  const { data } = useMessageContext()
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [Message]);

  return (
    <>
    <div ref={ref} className={`message ${Message.senderId === currentUser.uid && "owner"}`} >

      <div className="messageContent">
       
        <p className={`messagetext ${Message.senderId === currentUser.uid && "ownertext"}`}>
          {Message.text}
        </p>
        <span className="sent"><DoneAllIcon /></span>
        {Message.img && <img className="imgsend" src={Message.img} alt="" />}
      </div>
    </div> 
    </>
   
   
  );
};

export default Messages;