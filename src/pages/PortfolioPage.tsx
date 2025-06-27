import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Layout as LayoutIcon, Code, Users } from 'lucide-react';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [itemsToShow, setItemsToShow] = useState(12);
  
  const portfolioItems = [
    // Wedding Invitations
    {
      id: 1,
      title: "Elegant Floral Suite",
      category: "wedding",
      image: "https://images.unsplash.com/photo-1612158117109-ccb3a0ff9fba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Sarah & David",
      date: "June 2023",
      description: "A luxurious wedding invitation suite featuring delicate floral patterns and gold foil accents."
    },
    {
      id: 2,
      title: "Minimalist Modern Invitation",
      category: "wedding",
      image: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Emma & James",
      date: "May 2023",
      description: "Clean lines and typography create a sophisticated and timeless wedding invitation design."
    },
    {
      id: 3,
      title: "Rustic Woodland Wedding",
      category: "wedding",
      image: "https://images.unsplash.com/photo-1541250848620-6a85b89ffd34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Jessica & Michael",
      date: "August 2023",
      description: "Rustic-inspired invitation with botanical elements and natural textures."
    },
    {
      id: 4,
      title: "Vintage Lace Collection",
      category: "wedding",
      image: "https://images.unsplash.com/photo-1613844227302-d3a7b1b94a5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Sophie & Thomas",
      date: "July 2023",
      description: "Delicate lace patterns and soft colors for a romantic vintage-inspired wedding suite."
    },
    {
      id: 5,
      title: "Tropical Paradise",
      category: "wedding",
      image: "https://images.unsplash.com/photo-1567890906524-bfd8bd3b37f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Maya & Daniel",
      date: "April 2023",
      description: "Vibrant tropical designs for a destination beach wedding invitation suite."
    },
    
    // Birthday Cards
    {
      id: 6,
      title: "Colorful Birthday Blast",
      category: "birthday",
      image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Children's Party",
      date: "May 2023",
      description: "Bright and fun birthday card design with playful typography and confetti elements."
    },
    {
      id: 7,
      title: "Elegant 50th Celebration",
      category: "birthday",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Adult Milestone",
      date: "June 2023",
      description: "Sophisticated design for a golden anniversary birthday with metallic accents."
    },
    {
      id: 8,
      title: "Fun Illustrated Card",
      category: "birthday",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Children's Party",
      date: "July 2023",
      description: "Hand-illustrated birthday card with whimsical characters and bright colors."
    },
    {
      id: 9,
      title: "Sweet 16 Design",
      category: "birthday",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Teenage Celebration",
      date: "August 2023",
      description: "Modern and trendy birthday design for a memorable sweet sixteen celebration."
    },
    {
      id: 10,
      title: "Retro Birthday Bash",
      category: "birthday",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Adult Party",
      date: "September 2023",
      description: "Nostalgic retro-themed birthday card with vintage typography and color palette."
    },
    
    // Website Design
    {
      id: 11,
      title: "E-Commerce Platform",
      category: "website",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Artisan Crafts",
      date: "July 2023",
      description: "Modern e-commerce website with seamless shopping experience and beautiful product displays."
    },
    {
      id: 12,
      title: "Corporate Portfolio",
      category: "website",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Financial Advisors LLC",
      date: "May 2023",
      description: "Professional corporate website with clean design and intuitive navigation."
    },
    {
      id: 13,
      title: "Restaurant Website",
      category: "website",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Gourmet Bistro",
      date: "June 2023",
      description: "Mouth-watering food photography and easy reservation system for a fine dining restaurant."
    },
    {
      id: 14,
      title: "Photography Portfolio",
      category: "website",
      image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Capture Studios",
      date: "April 2023",
      description: "Visually stunning portfolio website that showcases photography with minimal distractions."
    },
    {
      id: 15,
      title: "Travel Blog",
      category: "website",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Wanderlust Adventures",
      date: "August 2023",
      description: "Immersive travel blog with rich content management system and social sharing features."
    },
    
    // Prototyping
    {
      id: 16,
      title: "Mobile App Prototype",
      category: "prototype",
      image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Fitness Tracker",
      date: "July 2023",
      description: "High-fidelity interactive prototype for a fitness tracking mobile application."
    },
    {
      id: 17,
      title: "Dashboard Interface",
      category: "prototype",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Analytics Platform",
      date: "June 2023",
      description: "Data visualization dashboard with interactive elements and user-friendly controls."
    },
    {
      id: 18,
      title: "E-Learning Platform",
      category: "prototype",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Education Startup",
      date: "May 2023",
      description: "Intuitive interface prototype for an online learning platform with course management features."
    },
    {
      id: 19,
      title: "Smart Home App",
      category: "prototype",
      image: "https://images.unsplash.com/photo-1558002038-1055e2eae958?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "IoT Solutions",
      date: "August 2023",
      description: "User interface prototype for controlling smart home devices with voice and touch interactions."
    },
    {
      id: 20,
      title: "Booking System",
      category: "prototype",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Travel Agency",
      date: "April 2023",
      description: "Interactive prototype for a travel booking system with multi-step reservation process."
    }
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);
  
  const displayedItems = filteredItems.slice(0, itemsToShow);
  
  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 8);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24 md:py-32">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Creative Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto text-indigo-100">
            Explore our collection of wedding invitations, birthday cards, website designs, and interactive prototypes.
          </p>
        </div>
      </section>
      
      {/* Portfolio Gallery */}
      <section className="py-16 md:py-24">
        <div className="container">
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => {setActiveCategory('all'); setItemsToShow(12);}}
              className={`px-4 py-2 rounded-md ${
                activeCategory === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Projects
            </button>
            <button 
              onClick={() => {setActiveCategory('wedding'); setItemsToShow(12);}}
              className={`px-4 py-2 rounded-md ${
                activeCategory === 'wedding' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <PenTool className="inline h-4 w-4 mr-1" />
              Wedding Invitations
            </button>
            <button 
              onClick={() => {setActiveCategory('birthday'); setItemsToShow(12);}}
              className={`px-4 py-2 rounded-md ${
                activeCategory === 'birthday' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <LayoutIcon className="inline h-4 w-4 mr-1" />
              Birthday Cards
            </button>
            <button 
              onClick={() => {setActiveCategory('website'); setItemsToShow(12);}}
              className={`px-4 py-2 rounded-md ${
                activeCategory === 'website' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <Code className="inline h-4 w-4 mr-1" />
              Websites
            </button>
            <button 
              onClick={() => {setActiveCategory('prototype'); setItemsToShow(12);}}
              className={`px-4 py-2 rounded-md ${
                activeCategory === 'prototype' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <Users className="inline h-4 w-4 mr-1" />
              Prototypes
            </button>
          </div>
          
          {/* Portfolio grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedItems.map((item) => (
              <div key={item.id} className="portfolio-item card overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.client} • {item.date}</p>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load more button */}
          {displayedItems.length < filteredItems.length && (
            <div className="text-center mt-12">
              <button 
                onClick={handleLoadMore}
                className="btn btn-outline"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-16">
                <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
                <p className="text-gray-600 mb-8">
                  Let's discuss how we can help bring your creative vision to life. Our team is ready to collaborate with you.
                </p>
                <Link to="/contact" className="btn btn-primary">
                  Start a Project
                </Link>
              </div>
              <div className="md:w-1/2 hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team collaboration" 
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
 