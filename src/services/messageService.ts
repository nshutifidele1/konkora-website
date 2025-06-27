import  { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export type Message = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: Date | Timestamp;
  isRead: boolean;
  isDeleted: boolean;
};

// Send a new message
export const sendMessage = async (messageData: Omit<Message, 'id' | 'createdAt' | 'isRead' | 'isDeleted'>) => {
  try {
    // Try to add to Firestore
    try {
      const messagesRef = collection(db, 'messages');
      const newMessage = {
        ...messageData,
        createdAt: serverTimestamp(),
        isRead: false,
        isDeleted: false
      };
      
      const docRef = await addDoc(messagesRef, newMessage);
      return { id: docRef.id, ...newMessage };
    } catch (firestoreError) {
      console.warn('Firestore error, falling back to REST API:', firestoreError);
      
      // Fallback to REST API through proxy
      const newMessage = {
        ...messageData,
        createdAt: new Date().toISOString(),
        isRead: false,
        isDeleted: false
      };
      
      const response = await fetch('https://hooks.jdoodle.net/proxy?url=https://konkora-database.firebaseio.com/messages.json', {
        method: 'POST',
        body: JSON.stringify(newMessage)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { id: data.name, ...newMessage };
    }
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Fallback to localStorage
    try {
      const newMessage = {
        ...messageData,
        id: `local_${Date.now()}`,
        createdAt: new Date().toISOString(),
        isRead: false,
        isDeleted: false
      };
      
      // Get existing messages or initialize empty array
      const existingMessages = JSON.parse(localStorage.getItem('konkora_messages') || '[]');
      
      // Add the new message
      localStorage.setItem('konkora_messages', JSON.stringify([...existingMessages, newMessage]));
      
      return newMessage;
    } catch (localStorageError) {
      console.error('Even localStorage fallback failed:', localStorageError);
      throw error;
    }
  }
};

//  Get active messages (not deleted)
export const getActiveMessages = async () => {
  try {
    // Try to get messages from Firestore
    try {
      const messagesQuery = query(
        collection(db, 'messages'), 
        where('isDeleted', '==', false)
      );
      
      const querySnapshot = await getDocs(messagesQuery);
      const messages: any[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          date: data.createdAt instanceof Timestamp 
            ? data.createdAt.toDate().toISOString() 
            : new Date(data.createdAt).toISOString(),
          createdAt: data.createdAt instanceof Timestamp 
            ? data.createdAt.toDate() 
            : new Date(data.createdAt)
        });
      });
      
      // Sort messages by date (newest first)
      return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (firestoreError) {
      console.warn('Firestore error, falling back to REST API:', firestoreError);
      
      // Fallback to REST API through proxy
      const response = await fetch('https://hooks.jdoodle.net/proxy?url=https://konkora-database.firebaseio.com/messages.json', {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() || {};
      const messages = [];
      
      for (const key in data) {
        if (data[key] && !data[key].isDeleted) {
          const createdAt = new Date(data[key].createdAt);
          messages.push({
            id: key,
            ...data[key],
            date: createdAt.toISOString(),
            createdAt: createdAt
          });
        }
      }
      
      // Sort messages by date (newest first)
      return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  } catch (error) {
    console.error('Error getting messages:', error);
    
    // Fallback to localStorage
    try {
      const localMessages = JSON.parse(localStorage.getItem('konkora_messages') || '[]');
      const formattedMessages = localMessages
        .filter((msg: any) => !msg.isDeleted)
        .map((msg: any) => {
          const createdAt = new Date(msg.createdAt);
          return {
            ...msg,
            date: createdAt.toISOString(),
            createdAt: createdAt
          };
        });
      
      // Sort messages by date (newest first)
      return formattedMessages.sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (localStorageError) {
      console.error('Even localStorage fallback failed:', localStorageError);
      
      // Return empty array as last resort
      return [];
    }
  }
};

// Get deleted messages (in trash)
export const getDeletedMessages = async () => {
  try {
    // Try to get messages from Firestore
    try {
      const messagesQuery = query(
        collection(db, 'messages'), 
        where('isDeleted', '==', true)
      );
      
      const querySnapshot = await getDocs(messagesQuery);
      const messages: any[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate() 
          : new Date(data.createdAt);
          
        messages.push({
          id: doc.id,
          ...data,
          date: createdAt.toISOString(),
          createdAt: createdAt
        });
      });
      
      // Sort messages by date (newest first)
      return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (firestoreError) {
      console.warn('Firestore error, falling back to REST API:', firestoreError);
      
      // Fallback to REST API through proxy
      const response = await fetch('https://hooks.jdoodle.net/proxy?url=https://konkora-database.firebaseio.com/messages.json', {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() || {};
      const messages = [];
      
      for (const key in data) {
        if (data[key] && data[key].isDeleted) {
          const createdAt = new Date(data[key].createdAt);
          messages.push({
            id: key,
            ...data[key],
            date: createdAt.toISOString(),
            createdAt: createdAt
          });
        }
      }
      
      // Sort messages by date (newest first)
      return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  } catch (error) {
    console.error('Error getting deleted messages:', error);
    
    // Fallback to localStorage
    try {
      const localMessages = JSON.parse(localStorage.getItem('konkora_messages') || '[]');
      const formattedMessages = localMessages
        .filter((msg: any) => msg.isDeleted)
        .map((msg: any) => {
          const createdAt = new Date(msg.createdAt);
          return {
            ...msg,
            date: createdAt.toISOString(),
            createdAt: createdAt
          };
        });
      
      // Sort messages by date (newest first)
      return formattedMessages.sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (localStorageError) {
      console.error('Even localStorage fallback failed:', localStorageError);
      return [];
    }
  }
};

// Mark message as read
export const markMessageAsRead = async (messageId: string) => {
  try {
    // Try to update in Firestore
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        isRead: true
      });
      return true;
    } catch (firestoreError) {
      console.warn('Firestore error, falling back to REST API:', firestoreError);
      
      // Fallback to REST API through proxy
      const response = await fetch(`https://hooks.jdoodle.net/proxy?url=https://konkora-database.firebaseio.com/messages/${messageId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ isRead: true })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    }
  } catch (error) {
    console.error('Error marking message as read:', error);
    
    // Fallback to localStorage
    try {
      const messages = JSON.parse(localStorage.getItem('konkora_messages') || '[]');
      const updatedMessages = messages.map((msg: any) => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      );
      
      localStorage.setItem('konkora_messages', JSON.stringify(updatedMessages));
      return true;
    } catch (localStorageError) {
      console.error('Even localStorage fallback failed:', localStorageError);
      throw error;
    }
  }
};

// Move message to trash
export const moveMessageToTrash = async (messageId: string) => {
  try {
    // Try to update in Firestore
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        isDeleted: true
      });
      return true;
    } catch (firestoreError) {
      console.warn('Firestore error, falling back to REST API:', firestoreError);
      
      // Fallback to REST API through proxy
      const response = await fetch(`https://hooks.jdoodle.net/proxy?url=https://konkora-database.firebaseio.com/messages/${messageId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ isDeleted: true })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    }
  } catch (error) {
    console.error('Error moving message to trash:', error);
    
    // Fallback to localStorage
    try {
      const messages = JSON.parse(localStorage.getItem('konkora_messages') || '[]');
      const updatedMessages = messages.map((msg: any) => 
        msg.id === messageId ? { ...msg, isDeleted: true } : msg
      );
      
      localStorage.setItem('konkora_messages', JSON.stringify(updatedMessages));
      return true;
    } catch (localStorageError) {
      console.error('Even localStorage fallback failed:', localStorageError);
      throw error;
    }
  }
};

// Restore message from trash
export const restoreMessage = async (messageId: string) => {
  try {
    // Try to update in Firestore
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        isDeleted: false
      });
      return true;
    } catch (firestoreError) {
      console.warn('Firestore error, falling back to REST API:', firestoreError);
      
      // Fallback to REST API through proxy
      const response = await fetch(`https://hooks.jdoodle.net/proxy?url=https://konkora-database.firebaseio.com/messages/${messageId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ isDeleted: false })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    }
  } catch (error) {
    console.error('Error restoring message:', error);
    
    // Fallback to localStorage
    try {
      const messages = JSON.parse(localStorage.getItem('konkora_messages') || '[]');
      const updatedMessages = messages.map((msg: any) => 
        msg.id === messageId ? { ...msg, isDeleted: false } : msg
      );
      
      localStorage.setItem('konkora_messages', JSON.stringify(updatedMessages));
      return true;
    } catch (localStorageError) {
      console.error('Even localStorage fallback failed:', localStorageError);
      throw error;
    }
  }
};

// Delete message permanently
export const deleteMessagePermanently = async (messageId: string) => {
  try {
    // Try to delete from Firestore
    try {
      const messageRef = doc(db, 'messages', messageId);
      await deleteDoc(messageRef);
      return true;
    } catch (firestoreError) {
      console.warn('Firestore error, falling back to REST API:', firestoreError);
      
      // Fallback to REST API through proxy
      const response = await fetch(`https://hooks.jdoodle.net/proxy?url=https://konkora-database.firebaseio.com/messages/${messageId}.json`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    }
  } catch (error) {
    console.error('Error deleting message permanently:', error);
    
    // Fallback to localStorage
    try {
      const messages = JSON.parse(localStorage.getItem('konkora_messages') || '[]');
      const updatedMessages = messages.filter((msg: any) => msg.id !== messageId);
      
      localStorage.setItem('konkora_messages', JSON.stringify(updatedMessages));
      return true;
    } catch (localStorageError) {
      console.error('Even localStorage fallback failed:', localStorageError);
      throw error;
    }
  }
};
 