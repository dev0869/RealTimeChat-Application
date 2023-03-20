import React from 'react'
import { Stack } from '@mui/material'
import { useState } from 'react'
import { collection, query,  where,getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc, } from "firebase/firestore";
import { db } from '../Firebase';
import { useChatContext } from '../context.js/AuthContext';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle'; const Search = () => {
    const { currentUser } = useChatContext();
    const [username, setUserName] = useState();

    const [user, setUser] = useState(null);
    console.log(user)
    // const handleSearch = async () => {
    //     const q = query(

    //         collection(db, "Users"),
    //         where("displayName", "==", username)
       

    //     );
    //     try {
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             setUser(doc.data());
    //         });

    //     } catch (err) {
    //         console.log(err)
    //     };

    // };
    const handleSearch = async () => {
        
        const UppercaseUsername = username.toLowerCase(); // convert the input value to lowercase

        const q = query(
          collection(db, "Users"),
             where("displayName", "==", UppercaseUsername),
        );
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            setUser(docData);
          } else {
            setUser(null);
          }
        } catch (err) {
          console.log(err);
        };
      };
      

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) {
        }

        setUser(null);
        setUserName("")
    };

    return (
        <>
            <div className="search">

                <div className="bar">
                    <input className="searchbar" type="text" placeholder='Add New User' value={username} onKeyDown={handleKey} onChange={(e) => setUserName(e.target.value)} />

                    <PersonAddAltIcon style={{ fontSize: '25px', margin: '4px 16px', cursor: 'pointer', color: '#FB6828' }} onClick={() => handleSearch()} />

                </div>

                {user && <div className='ContactComponentS2' onClick={handleSelect} >
                    <Stack direction={'row'} alignItems={'center'} p={1} gap={1} justifyContent={'space-between'}>
                        <Stack direction={'row'} alignItems={'center'} gap={1}  >
                            <img src={user && user.photoURL} alt='img' className='userImg' />
                            <h2 className='user'>{user && user.displayName}</h2>



                        </Stack>
                        <AddCircleIcon style={{fontSize:'20px',color:'#63D52E'}} />

                    </Stack>
                    <hr /> </div>

                }


            </div>
        </>
    )
}

export default Search