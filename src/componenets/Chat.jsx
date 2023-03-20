import React, { useContext } from 'react'
import { Stack } from '@mui/material'
import '../index.css'
import { signOut } from 'firebase/auth'
import { auth, db } from '../Firebase'
import Search from './Search'
import { Link } from 'react-router-dom'
import Compressor from 'compressorjs';

// FOR REALTIME GETTING DATA
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from 'react'
import { useChatContext } from '../context.js/AuthContext'
import { MessageContext } from '../context.js/MessageContext'
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

const ContactComponent = () => {

    const [chats, setChats] = useState([])
    const { currentUser } = useChatContext()
    const { dispatch } = useContext(MessageContext)

    useEffect(() => {
        const getChats = () => {
            // ?geeting realtime data
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    }
    return (


        <>
            <div className='obj'>
                <h1 style={{ padding: '5px 20px', alignItems: 'center' }}><span style={{ fontSize: '20px' }}> C</span>hats<span>..</span></h1>

                {chats && Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => {
                  
                        return (


                            <div className={'ContactComponent'} key={chat[0]} onClick={() => { handleSelect(chat[1].userInfo) }}>

                                <Stack direction={'row'} alignItems={'center'} p={1} margin={'10px 12px'} justifyContent={'space-between'}>
                                    <Stack direction={'row'} alignItems={'center'} gap={2} position={'relative'} >
                                        <img src={chat[1].userInfo && chat[1].userInfo.photoURL} alt='' className='userImg' loading='lazy' />
                                        <Stack direction={'column'}  >
                                            <h2 className='user'>{chat[1].userInfo && chat[1].userInfo.displayName}</h2>
                                            <h2><span style={{fontSize:'16px'}}>{chat[1].userInfo && chat[1].lastMessage?.text?.substring(0, 20)}</span> </h2>
                                        </Stack>
                                        <hr />
                                    </Stack>
                                </Stack>
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}

const Chat = ({ setChat, user }) => {


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                backgroundColor: '#44b700',

                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));


    return (
        <>
            <Stack direction={'column'} sx={{ height: '100vh', overflowY: 'auto' }}>
                <Stack direction={'row'} justifyContent={'space-between'} p={'14px'} sx={{ background: '#EFEFEF' }} alignItems={'center'}>
                    <h1 className='logo'>Dev<span>T</span>alk</h1>
                    
                    <Stack direction={'row'} gap={'10px'} alignItems={'center'}>

                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={user && user.photoURL} />
                        </StyledBadge>

                        <Link style={{ color: 'orangered' }} onClick={() => signOut(auth)} to={'/login'}>
                            <span className='logout'>
                                <LogoutIcon sx={{ fontSize: '350%' }} />
                            </span>
                        </Link>
                    </Stack>

                </Stack>

                <Search data={setChat} />
                {/* ---------user contact list -------------- */}
                <ContactComponent setChat={setChat} />

            </Stack>

        </>
    )
}

export default Chat
