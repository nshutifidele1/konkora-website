import  { useState } from 'react';
import { PenTool, Layout as LayoutIcon, Code, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const services = [
    {
      id: 1,
      icon: <PenTool className="h-12 w-12 text-indigo-600" />,
      title: 'Wedding Invitations',
      description: 'Beautifully crafted wedding invitations tailored to reflect your unique style and theme.',
      category: 'wedding',
      features: [
        'Custom invitation design',
        'Digital and print formats',
        'Matching save the dates and RSVP cards',
        'Premium paper and printing options',
        'Elegant packaging solutions',
      ],
      image: 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      icon: <LayoutIcon className="h-12 w-12 text-indigo-600" />,
      title: 'Birthday Cards',
      description: 'Creative and personalized birthday cards that make celebrations more special and memorable.',
      category: 'birthday',
      features: [
        'Age-specific designs',
        'Personalized messages and photos',
        'High-quality printing',
        'Custom illustrations',
        'Digital and print options',
      ],
      image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      icon: <Code className="h-12 w-12 text-indigo-600" />,
      title: 'Website Design & Development',
      description: 'Professional website design and development services to establish your online presence.',
      category: 'website',
      features: [
        'Responsive design for all devices',
        'SEO-friendly structure',
        'User experience optimization',
        'Content management systems',
        'E-commerce functionality',
      ],
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      icon: <Users className="h-12 w-12 text-indigo-600" />,
      title: 'Prototyping',
      description: 'Interactive prototypes that visualize your digital product ideas before development.',
      category: 'prototype',
      features: [
        'High-fidelity interactive mockups',
        'User flow mapping',
        'Interface design',
        'Usability testing',
        'Iterative development process',
      ],
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
  ];
  
  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Design Services</h1>
          <p className="text-xl max-w-3xl mx-auto text-indigo-100">
            From elegant wedding invitations to professional website designs, we offer creative solutions for all your needs.
          </p>
        </div>
      </section>
      
      {/* Services Filters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Services
            </button>
            <button 
              onClick={() => setActiveTab('wedding')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'wedding' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Wedding Invitations
            </button>
            <button 
              onClick={() => setActiveTab('birthday')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'birthday' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Birthday Cards
            </button>
            <button 
              onClick={() => setActiveTab('website')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'website' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Website Design
            </button>
            <button 
              onClick={() => setActiveTab('prototype')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'prototype' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Prototyping
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredServices.map((service) => (
              <div key={service.id} className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:w-2/5 h-64 md:h-auto">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-3/5">
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="text-2xl font-bold ml-4">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn btn-primary inline-block">
                    Get a Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Design Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a collaborative approach to ensure your vision comes to life exactly as you imagined.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">1</div>
              <div className="card p-8 pt-12 text-center mt-8">
                <h3 className="text-xl font-bold mb-3">Consultation</h3>
                <p className="text-gray-600">
                  We start with understanding your vision, goals, and specific requirements for the project.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">2</div>
              <div className="card p-8 pt-12 text-center mt-8">
                <h3 className="text-xl font-bold mb-3">Concept Design</h3>
                <p className="text-gray-600">
                  Our designers create initial concepts based on your requirements and preferences.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">3</div>
              <div className="card p-8 pt-12 text-center mt-8">
                <h3 className="text-xl font-bold mb-3">Refinement</h3>
                <p className="text-gray-600">
                  We refine the designs based on your feedback until they meet your exact expectations.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">4</div>
              <div className="card p-8 pt-12 text-center mt-8">
                <h3 className="text-xl font-bold mb-3">Delivery</h3>
                <p className="text-gray-600">
                  Final designs are delivered in the required formats, with ongoing support as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-600 rounded-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-16 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
                <p className="text-xl text-indigo-100 mb-8">
                  Ready to bring your ideas to life? Contact us today to discuss your project needs and get a personalized quote.
                </p>
                <Link to="/contact" className="btn bg-white text-indigo-600 hover:bg-gray-100">
                  Contact Us
                </Link>
              </div>
              <div className="md:w-1/2 hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80" 
                  alt="Creative workspace" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
 