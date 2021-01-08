import React,{useEffect,useState}from 'react'
import './SidebarChat.css'
import {useHistory} from 'react-router-dom';
import {Avatar,IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'


import db from '../../Firebase/Firebase';
 import storageRef from '../../Firebase/Firebase';
//import "firebase/storage";
import{Link} from 'react-router-dom';

import Modal from '../../Modal/Modal';
function SidebarChat({id,name,addNewChat}) {

const history=useHistory();
    const [seed ,setSeed]=useState("");
    const [messages,setMessages] = useState("");
   const [ID,setID] =useState(id);
    const [deleteAlert,setDeleteAlert] =useState(false);
    const [modalState, setModalState] = useState(false);
    const [modalId, setModalId] = useState();
    const [newRoom,setNewRoom]= useState("");
   
    const [displayProfileImg,setdisplayProfileImg]=useState(""); 
    const [profileImg, setProfileImg] = useState(null);
    //const storage =firebase.storage();
    
    const ModalCancelHandler = () => {
      setModalState(false);
      setModalId();
    };
  
    const modal1=()=>{
        setModalState(true);
        setModalId(true);
    }

    useEffect(()=>{
        if(id){

            db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc) =>doc.data()))
            );
        

            db.collection("rooms")
            .doc(id)
            .collection("profileimages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
            setdisplayProfileImg(snapshot.docs.map((doc) =>doc.data()))
            );

        }
    },[id]);
   
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    },[]);

    const createChat = (e) =>{
        const roomName= newRoom;

        if(roomName){
            db.collection("rooms").add({
                name : roomName,
            });
        }
        setModalState(false);
        setModalId(false);
      
          
            
       e.preventDefault();
        setNewRoom("");
    }

    const showDeleteRoom =()=>{
       const prevState = deleteAlert;
       setDeleteAlert(!prevState);
       console.log(deleteAlert);
       
    }

    const deleteRoom=(id)=>{

        console.log("history.location.pathname",history.location.pathname);
        console.log("roomidvalue",`rooms/${id}`);
     if(history.location.pathname !==`/rooms/${id}` )
     {
        db.collection("rooms").doc(id).delete();
 
     }
     else{
         alert("Cannot Delete Present Chat Room");
     }    
    }
  
   const closeHandler=()=>{
    setModalState(false);
    setModalId(false);
   }
    return !addNewChat ? ( 

        
       <div className="sidebar_wrapper">
           <div className="sidebar_roomName">
           <Link to={`/rooms/${id}`} >
                <div className="sidebarChat" > 
                <Avatar src={displayProfileImg[0] !== null && displayProfileImg[0] !== undefined ? displayProfileImg[0].ProfileImg : ""} />
              
                <div className="sidebarChat__info">
                    <h2>{name.length <17 ? name : name.substring(0,17)+"..."}</h2>
              

<div className="sidebarChat__infoDetails">
                  <h1>{messages[0] !==undefined && messages[0] !== null ?messages[0].message.length <15 ? messages[0].message : messages[0].message.substring(0,14)+"...." :""}</h1> 

                    <p>{messages[0] !==undefined && 
                    messages[0] !== null && 
                    messages[0].timestamp !==null ?
                     new Date(messages[0].timestamp.toDate()).toLocaleTimeString() 
                     :""}</p>
                  </div>

                    
                </div>

                
                </div>
               
        </Link>

           </div>
  
      <div className="sidebar_delete">
      <IconButton>
            <MoreVertIcon />
        </IconButton>
      
         
       
       
      </div>
      
       </div>

        
      
    
    ) : (
        <div>
        <div onClick={modal1}
        className="sidebarChat">
           <h2>Add New Chat</h2> 
        </div>
        <Modal show={modalState} modalClosed={ModalCancelHandler}>
            <form  onSubmit={createChat} className="sidebar__addroom">
                <p onClick={closeHandler}>&times;</p>
                <h1>Add NewChat Room</h1>
                <div className="forminput">
                    <label>Room Name:</label>
                    <input type="text" value={newRoom}  onChange={(e)=>setNewRoom(e.target.value)} />
                   
                </div>
                
                <button >Add New Room</button>
            </form>
        </Modal>
        </div>
    );
}

export default SidebarChat;
