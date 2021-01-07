import React,{useState,useEffect} from 'react';
import './Sidebar.css';


import db from '../Firebase/Firebase';
import SidebarChat from './SidebarChat/SidebarChat';
import { useStateValue } from '../StateProvider';

import {Avatar,IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons';


const Sidebar = () => {
    const [count,setCount]=useState(0);
    const [{user},dispatch] = useStateValue();
    const [rooms,setRooms] = useState([]);

    const [toogleLogout,setToggleLogout]=useState(false);
    const isAuthdata= localStorage.getItem("Authdata");
   const Auth=isAuthdata.split(",");

useEffect(()=>{
      db.collection("rooms").onSnapshot((snapshot)=>
            setRooms(snapshot.docs.map((doc) =>({
                    id : doc.id,
                    data :doc.data(),
                }))
                )
        );
        
  },[count])

 const logOutToggleHandler =()=>{
      setToggleLogout(!toogleLogout);
      setCount(prevState=>prevState+1);
      console.log("count",count);
      
  }

 const logoutHandler =()=>{
     localStorage.setItem("Authdata","");
     window.location.reload(false);
 }
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                {/* <Avatar src={user !== null ? user.photoURL : isAuthdata[0].photoURL }/> */}
                
                <Avatar className="profile" src={ user !=null ? user.photoURL : Auth[0]} alt=""  onClick={logOutToggleHandler} />
                {toogleLogout ?
             <p onMouseOut={()=>setToggleLogout(false)}
             onClick={logoutHandler}>
                 LOGOUT
                 </p>
                  :""}
                <div className="sidebar__headerRight">
                    <IconButton>
                    <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                    <ChatIcon />
                    </IconButton>

                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                  
                    
                    
                </div>
               
                
              
            </div>
            <div className="sidebar__logout">
           
            </div>
            <div className="sidebar__search">
                  <div className="sidebar__searchContainer">
                      <SearchOutlined />
                      <input placeholder="Search chat Room" type="text" />
                  </div>
            </div>
            <div className="sidebar__chats">
               <SidebarChat addNewChat/>
               {rooms.map((room) => (
                   <SidebarChat  key={room.id} id={room.id} name={room.data.name}/>
               ))}
            </div>

        </div>
    )
}

export default Sidebar;
