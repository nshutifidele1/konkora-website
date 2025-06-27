import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getActiveMessages, getDeletedMessages } from '../services/messageService';

// Define the message context type
type MessageContextType = {
  messages: any[];
  trashedMessages: any[];
  loading: boolean;
  error: string | null;
  refreshMessages: () => Promise<void>;
};

// Create the message context
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Custom hook to use the message context
export function useMessages() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
}

// Message provider component
type MessageProviderProps = {
  children: ReactNode;
};

export function MessageProvider({ children }: MessageProviderProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [trashedMessages, setTrashedMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch active messages
      const activeMessages = await getActiveMessages();
      setMessages(activeMessages);
      
      // Fetch deleted messages
      const deletedMessages = await getDeletedMessages();
      setTrashedMessages(deletedMessages);
      
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const value = {
    messages,
    trashedMessages,
    loading,
    error,
    refreshMessages: fetchMessages
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
}
 