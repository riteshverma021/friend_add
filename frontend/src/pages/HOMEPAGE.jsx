import React , {useEffect}  from 'react'
import { chatStore } from '../store/userChatStore'
import NoChatSelected from '../components/NoChatSelected.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import Sidebar from '../components/Sidebar.jsx';
const HOMEPAGE = () => {
  const {selectedUser } = chatStore()


  return (
    <div className="h-screen bg-base-200">
    <div className="flex items-center justify-center pt-20 px-4">
      <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar/>
         
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
   
        </div>
      </div>
    </div>
  </div>
);
};
  

export default HOMEPAGE