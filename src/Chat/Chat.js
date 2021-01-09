import React,{useState,useEffect} from 'react'
import './Chat.css'

import {Avatar,IconButton} from '@material-ui/core'
import SearchOutlined  from '@material-ui/icons/Search'
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert'

import InsertEmoticonIcon  from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
 

import {useParams} from 'react-router-dom';


import db from '../Firebase/Firebase';
import Modal from '../Modal/Modal';

import {storageRef} from  '../Firebase/Firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';
const Chat = () => {

    const [input, setInput] = useState("");
    const {roomId} = useParams();

    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] =useState([]);
    const [{user},dispatch] =useStateValue();
   
    const [displayProfileImg,setdisplayProfileImg]=useState("");
    
    const [profileImg, setProfileImg] = useState(null);
    const [error, setError] = useState("");
    const types = ["image/png", "image/jpeg"];

    const [modalState, setModalState] = useState(false);
    const [modalId, setModalId] = useState();

    const[disableupload,setDisableUpload] =useState(true);
    const isAuthdata=localStorage.getItem("Authdata");
    const Auth=isAuthdata.split(",");

    useEffect (()=>{
        if(roomId){
            db.collection("rooms").doc(roomId)
            .onSnapshot((snapshot) => 
            setRoomName(snapshot.data().name));
    

            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc) =>doc.data()))
            );

            db.collection("rooms")
            .doc(roomId)
            .collection("profileimages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
            setdisplayProfileImg(snapshot.docs.map((doc) =>doc.data()))
            );
        }   
    },[roomId]);

    const ModalCancelHandler = () => {
        setModalState(false);
        setModalId();
      };
    
      const modal1=()=>{
          setModalState(true);
          setModalId(true);
      }


    const sendMessage =(e)=> {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection("messages")
            .add({
                message :input,
                name : user != null ? user.displayName : Auth[1],
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            });
        setInput("");
    }

    const clearMessageHandler =(roomId)=>{

       db.collection("rooms").doc(roomId).collection("messages").get()
       .then(res =>{
           res.forEach(element =>{
               element.ref.delete();
           });
       });          
    }


    const profileImgHandler = (e) => {
    let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
        setProfileImg(selectedFile);
        setError("");
        setDisableUpload(false);

        } else {
        setProfileImg(null);
        setError("Please select the valid image type png or jpeg");
        alert("Please select the valid image type png or jpeg");
        setDisableUpload(true);
        }
        if(selectedFile ===null){
            setDisableUpload(true);
        }
    };

    const addProfile =(e)=>{

    setModalState(false);
    setModalId(false);
    e.preventDefault();
    const userImage = profileImg;
    const uploadTask=storageRef.child(`user-images/${userImage.name}`).put(userImage);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          setError(err.message);
        },
        () => {
        
          storageRef.child(`user-images/${profileImg.name}`)
            .getDownloadURL()
            .then((url) => {
                db.collection('rooms').doc(roomId).collection("profileimages")
                        .add({
                            ProfileImg: url,
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                          })
            .then(() => { 
                setProfileImg("");
                setError("");
                  document.getElementById("file").value = "";
                })
            .catch((err) => 
                setError(err.message));
            });
        }
      );
    }

    const removeProfileHandler =(roomId)=>{
        db.collection("rooms").doc(roomId).collection("profileimages").get()
        .then(res =>{
            res.forEach(element =>{
                element.ref.delete();
            });
        });
        setModalState(false);
        setModalId(false);  
    }
    
    const closeHandler =()=>{
        setModalState(false);
        setModalId(false); 
    }
    return (
        <div className="chat">
            <div className="chat__header">
            
                <Avatar src={displayProfileImg[0] !== null && displayProfileImg[0] !== undefined 
                        ? displayProfileImg[0].ProfileImg : ""} 
                        onClick={modal1} 
                        style={{cursor:"pointer"}}
                    />
           
                <Modal show={modalState} modalClosed={ModalCancelHandler} >
                    <form onSubmit={addProfile} className="profilemodal"> 
                    <p onClick={closeHandler}>&times;</p>
                        <img  src={displayProfileImg[0] !== null && displayProfileImg[0] !== undefined ? displayProfileImg[0].ProfileImg : ""} alt="" />
                        <br /> 
                        <input placeholder="none" type="file"   id="file" onChange={profileImgHandler} />
                        <button  disabled={disableupload}>Upload</button>           
                    </form>
                    <button onClick={()=>removeProfileHandler(roomId)} className="removeprofile">Remove Profile</button>
                </Modal>
                <div className="chat__headerInfo" >
                    <h3>{roomName}</h3>
                    <p>Last Seen at {" "}
                        {messages[messages.length -1] !=null && messages[messages.length -1].timestamp !==null ? 
                            new Date( messages[messages.length -1].timestamp.toDate()).toLocaleTimeString():"00.00.00 AM"}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>

                    <IconButton>
                        <AttachFile />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    <p onClick={()=>clearMessageHandler(roomId)}>clearChat</p>        
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) =>(
                    <p className={`chat__message ${message.name === (user !==null ? user.displayName : Auth[1]) && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                       {message.message}
                        <span className="chat__timestamp">
                            { message.timestamp !==null && new Date(message.timestamp.toDate()).toLocaleTimeString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                     value={input}
                     onChange={(e)=>setInput(e.target.value)}
                     type="text" />
                    <button onClick={sendMessage}
                    type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
            
        </div>
    )
}

export default Chat
