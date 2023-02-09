import React, { useState, useContext } from 'react'
import './indexes.css'
import { MessageContext } from '../context.js/MessageContext'
import { useChatContext } from '../context.js/AuthContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../Firebase";
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Stack } from '@mui/material'
const Input = () => {
  const [text, setText] = useState(null)
  const [img, setImg] = useState()
  const { currentUser } = useChatContext()

  const { data } = useContext(MessageContext)

  const handleSend = async () => {
    setText('');
    setImg(null);
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),

                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),

    });


  };


  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  const handelText = (e) => {
    setText(e.target.value)
  }

  return (
    <>



      <div className="search">

        <div className="bar1">
          <input
            className='searchbar'
            type="text"
            placeholder="Type something..."
            onChange={handelText}
            value={text}
            onKeyDown={handleKey}

          />
          <Stack direction={'row'} alignItems={'center'} gap={3} sx={{ padding: '0 12px' }}>

            <label htmlFor="file">     <AddPhotoAlternateIcon style={{ fontSize: '24px', cursor: 'pointer', color: 'orangered', marginTop: '-7px', position: 'relative', top: '-3px' }} /></label>
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
            />

            <SendIcon style={{ fontSize: '24px', cursor: 'pointer', color: '#0076F7' }} onClick={handleSend} />
          </Stack>

        </div>
      </div>


    </>
  )
}

export default Input