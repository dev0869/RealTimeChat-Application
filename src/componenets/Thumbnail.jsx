import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../index.css'
import { Stack } from '@mui/material';
const Thumbnail = () => {
    return (
        <>
            <div className='thumbnail'>
                <Stack direction={'column'} gap={2} margin={'0% auto'} width={'100%'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
                    <span><WhatsAppIcon style={{ fontSize: '1500%', color: '#FB6828' }} /></span>
                    <h1 > <span>Choose The Conversation From The Left.</span></h1>
                </Stack>
            </div>


        </>)
}

export default Thumbnail