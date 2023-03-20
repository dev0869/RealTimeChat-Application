// import React, { useState } from 'react'
// import Chat from './componenets/Chat'
// import Chatlist from './componenets/Chatlist'
// import { Stack } from '@mui/material'
// import Register from './componenets/Register'
// import Login from './componenets/Login'
// import './index.css'
// import { Route, Routes, Navigate } from 'react-router-dom'
// import { useChatContext } from './context.js/AuthContext'

// const Main = () => {


//   const { currentUser,loading } = useChatContext()
//   const [chats, setChat] = useState()
//   const [tog, setTog] = useState(false)


//   return (
//     <>
//       <div
//         className="App"

//       >
//         <div className="blur" style={{ top: "-18%", right: "0" }}></div>
//         <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

//         <Stack direction={'row'} flexWrap={'wrap'} sx={{ background: 'white', borderRadius: '48px' }} margin={'-10px 0'} >

//           <Stack className='chatwidth' flexGrow={0}>
//             <Chat setChat={setChat} user={currentUser} doe={setTog} />
//           </Stack>
//           <Stack display={{ sm: 'block', md: 'block', xs: 'block' }} flexGrow={2}>
//             {!tog && <div className='lay'>
//               <Chatlist selectedChats={chats} doe={setTog} />
//             </div>}
//           </Stack>


//         </Stack>

//       </div>

//     </>
//   )
// }


// const App = () => {
//   const { currentUser,loading } = useChatContext()

//   const ProtectedRoute = ({ children }) => {
//     if (!currentUser) {
//       return <Navigate to="/login" />;
//     }

//     return children
//   };


//   return (
//     <>
//       <Routes>
//         <Route path="/"

//           index
//           element={
//             <ProtectedRoute>
//               <Main />
//             </ProtectedRoute>
//           }
//         ></Route>

//         <Route path='/login' exact element={<Login />} />
//         <Route path='/register' exact element={<Register />} />

//       </Routes>

//     </>
//   )
// }

// export default App
import React, { useState } from 'react'
import Loader from './componenets/Loader'
import Chat from './componenets/Chat'
import Chatlist from './componenets/Chatlist'
import { Stack } from '@mui/material'
import Register from './componenets/Register'
import Login from './componenets/Login'
import './index.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useChatContext } from './context.js/AuthContext'

const Main = () => {
  const { currentUser } = useChatContext()
  const [chats, setChat] = useState()
  const [tog, setTog] = useState(false)

  return (
    <>
      <div className="App">
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          sx={{ background: "white", borderRadius: "48px" }}
          margin={"-10px 0"}
        >
          <Stack className="chatwidth" flexGrow={0}>
            <Chat setChat={setChat} user={currentUser} doe={setTog} />
          </Stack>
          <Stack display={{ sm: "block", md: "block", xs: "block" }} flexGrow={2}>
            {!tog && (
              <div className="lay">
                <Chatlist selectedChats={chats} doe={setTog} />
              </div>
            )}
          </Stack>
        </Stack>
      </div>
    </>
  )
}

const App = () => {
  const { currentUser, loading } = useChatContext()

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  if (loading) {
    // Render a loading indicator if the context is still loading
    return <div style={{backgroundColor:'black',display:'flex',height:'100vh',justifyContent:'center',}}><div className='mainlaoder' style={{width:'90px',  margin:'20% auto' }}><Loader/></div></div>
  }

  return (
    <>
      <Routes>
        <Route path="/"
          index
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        ></Route>

        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />

      </Routes>

    </>
  )
}
export default App;