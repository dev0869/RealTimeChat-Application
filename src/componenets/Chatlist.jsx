import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/system'
import '../index.css'
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from '../Firebase'
import Input from './Input'
import { signOut } from 'firebase/auth'

import { useMessageContext } from '../context.js/MessageContext'
import Thumbnail from './Thumbnail';
import LogoutIcon from '@mui/icons-material/Logout';

import { useChatContext } from '../context.js/AuthContext';
import Messages from './Messages';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const Message = () => {

    const [Msg, setMsg] = useState();
    const { data } = useMessageContext()
    const { currentUser } = useChatContext()
    console.log(Msg)

    useEffect(() => {


        // ?geeting realtime data
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMsg(doc.data().messages)
        });

        return () => {
            unsub();
        }

    }, [data.chatId]);

    return (
        <>
            <div className={Msg && Msg.senderId === currentUser.uid ? 'messagecontainer2' : 'messagecontainer'}>
                {
                    Msg && Msg.map((ele) => {
                        return (
                            <Messages Message={ele} key={ele.id} />
                        )
                    })
                }
            </div>
        </>
    )
}

const Chatlist = () => {
    const { data } = useMessageContext()
    return (
        <>

            {
                (data.blank) ? <Thumbnail /> : <Stack direction={'column'} width={'100%'} height={'100vh'} >
                    <Stack direction={'row'} p={'14px'} sx={{ background: '#EFEFEF' }} justifyContent={'space-between'} gap={1} alignItems={'center'} position={'relative'} zIndex={99}>
                       
                       <Stack direction={'row'} gap={1} alignItems={'center'}>
                        
                            <Link to={'/'} className='backarrow' onClick={'REFRESH'} >
                                <KeyboardBackspaceIcon sx={{ fontSize: '19px', color: '#f09819' }} />

                            </Link>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <img src={data && data.user?.photoURL} alt='img' loading='lazy' className='userImg2' />
                                <h2><span>{data && data.user?.displayName}</span></h2>
                            </Stack>


                        </Stack>
                        

                        <Link style={{ color: 'orangered' }} onClick={() => signOut(auth)} to={'/login'}>
                            <span>
                                <LogoutIcon sx={{ fontSize: '300%' }} />
                            </span>
                        </Link>
                    </Stack>
                    <Message />
                    <Input />
                </Stack>
            }

        </>
    )
}

export default Chatlist