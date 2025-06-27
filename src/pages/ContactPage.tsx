import  { useState, FormEvent } from 'react';
import { Map, Mail, Phone, RefreshCw, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { sendMessage } from '../services/messageService';
import { useMessages } from '../context/MessageContext';
 

export  default function ContactPage() {
  const { refreshMessages } = useMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageStatus, setMessageStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessageStatus('idle');
    
    try {
      await sendMessage(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setMessageStatus('success');
    } catch (error) {
      console.error('Error sending message:', error);
      setMessageStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions or need a custom design? We'd love to hear from you. Fill out the form below or use our contact information to get in touch.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`btn-primary w-full flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">
                      <RefreshCw className="h-5 w-5" />
                    </span>
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
              
              {/* Success/Error notification */}
              {messageStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>Your message has been sent successfully! We'll get back to you soon.</p>
                </div>
              )}
              
              {messageStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>There was an error sending your message. Please try again or contact us directly.</p>
                </div>
              )}
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
              <div className="flex items-start mb-6">
                <div className="bg-indigo-100 p-3 rounded-md text-indigo-600 mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">nshutifidele1@gmail.com</p>
                  <a href="mailto:nshutifidele1@gmail.com" className="text-indigo-600 hover:text-indigo-800 mt-1 inline-block">
                    Send an email
                  </a>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-indigo-100 p-3 rounded-md text-indigo-600 mr-4">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">+250 798 515 630</p>
                  <a href="tel:+250798515630" className="text-indigo-600 hover:text-indigo-800 mt-1 inline-block">
                    Call us
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-md text-indigo-600 mr-4">
                  <Map className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Location</h3>
                  <p className="text-gray-600">Rwanda, Rubavu District</p>
                  <a 
                    href="https://maps.google.com/?q=Rwanda,Rubavu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 mt-1 inline-block"
                  >
                    View on map
                  </a>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden h-64 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63745.93590452266!2d29.310882!3d-1.6795209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd34dbbcff9ea7%3A0x9d1e7ee4843cd3d5!2sRubavu%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1687899701239!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 