import React,{useState,useEffect} from 'react'
import './Chat.css'

import {Avatar,IconButton} from '@material-ui/core'
import SearchOutlined  from '@material-ui/icons/Search'
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert'
import { makeStyles } from "@material-ui/core/styles";
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
    const [profileimgage,setProfileimage]=useState("");
    const [clearToggle,setClearToggle]=useState(false);
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         '&.active, &:hover, &.active:hover':{
    //           color:"transparent",
    //          boxShadow:"none",
    //           border:"none",
    //           outline:"none"
    //       }
    //     },
    //     input: {
    //       display: "none"
    //     }
    //   }));


    //   const classes = useStyles();


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
     console.log("profileimage",profileimgage);
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

// db.collection('rooms').doc(roomId).collection("profile")
// .add({
//     userprofile :input,
   

// });


console.log("input data",input,user.displayName,firebase.firestore.FieldValue.serverTimestamp());
setInput("");
    }
   

//     const profilechangehandler =(e)=>{
//         const profileimg= e.target.files;
//         profileimg[0];
//         console.log("profileimg",profileimg);
//          db.collection('rooms').doc(roomId).collection("profile")
// .add({
//  userprofile :"hello",one minute ok bhai


// });
//     }

const clearMessageToggle =()=>{
    setClearToggle(!clearToggle);
}
const clearMessageHandler =(roomId)=>{
     db.collection("rooms").doc(roomId).collection("messages").onSnapshot((snapshot) => 
    snapshot.docs.map((doc) =>
    db.collection("rooms").doc(roomId).collection(`messages`).doc(doc.id).delete()
    
    
    ));

        
           
}
    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

            {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
<label htmlFor="icon-button-file"   >
   
    
<IconButton color="primary" aria-label="upload picture" component="span" style={{backgroundColor:"transparent",color:"white"}} ><Avatar /></IconButton> 

</label>
               */}
              
               <div className="chat__headerInfo">
                   <h3>{roomName}</h3>
                   {/* <p>Last Seen at {" "}
                   {new Date(
                      messages[messages.length -1] !=null ?  messages[messages.length -1].timestamp.toDate() :""
                   ).toLocaleTimeString()}
                    
                   </p> */}
                  
                   {/* <p>Last Seen at {" "}
                   {  messages[messages.length] > 0 ||  messages[messages.length -1] !=null && messages[messages.length -1].timestamp ? new Date(messages[messages.length -1].timestamp.toDate()).toLocaleTimeString : "hello"}
                    
                   </p> */}

                     <p>Last Seen at {" "}
                   {new Date(
                      messages[messages.length -1] !=null && messages[messages.length -1].timestamp !==null ?  messages[messages.length -1].timestamp.toDate() :""
                   ).toLocaleTimeString()}
                    
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
                              <MoreVert onClick={clearMessageToggle}/>
                          </IconButton>
                          {clearToggle ? <p onClick={()=>clearMessageHandler(roomId)}>clearChat</p>: ""}
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
