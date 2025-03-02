import React, { useState, useEffect } from "react";
import { FileText, Shield, Clock, Users, Phone, Mail, MapPin, CheckCircle, Menu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import content from '../content/landing-page.json';
import SubscriptionModal from '../components/SubscriptionModal';
import plansData from '../data/plans.json';
import '../styles/animations.css';  // Import the animations

export const LandingPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    // Business details
    businessName: '',
    businessAddress: '',
    businessCity: '',
    businessPostalCode: '',
    businessPhone: '',
    responsiblePerson: '',
    // Owner details
    ownerFirstname: '',
    ownerLastname: '',
    ownerEmail: '',
    ownerPassword: '',
  });

  useEffect(() => {
    // Simulate loading time for better UX
    setTimeout(() => {
      try {
        setPlans(plansData.plans);
        setLoading(false);
      } catch (err) {
        setError('Failed to load subscription plans');
        setLoading(false);
      }
    }, 500);
  }, []);

  // Icon mapping
  const iconComponents = {
    FileText,
    Shield,
    Clock,
    Users
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Logo/Brand */}
            <Link to="/" className="relative group">
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 
                bg-clip-text text-transparent">
                YourBrand
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 
                transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-12">
              {[
                { href: '#features', label: 'Fonctionnalités' },
                { href: '#pricing', label: 'Tarifs' },
                { href: '#contact', label: 'Contact' }
              ].map(link => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="relative text-sm font-medium text-gray-600 hover:text-violet-600 
                    transition-all duration-300 group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600/50 
                    transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <Link 
                to="/login" 
                className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 
                  text-white rounded-full hover:shadow-lg hover:shadow-violet-500/25 
                  active:shadow-none transition-all duration-300 text-sm font-medium
                  hover:-translate-y-0.5 active:translate-y-0 hover:scale-105"
              >
                Se connecter
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2.5 rounded-full hover:bg-violet-50 
              transition-colors duration-200">
              <Menu className="h-6 w-6 text-violet-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 text-gray-900">
        {/* Hero Section */}
        <div className="relative min-h-screen pt-20 flex items-center justify-center 
          bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-800 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 
              bg-violet-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 
              bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-24 left-1/3 w-96 h-96 
              bg-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 md:px-12 max-w-5xl text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 
              [text-wrap:balance] leading-tight tracking-tight">
              {content.hero.title}
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-violet-100 mb-12 [text-wrap:balance] 
              max-w-3xl mx-auto leading-relaxed">
              {content.hero.subtitle}
            </p>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-violet-600 
                rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl 
                transition-all duration-300 hover:-translate-y-1 hover:scale-105
                active:translate-y-0 active:shadow-xl group"
            >
              {content.hero.cta}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 
              bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {content.features.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {content.features.items.map((feature, index) => {
                const Icon = iconComponents[feature.icon];
                return (
                  <div key={index} className="group p-8 rounded-3xl bg-white border border-gray-100 
                    hover:border-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/5 
                    transition-all duration-500 hover:-translate-y-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 
                      flex items-center justify-center mb-8 group-hover:scale-110 
                      transition-transform duration-500">
                      <Icon className="w-8 h-8 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="98%" text="de satisfaction clients" />
            <StatCard number="150+" text="contrats générés chaque mois" />
            <StatCard number="100+" text="agences partenaires à travers le Maroc" />
            <StatCard number="24/7" text="support client disponible" />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nos Plans
          </h2>
          {loading ? (
            <div className="text-center">Chargement des plans...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <PriceCard
                  key={plan.id}
                  plan={plan}
                  onSubscribe={handleSubscribe}
                />
              ))}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full bg-gray-50">
          <ContactSection content={content.contact} />
        </section>
      </div>

      <SubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const StatCard = ({ number, text }) => (
  <div className="text-center p-6 backdrop-blur-sm bg-white/10 rounded-lg">
    <div className="text-4xl md:text-5xl font-bold mb-2">{number}</div>
    <div className="text-sm md:text-base opacity-90 font-medium">{text}</div>
  </div>
);

const PriceCard = ({ plan, onSubscribe }) => {
  const { plan_name, price, contract_duration, feature_list, id } = plan;
  const popular = id === 'standard';

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg p-8 ${
      popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
    }`}>
      {popular && (
        <div className="absolute -top-4 -right-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg">
            POPULAIRE
          </div>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">{plan_name}</h3>
        <div className="mb-6">
          <div className="text-4xl font-bold">{price} MAD</div>
          <div className="text-sm text-gray-500">HT / {contract_duration}</div>
          <div className="text-xs text-gray-400 mt-1">
            {(price * 1.2).toFixed(2)} MAD TTC
          </div>
        </div>
      </div>
      <ul className="space-y-3 mt-6 min-h-[320px]">
        {feature_list.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSubscribe(plan)}
        className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${
          popular 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        Commencer maintenant
      </button>
      <p className="text-xs text-center text-gray-500 mt-4">
        Sans engagement - Annulation à tout moment
      </p>
    </div>
  );
};

const ContactSection = ({ content }) => (
  <div className="w-full bg-gray-50">
    <div className="text-center py-16">
      <h2 className="text-3xl font-bold text-gray-800">{content.title}</h2>
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto px-4">
        {content.subtitle}
      </p>
    </div>

    <div className="w-full min-h-[600px] bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left Side - Contact Information */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-8">Informations de Contact</h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 mt-1" />
                  <div className="space-y-2">
                    {content.info.phones.map((phone, index) => (
                      <p key={index}>{phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4" />
                  <p>{content.info.email}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-4" />
                  <p>{content.info.address}</p>
                </div>
              </div>

              <div className="mt-16">
                <h4 className="text-xl font-semibold mb-4">Heures d'ouverture</h4>
                <p className="text-sm opacity-90">
                  {content.info.hours.weekdays}<br />
                  {content.info.hours.weekend}
                </p>
              </div>
            </div>
            {/* Decorative Circles */}
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/30 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="p-8 md:p-12">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Nom complet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-600 transition-colors outline-none bg-gray-50/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-600 transition-colors outline-none bg-gray-50/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Sujet</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-600 transition-colors outline-none bg-gray-50/50"
                  placeholder="Je souhaite en savoir plus sur vos services"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-600 transition-colors outline-none resize-none bg-gray-50/50"
                  placeholder="Écrivez votre message ici..."
                ></textarea>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  J'accepte la politique de confidentialité
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg font-medium text-lg"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage; 