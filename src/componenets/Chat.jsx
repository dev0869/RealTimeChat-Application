import React, { useContext } from 'react'
import { Stack } from '@mui/material'
import '../index.css'
import { signOut } from 'firebase/auth'
import { auth, db } from '../Firebase'
import Search from './Search'
import { Link } from 'react-router-dom'
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
        
                                <svg id="logo" viewBox="0 0 398.22222222222223 109.8" height="109.8" width="398.22222222222223"><defs id="SvgjsDefs1052"></defs><g id="SvgjsG1053" featurekey="symbolContainer" transform="matrix(0.9,0,0,0.9,0,0)" fill="#ff512f"><rect xmlns="http://www.w3.org/2000/svg" width="118" height="122" rx="10" ry="10"></rect></g><g id="SvgjsG1054" featurekey="monogramFeature-0" transform="matrix(1.9618364496675464,0,0,1.9618364496675464,8.112647762257849,-21.728785600307255)" fill="#f9f7f7"><path d="M42.139 36.894999999999996 c0.43219 1.9544 0.61662 3.9976 0.44186 6.0588 c-0.18557 2.0611 -0.74676 4.116 -1.6169 5.9878 c-0.88536 1.8578 -2.0701 3.5077 -3.4397 4.8755 c-1.3671 1.3735 -2.8867 2.5131 -4.5056 3.3965 c-1.6175 0.88662 -3.3158 1.5616 -5.0693 1.9976 c-1.7599 0.43283 -3.4918 0.63372 -5.213 0.66042 c-3.4372 0.0375 -6.705 -0.6222 -9.7332 -1.6639 c-0.21545 -0.07752 -0.39275 -0.19002 -0.55231 -0.31652 c-0.90828 -0.13096 -1.6506 -0.39727 -1.7771 -0.79068 c-1.6385 -9.831 -3.8039 -19.559 -5.4475 -29.803 c-1.7962 -2.9904 -2.9586 -5.7704 -1.6931 -6.3732 c2.0002 -0.9438 3.9883 -1.5654 5.9484 -2.0084 c1.9576 -0.4176 3.889 -0.6216 5.8015 -0.696 c3.8198 -0.078162 7.5774 0.41057 11.293 1.6741 c1.8565 0.65526 3.699 1.4714 5.4837 2.6198 c1.7485 1.1421 3.2935 2.4857 4.6371 3.9628 c1.3462 1.4777 2.4559 3.1232 3.3818 4.8596 c0.92664 1.7351 1.6315 3.5986 2.0605 5.5582 z M31.81 45.204 c0.2015 -0.85806 0.27112 -1.702 0.19166 -2.5765 c-0.092166 -0.87456 -0.34383 -1.7637 -0.70614 -2.6288 c-0.35654 -0.86688 -0.85674 -1.711 -1.4675 -2.4724 c-0.6057 -0.75948 -1.2813 -1.4714 -2.0401 -2.0408 c-0.7557 -0.57076 -1.5502 -1.0284 -2.3402 -1.357 c-0.76776 -0.30697 -1.6887 -0.52939 -2.6459 -0.69018 c-0.64764 -0.10998 -1.3347 -0.15574 -2.0288 -0.17291 c-1.2247 6.471 -2.3166 13.114 -3.5719 19.751 c1.7059 0.11566 3.38 0.051445 4.9613 -0.22693 c2.4336 -0.4309 4.5577 -1.3518 6.2838 -2.738 c1.7231 -1.3684 2.9332 -3.1334 3.3635 -4.8482 z"></path></g><g id="SvgjsG1055" featurekey="nameFeature-0" transform="matrix(1.9380978617313753,0,0,1.9380978617313753,122.90113659080069,4.74340787818182)" fill="#ff512f"><path d="M12.059 12 c5.7668 0 10.459 4.692 10.458 10.458 l0 7.0824 c0 5.7668 -4.692 10.459 -10.459 10.459 c-0.58252 0 -1.1411 -0.23141 -1.5529 -0.64316 l-8.2628 -8.2628 c-0.85784 -0.85756 -0.85784 -2.248 0 -3.1056 c0.85756 -0.85756 2.248 -0.85756 3.1056 0 l7.5604 7.5604 c2.9441 -0.41476 5.2164 -2.9507 5.2164 -6.0072 l0 -7.0824 c0 -3.3452 -2.7215 -6.0668 -6.0668 -6.0668 l-6.0666 0 l0 3.9768 l7.6196 7.6196 c0.85784 0.85756 0.85784 2.248 0 3.1056 c-0.85756 0.85756 -2.248 0.85756 -3.1056 0 l-8.2628 -8.2628 c-0.41176 -0.41176 -0.64316 -0.9704 -0.64316 -1.5529 l0 -7.0824 c0 -1.2128 0.98328 -2.196 2.196 -2.196 l8.2627 0 z M34.748 19.412 c5.6764 0 10.294 4.6176 10.294 10.294 c0 1.2128 -0.98328 2.196 -2.196 2.196 l-13.576 0 c0.87292 2.17 2.9995 3.7059 5.4784 3.7059 c1.5765 0 3.0586 -0.6138 4.1732 -1.7286 c0.85784 -0.85756 2.248 -0.85732 3.1058 0 c0.85784 0.85784 0.85756 2.2482 0 3.1058 c-1.9446 1.9443 -4.5296 3.0149 -7.2792 3.0149 c-5.6764 0 -10.294 -4.6176 -10.294 -10.294 s4.6176 -10.294 10.294 -10.294 z M29.2696 27.509999999999998 l10.957 0 c-0.87292 -2.17 -2.9995 -3.7059 -5.4784 -3.7059 s-4.6056 1.5359 -5.4784 3.7059 z M64.363 19.644 c1.0846 0.54216 1.5243 1.8614 0.98192 2.946 l-8.098 16.196 c-0.37195 0.74392 -1.1324 1.2139 -1.9641 1.2139 s-1.5922 -0.46996 -1.9641 -1.2139 l-8.098 -16.196 c-0.5424 -1.0848 -0.10266 -2.4039 0.98192 -2.9463 c1.0848 -0.5424 2.4039 -0.10293 2.9463 0.9822 l6.134 12.268 l6.134 -12.267 c0.54216 -1.0851 1.8612 -1.5241 2.9463 -0.9822 z M86.244 12 c1.2128 0 2.196 0.98328 2.196 2.196 s-0.98328 2.196 -2.196 2.196 l-11.224 0 l4.5136 4.5136 c0.85756 0.85756 0.85756 2.248 0 3.1056 c-0.4288 0.4288 -0.99096 0.64316 -1.5529 0.64316 c-0.5622 0 -1.1241 -0.21438 -1.5529 -0.64316 l-8.2628 -8.2628 c-0.62808 -0.62808 -0.81584 -1.5726 -0.47576 -2.3932 s1.1408 -1.3555 2.0289 -1.3555 l16.525 0 z M71.2712 20.906 l8.2628 8.2624 c0.41176 0.41176 0.64316 0.9704 0.64316 1.5529 l0 7.0824 c0 1.2128 -0.98328 2.196 -2.196 2.196 s-2.196 -0.98328 -2.196 -2.196 l0 -6.1726 l-7.6196 -7.6196 c-0.85756 -0.85756 -0.85756 -2.248 0 -3.1056 c0.85812 -0.85784 2.2485 -0.85756 3.1058 0 z M102.768 19.412 c1.2128 0 2.196 0.98328 2.196 2.196 l0 16.196 c0 1.2128 -0.98328 2.196 -2.196 2.196 c-1.1071 0 -2.0201 -0.81968 -2.1716 -1.885 c-1.677 1.1856 -3.721 1.885 -5.9264 1.885 c-5.6764 0 -10.294 -4.6176 -10.294 -10.294 s4.6176 -10.294 10.294 -10.294 c2.2054 0 4.2492 0.69944 5.9264 1.885 c0.15152 -1.0654 1.0645 -1.885 2.1716 -1.885 z M94.67 35.608 c3.2543 0 5.902 -2.6476 5.902 -5.902 s-2.6476 -5.902 -5.902 -5.902 s-5.902 2.6476 -5.902 5.902 s2.6476 5.902 5.902 5.902 z M117.369 35.608 c1.2128 0 2.1961 0.98332 2.1961 2.1961 s-0.98328 2.196 -2.196 2.196 c-5.7668 0 -10.459 -4.692 -10.459 -10.459 l0 -15.345 c0 -1.2128 0.98328 -2.196 2.196 -2.196 s2.196 0.98328 2.196 2.196 l0 15.345 c0 3.3452 2.7215 6.0668 6.0668 6.0668 z M134.89600000000002 29.733 l6.518 6.518 c0.85784 0.85756 0.85784 2.248 0 3.1056 c-0.4288 0.4288 -0.99072 0.64316 -1.5529 0.64316 s-1.1241 -0.21438 -1.5529 -0.64316 l-6.5176 -6.5176 l-6.5176 6.5176 c-0.42028 0.42 -0.98192 0.64316 -1.5534 0.64316 c-0.28301 0 -0.56824 -0.054608 -0.84 -0.16715 c-0.82052 -0.33984 -1.3555 -1.1406 -1.3555 -2.0289 l0 -23.606 c0 -1.2128 0.98328 -2.196 2.196 -2.196 s2.196 0.98328 2.196 2.196 l0 18.305 l12.392 -12.392 c0.85756 -0.85756 2.248 -0.85756 3.1056 0 c0.85784 0.85756 0.85784 2.248 0 3.1056 z"></path></g></svg>

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
