import React,{useState} from 'react'
import { Stack } from '@mui/system'
import Chat from './Chat'
import Chatlist from './Chatlist'
const Home = () => {
    const [chats, setChat] = useState()
    return (
        <>
            <Stack direction={{ sm: 'column', md: 'row' }}>
                <Stack flexGrow={0}>
                    <Chat setChat={setChat} />
                </Stack>
                <Stack flexGrow={99}>
                    <Chatlist selectedChats={chats} />
                </Stack>

            </Stack>
        </>
    )
}

export default Home