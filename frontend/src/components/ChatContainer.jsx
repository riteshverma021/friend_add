import React ,{useEffect ,useRef }   from 'react'
import {chatStore} from "../store/userChatStore.js"
import { authStore } from "../store/useAuthStore.js"
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import  MessageSkeleton from "../components/skeltetons/MessageSkeleton.jsx"
import {formatMessageTime} from "../lib/utils.js"

const ChatContainer = () => {
const {messages , selectedUser , isMessagesLoading , getMessages ,unSubscribeFromMessage,subscribeToMessage } = chatStore();
const { authUser    } = authStore()
const messageRef = useRef()
useEffect(() => {
  
  getMessages(selectedUser._id)
  subscribeToMessage()
return ()=>unSubscribeFromMessage()
}, [getMessages , selectedUser._id , unSubscribeFromMessage ,subscribeToMessage]);

useEffect(() => {

  if(messageRef.current && messages){
    messageRef.current.scrollIntoView({behavior : "smooth"})
  }

  
}, [messages]);



if(isMessagesLoading) return(
  <div className='flex-1 flex flex-col overflow-auto' >
<ChatHeader/>
<MessageSkeleton/>
<MessageInput/>
  </div>
)

  return (
<div className='flex-1 flex flex-col overflow-auto'  > 
<ChatHeader/>
   

<div className='flex-1 overflow-y-auto p-4 space-y-4' >
  {messages.map((message)=>(
    <div  key={message._id}  className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} 
     
    ref={messageRef}
    
    >
<div className='chat-image avatar' >
<div className='size-10 rounded-full border '>
<img src={message.senderId === authUser._id ? authUser.profilePic || "./avatar.png" : selectedUser.profilePic || "./avatar" } alt="" />
</div>

  
</div>
 



<div className='chat-header mb-1' >
  <time className='text-xs opacity-50 ml-1' > {  formatMessageTime(message.createdAt)  } </time>
</div>
<div className='chat-bubble flex flex-col'  >
{message.image && (<img  src={message.image } alt='attachment' className='sm:max-w-[200px] rounded-md mb-2' />)}

{message.text &&  <p>{message.text}</p>   }
</div>

    </div>
  ))}

</div>



<MessageInput/>
    </div>
  )
}

export default ChatContainer