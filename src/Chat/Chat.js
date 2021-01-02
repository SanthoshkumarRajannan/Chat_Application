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
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';
const Chat = () => {

    const [seed ,setSeed]=useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] =useState([]);
    const [{user},dispatch] =useStateValue();

    useEffect (()=>{
        if(roomId){
        
            db.collection("rooms").doc(roomId).
            onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name));
                

            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc) =>doc.data()))
            );
        }
        
        

   
    },[roomId]);

    console.log("messages",messages);
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    },[roomId]);

    const sendMessage =(e)=> {
e.preventDefault();
console.log("you typed",input);

db.collection('rooms').doc(roomId).collection("messages")
.add({
    message :input,
    name : user.displayName,
    timestamp : firebase.firestore.FieldValue.serverTimestamp(),

});
console.log("input data",input,user.displayName,firebase.firestore.FieldValue.serverTimestamp());
setInput("");
    }
   
    return (
        <div className="chat">
            <div className="chat__header">
              <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
               <div className="chat__headerInfo">
                   <h3>{roomName}</h3>
                   {/* <p>Last Seen at {" "}
                   {new Date(
                       messages[messages.length -1]?.timestamp?.toDate()
                   ).toLocaleTimeString()}
                    
                   </p> */}
                   {/* <p>
                       last seen at{" "}
                       { (messages.timestamp !==null && messages.length != null ) &&  new Date(messages[0].timestamp.toDate()).toLocaleTimeString()}
                   </p> */}
                  
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
               </div>
            </div>

            <div className="chat__body">
                {messages.map((message) =>(
             
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
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
