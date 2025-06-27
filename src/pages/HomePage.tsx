import  { Link } from 'react-router-dom';
import { PenTool, Layout as LayoutIcon, Code, Users, CheckCircle, ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="container relative mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Creative Design Solutions for Your Special Moments
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 text-indigo-100">
            We craft beautiful wedding invitations, birthday cards, websites, and prototypes
            that turn your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/portfolio" className="btn btn-primary rounded-full">
              View Our Work
            </Link>
            <Link to="/contact" className="btn bg-white text-indigo-600 hover:bg-gray-100 rounded-full">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Creative Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From elegant wedding invitations to modern websites, we provide design solutions that make your special moments memorable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
              <PenTool className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Wedding Invitations</h3>
              <p className="text-gray-600">
                Beautiful, personalized wedding invitations that set the tone for your special day.
              </p>
            </div>
            
            <div className="card p-8 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
              <LayoutIcon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Birthday Cards</h3>
              <p className="text-gray-600">
                Creative birthday card designs that bring joy and celebration to any age.
              </p>
            </div>
            
            <div className="card p-8 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
              <Code className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Website Design</h3>
              <p className="text-gray-600">
                Custom websites that showcase your brand and engage your audience effectively.
              </p>
            </div>
            
            <div className="card p-8 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Prototyping</h3>
              <p className="text-gray-600">
                Interactive prototypes that bring your digital product ideas to life.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              <span>Explore All Services</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Work */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some of our recent projects and discover the quality and creativity we bring to every design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card overflow-hidden portfolio-item">
              <img 
                src="https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Elegant Wedding Invitation" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Wedding</span>
                <h3 className="text-xl font-bold mt-2">Elegant Floral Invitation</h3>
                <p className="mt-2 text-gray-600">Minimalist design with gold foil accents and custom calligraphy.</p>
              </div>
            </div>
            
            <div className="card overflow-hidden portfolio-item">
              <img 
                src="https://images.unsplash.com/photo-1553531384-397c80973a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Colorful Birthday Card" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Birthday</span>
                <h3 className="text-xl font-bold mt-2">Vibrant Birthday Suite</h3>
                <p className="mt-2 text-gray-600">Playful design with custom illustrations and bright color palette.</p>
              </div>
            </div>
            
            <div className="card overflow-hidden portfolio-item">
              <img 
                src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern Website Design" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Website</span>
                <h3 className="text-xl font-bold mt-2">Modern E-Commerce Site</h3>
                <p className="mt-2 text-gray-600">Responsive design with seamless user experience and clean aesthetics.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/portfolio" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              <span>View Full Portfolio</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from those who have experienced our creative solutions and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Wedding Client</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Konkora created the most beautiful wedding invitations for us. The design perfectly captured our style and the quality was exceptional. Highly recommend!"
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="card p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="David Miller" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">David Miller</h4>
                  <p className="text-sm text-gray-600">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The website Konkora designed for my business exceeded all expectations. It's not just beautiful but also functional and has significantly increased my online presence."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="card p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Michelle Taylor" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Michelle Taylor</h4>
                  <p className="text-sm text-gray-600">Birthday Client</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I ordered birthday cards for my daughter's party and they were absolutely perfect! The design was unique and the quality was outstanding. Will definitely use Konkora again."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Next Project?</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Let's work together to bring your ideas to life with beautiful designs that leave a lasting impression.
          </p>
          <Link to="/contact" className="btn bg-white text-indigo-600 hover:bg-gray-100 rounded-full text-lg px-8 py-3">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
 