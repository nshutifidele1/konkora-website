import  { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';

// Get all portfolio items
export const getPortfolioItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'portfolio'));
    const items = [];
    
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return items;
  } catch (error) {
    console.error('Error getting portfolio items:', error);
    
    // Fallback to localStorage
    try {
      return JSON.parse(localStorage.getItem('konkora_portfolio_items') || '[]');
    } catch (e) {
      return [];
    }
  }
};

// Add new portfolio item
export const addPortfolioItem = async (
  itemData: {
    title: string;
    category: string;
    client?: string;
    description: string;
  }, 
  imageFile: File
) => {
  try {
    // First, upload the image to Firebase Storage
    const storageRef = ref(storage, `portfolio/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);
    
    // Then, save the item data with the image URL to Firestore
    const portfolioRef = collection(db, 'portfolio');
    const newItem = {
      ...itemData,
      image: imageUrl,
      imagePath: snapshot.ref.fullPath,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(portfolioRef, newItem);
    
    // Return the new item with its ID
    return {
      id: docRef.id,
      ...newItem
    };
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    
    // Fallback to localStorage
    try {
      const id = `local_${Date.now()}`;
      
      // Convert file to data URL for local storage
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const newItem = {
              id,
              ...itemData,
              image: reader.result as string,
              createdAt: new Date()
            };
            
            // Get existing items or initialize empty array
            const existingItems = JSON.parse(localStorage.getItem('konkora_portfolio_items') || '[]');
            
            // Save updated items
            localStorage.setItem('konkora_portfolio_items', JSON.stringify([...existingItems, newItem]));
            
            resolve(newItem);
          } catch (e) {
            reject(e);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    } catch (e) {
      throw new Error('Failed to add portfolio item to local storage');
    }
  }
};

// Delete portfolio item
export const deletePortfolioItem = async (itemId: string, imageUrl?: string) => {
  try {
    // Get the reference to the portfolio item
    const itemRef = doc(db, 'portfolio', itemId);
    
    // If the image URL is provided, delete the image from Storage
    if (imageUrl && imageUrl.includes('firebase')) {
      try {
        // Extract the path from the URL
        const urlObj = new URL(imageUrl);
        const pathWithToken = urlObj.pathname.split('/o/')[1];
        const path = decodeURIComponent(pathWithToken.split('?')[0]);
        
        // Delete the image from Storage
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
      } catch (imageError) {
        console.error('Error deleting image from storage:', imageError);
      }
    }
    
    // Delete the document from Firestore
    await deleteDoc(itemRef);
    
    return true;
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    
    // Fallback to localStorage
    try {
      // Get existing items
      const existingItems = JSON.parse(localStorage.getItem('konkora_portfolio_items') || '[]');
      
      // Filter out the item to delete
      const updatedItems = existingItems.filter((item: any) => item.id !== itemId);
      
      // Save updated items
      localStorage.setItem('konkora_portfolio_items', JSON.stringify(updatedItems));
      
      return true;
    } catch (e) {
      throw new Error('Failed to delete portfolio item from local storage');
    }
  }
};
 