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
  
    const [{user},dispatch] = useStateValue();
    const [rooms,setRooms] = useState([]);

    // const isAuthdata= localStorage.getItem("Authdata");
    // const Auth=isAuthdata.split(",");
  
    const [searchRoom,setSearchRoom]=useState("");

    useEffect(()=>{
    
        db.collection("rooms")
        .orderBy("name","asc")
        .onSnapshot((snapshot)=>
        setRooms(snapshot.docs.map((doc) =>({
                id : doc.id,
                data :doc.data(),
            }))
            )
        );      
    },[]);

    const logoutHandler =()=>{
        localStorage.setItem("Authdata","");
        window.location.reload(false);
    }


    let userlist =rooms;
        userlist = !searchRoom
        ? rooms
        : rooms.filter((room) =>
            room.data.name.toLowerCase().includes(searchRoom.toLocaleLowerCase())   
    );

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar className="profile" src={  user.photoURL } alt=""   />
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
                    <button  className="logoutButton" onClick={logoutHandler}>
                      LOGOUT
                    </button>

                </div> 
            </div>

            <div className="sidebar__search">
                  <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search chat Room" type="text" 
                        value={searchRoom} 
                        onChange={(e)=>setSearchRoom(e.target.value)} 
                    />
                  </div>
            </div>
            <div className="sidebar__chats">
               <SidebarChat addNewChat/>
               { userlist.map((room) => (
                   <SidebarChat  key={room.id} id={room.id} name={room.data.name}/>
               ))}
            </div>

        </div>
    )
}

export default Sidebar;
