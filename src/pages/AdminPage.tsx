import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, User, MessageSquare, Settings, Image, Trash, RefreshCw, Upload, LogOut, AlertCircle, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { markMessageAsRead, moveMessageToTrash, restoreMessage, deleteMessagePermanently } from '../services/messageService';
import { getPortfolioItems, deletePortfolioItem, addPortfolioItem } from '../services/galleryService';
import { useMessages } from '../context/MessageContext';
 
 

export  default function AdminPage() {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useRequireAuth();
  const { logout } = useAuth();
  const { messages, trashedMessages, loading: messagesLoading, refreshMessages } = useMessages();
  const [activeTab, setActiveTab] = useState('messages');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Portfolio items state
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  
  // New portfolio item state
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'wedding',
    client: '',
    description: ''
  });
  
  // Form for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Account settings data
  const [settings, setSettings] = useState({
    email: 'nshutifidele1@gmail.com',
    phone: '250796329073',
    address: 'Rwanda, Rubavu District',
  });
  
  // Calculate unread messages count
  useEffect(() => {
    const unreadMessages = messages.filter(message => !message.isRead).length;
    setUnreadCount(unreadMessages);
  }, [messages]);
  
  // Fetch portfolio items from Firebase
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const items = await getPortfolioItems();
        setPortfolioItems(items);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPortfolioItems();
  }, []);
 
  
  // Function to handle message selection
  const handleSelectMessage = async (message: any) => {
    setSelectedMessage(message);
    // Mark as read if not already read
    if (!message.isRead) {
      try {
        await markMessageAsRead(message.id);
        // Refresh messages to get updated state
        refreshMessages();
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };
  
  // Function to handle message deletion (moves to trash)
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await moveMessageToTrash(messageId);
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null);
      }
      // Refresh messages to get updated state
      refreshMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  
  // Function to restore message from trash
  const handleRestoreMessage = async (messageId: string) => {
    try {
      await restoreMessage(messageId);
      // Refresh messages to get updated state
      refreshMessages();
    } catch (error) {
      console.error('Error restoring message:', error);
    }
  };
  
  // Function to permanently delete message
  const handlePermanentDelete = async (messageId: string) => {
    try {
      await deleteMessagePermanently(messageId);
      // Refresh messages to get updated state
      refreshMessages();
    } catch (error) {
      console.error('Error permanently deleting message:', error);
    }
  };
  
  // Function to handle portfolio item deletion
  const handleDeletePortfolioItem = async (itemId: string, imageUrl: string) => {
    try {
      await deletePortfolioItem(itemId, imageUrl);
      setPortfolioItems(portfolioItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
    }
  };
  
  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  
  // Handle new portfolio item input change
  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle new portfolio item submission
  const handleAddPortfolioItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image file');
      return;
    }
    
    try {
      setIsLoading(true);
      const addedItem = await addPortfolioItem(newItem, selectedFile);
      
      setPortfolioItems([...portfolioItems, addedItem]);
      
      // Reset form
      setNewItem({
        title: '',
        category: 'wedding',
        client: '',
        description: ''
      });
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error adding portfolio item:', error);
      alert('Failed to add portfolio item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      // Clear local auth token
      localStorage.removeItem('konkora_admin_auth');
      
      // Also attempt Firebase logout
      await logout().catch(err => console.log('Firebase logout error:', err));
      
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  // Settings update handler
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };
  
  // Simulate "authentication check"
  useEffect(() => {
    // In a real app, check authentication status
    // For demo purposes, we'll just assume logged in
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-indigo-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className="flex items-center justify-between p-4 border-b border-indigo-800">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-indigo-300" />
              {isSidebarOpen && <span className="ml-2 font-bold text-xl">Konkora</span>}
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded-md bg-indigo-800 text-indigo-200 hover:bg-indigo-700"
            >
              {isSidebarOpen ? '<' : '>'}
            </button>
          </div>
          
          <nav className="mt-6">
            <div 
              className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'messages' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare className="h-5 w-5" />
              {isSidebarOpen && (
                <div className="flex-1 flex items-center">
                  <span className="ml-3">Messages</span>
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </div>
              )}
              {!isSidebarOpen && unreadCount > 0 && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 w-2 h-2 rounded-full"></span>
              )}
            </div>
            
            <div 
              className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'gallery' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
              onClick={() => setActiveTab('gallery')}
            >
              <Image className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-3">Gallery</span>}
            </div>
            
            <div 
              className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'trash' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
              onClick={() => setActiveTab('trash')}
            >
              <Trash className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-3">Trash</span>}
            </div>
            
            <div 
              className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'settings' ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-3">Settings</span>}
            </div>
          </nav>
          
          <div className="absolute bottom-0 w-full p-4 border-t border-indigo-800">
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center w-full hover:text-indigo-300 transition-colors"
              >
                <User className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Back to Site</span>}
              </button>
              
              <button 
                onClick={handleLogout} 
                className="flex items-center w-full hover:text-indigo-300 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">Logout</span>}
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Messages</h1>
                <button 
                  onClick={refreshMessages}
                  className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
              
              {messagesLoading ? (
                <div className="flex justify-center items-center py-20">
                  <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
                  <span className="ml-2 text-gray-600">Loading messages...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No messages</h3>
                  <p className="mt-1 text-gray-500">There are no messages to display.</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-180px)]">
                    {/* Message list */}
                    <div className="border-r border-gray-200 overflow-y-auto">
                      <div className="sticky top-0 bg-gray-50 px-4 py-3 border-b">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-700">Inbox</h3>
                          {unreadCount > 0 && (
                            <div className="flex items-center text-indigo-600 text-sm">
                              <Bell className="h-4 w-4 mr-1" />
                              {unreadCount} unread
                            </div>
                          )}
                        </div>
                      </div>
                      <ul className="divide-y divide-gray-200">
                        {messages.map((message) => (
                          <li 
                            key={message.id}
                            className={`cursor-pointer ${
                              selectedMessage?.id === message.id 
                                ? 'bg-indigo-50' 
                                : !message.isRead 
                                ? 'bg-blue-50 hover:bg-blue-100' 
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handleSelectMessage(message)}
                          >
                            <div className="px-4 py-4 sm:px-6 relative">
                              {!message.isRead && (
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 bg-indigo-600 rounded-full"></span>
                              )}
                              <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium ${message.isRead ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                                  {message.name}
                                </p>
                                <div className="flex">
                                  <p className="text-xs text-gray-500">
                                    {new Date(message.date).toLocaleDateString()}
                                  </p>
                                  <button 
                                    className="p-1 text-gray-600 hover:text-red-600 ml-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteMessage(message.id);
                                    }}
                                    title="Delete"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-600 truncate">{message.subject}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Message detail */}
                    <div className="col-span-2 overflow-y-auto p-6">
                      {selectedMessage ? (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                            <div className="space-x-2">
                              <button
                                onClick={() => {
                                  window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                                }}
                                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
                                title="Reply via email"
                              >
                                Reply
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(selectedMessage.id)}
                                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                                title="Delete"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex flex-wrap items-center text-sm text-gray-600">
                              <div className="mr-6 mb-2">
                                <span className="font-semibold text-gray-700">From:</span>
                                <span className="ml-2">{selectedMessage.name} &lt;{selectedMessage.email}&gt;</span>
                              </div>
                              {selectedMessage.phone && (
                                <div className="mr-6 mb-2">
                                  <span className="font-semibold text-gray-700">Phone:</span>
                                  <span className="ml-2">{selectedMessage.phone}</span>
                                </div>
                              )}
                              <div className="mr-6 mb-2">
                                <span className="font-semibold text-gray-700">Date:</span>
                                <span className="ml-2">{new Date(selectedMessage.date).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="prose max-w-none bg-white p-4 rounded-lg border border-gray-100">
                            <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                          </div>
                          
                          <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between">
                            <button 
                              onClick={() => {
                                window.location.href = `tel:${selectedMessage.phone}`;
                              }}
                              className={`px-4 py-2 rounded-md ${selectedMessage.phone ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                              disabled={!selectedMessage.phone}
                            >
                              Call
                            </button>
                            <button
                              onClick={() => {
                                window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                              }}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                              Reply via Email
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-lg text-gray-600 mb-2">Select a message to view details</p>
                            <p className="text-sm text-gray-500">
                              You have {messages.length} message{messages.length !== 1 ? 's' : ''} in your inbox
                              {unreadCount > 0 && `, including ${unreadCount} unread`}.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gallery Management</h1>
                             <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('upload-modal')?.classList.remove('hidden')}
              >
                <Upload className="h-5 w-5 mr-2" />
                Add Portfolio Item
              </button>
              
              {/* Upload Modal */}
              <div id="upload-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4">Add New Portfolio Item</h3>
                  
                  <form onSubmit={handleAddPortfolioItem}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={newItem.title}
                          onChange={handleNewItemChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={newItem.category}
                          onChange={handleNewItemChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="wedding">Wedding Invitation</option>
                          <option value="birthday">Birthday Card</option>
                          <option value="website">Website</option>
                          <option value="prototype">Prototype</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                          Client (optional)
                        </label>
                        <input
                          type="text"
                          id="client"
                          name="client"
                          value={newItem.client}
                          onChange={handleNewItemChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={newItem.description}
                          onChange={handleNewItemChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={3}
                          required
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                          Upload Image
                        </label>
                        <input 
                          type="file" 
                          id="file-upload" 
                          className="w-full" 
                          accept="image/*"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={() => document.getElementById('upload-modal')?.classList.add('hidden')}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                          </span>
                        ) : (
                          'Add Item'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
 
              </div>
              
              {isLoading && (
                <div className="text-center py-4">
                  <RefreshCw className="h-8 w-8 text-indigo-600 mx-auto animate-spin" />
                  <p className="mt-2 text-gray-600">Uploading image...</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow">
                    <div className="relative h-48">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleDeletePortfolioItem(item.id)}
                        className="absolute top-2 right-2 bg-white bg-opacity-70 p-1.5 rounded-full text-red-500 hover:text-red-700"
                        title="Delete item"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                      <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-800">
                        Edit Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Trash Tab */}
          {activeTab === 'trash' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">Trash</h1>
              
              {trashedMessages.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                  <Trash className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Trash is empty</h3>
                  <p className="mt-1 text-gray-500">There are no items in the trash.</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {trashedMessages.map((message) => (
                      <li key={message.id} className="hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{message.name}</p>
                            <p className="text-sm text-gray-600">{message.subject}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(message.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRestoreMessage(message.id)}
                              className="p-1.5 bg-gray-100 rounded-md text-green-600 hover:bg-gray-200"
                              title="Restore"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handlePermanentDelete(message.id)}
                              className="p-1.5 bg-gray-100 rounded-md text-red-600 hover:bg-gray-200"
                              title="Delete permanently"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={settings.email}
                        onChange={handleSettingsChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border px-3 py-2"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={settings.phone}
                        onChange={handleSettingsChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border px-3 py-2"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={settings.address}
                        onChange={handleSettingsChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border px-3 py-2"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <h2 className="text-lg font-medium mb-4">Password</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border px-3 py-2"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border px-3 py-2"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border px-3 py-2"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 