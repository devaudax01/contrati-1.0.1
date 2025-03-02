import React, { useEffect, useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  User, 
  Lock,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const SubscriptionModal = ({ isOpen, onClose, selectedPlan, formData = {}, onInputChange, onSubmit }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    try {
      await onSubmit(e);
      toast.success('Inscription réussie !');
      setIsSuccess(true);
    } catch (error) {
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
        toast.error(
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Erreur d'inscription</p>
              <p className="text-sm">Veuillez corriger les erreurs dans le formulaire</p>
            </div>
          </div>
        );
      } else {
        toast.error(
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Erreur d'inscription</p>
              <p className="text-sm">Une erreur est survenue. Veuillez réessayer.</p>
            </div>
          </div>
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Field configurations
  const formFields = {
    business: {
      title: "Informations de l'entreprise",
      icon: <Building2 className="w-5 h-5" />,
      fields: {
        businessName: {
          label: "Nom de l'entreprise",
          type: "text",
          placeholder: "Entrez le nom de votre entreprise",
          icon: <Briefcase className="w-4 h-4" />
        },
        businessAddress: {
          label: "Adresse",
          type: "text",
          placeholder: "Adresse complète",
          icon: <MapPin className="w-4 h-4" />
        },
        businessCity: {
          label: "Ville",
          type: "text",
          grid: "col-span-1",
          placeholder: "Ville",
          icon: <MapPin className="w-4 h-4" />
        },
        businessPostalCode: {
          label: "Code postal",
          type: "text",
          grid: "col-span-1",
          placeholder: "Code postal",
          icon: <MapPin className="w-4 h-4" />
        },
        ice: {
          label: "ICE",
          type: "text",
          placeholder: "Identifiant Commerce",
          icon: <CreditCard className="w-4 h-4" />
        },
        businessPhone: {
          label: "Téléphone",
          type: "tel",
          placeholder: "+212",
          icon: <Phone className="w-4 h-4" />
        },
        businessEmail: {
          label: "Email professionnel",
          type: "email",
          placeholder: "email@entreprise.com",
          icon: <Mail className="w-4 h-4" />
        },
      },
    },
    owner: {
      title: "Informations du propriétaire",
      icon: <User className="w-5 h-5" />,
      fields: {
        ownerFirstname: {
          label: "Prénom",
          type: "text",
          grid: "col-span-1",
          placeholder: "Prénom",
          icon: <User className="w-4 h-4" />
        },
        ownerLastname: {
          label: "Nom",
          type: "text",
          grid: "col-span-1",
          placeholder: "Nom",
          icon: <User className="w-4 h-4" />
        },
        ownerEmail: {
          label: "Email",
          type: "email",
          placeholder: "email@exemple.com",
          icon: <Mail className="w-4 h-4" />
        },
        ownerPassword: {
          label: "Mot de passe",
          type: "password",
          placeholder: "••••••••",
          icon: <Lock className="w-4 h-4" />
        },
      },
    },
  };

  const renderField = (name, config) => {
    if (!(name in formData)) return null;

    const hasError = formErrors[name];

    return (
      <div key={name} className={`${config.grid || "col-span-2"} transition-all`}>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          {config.label}
        </label>
        <div className="relative">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${hasError ? 'text-red-400' : 'text-gray-400'}`}>
            {config.icon}
          </div>
          <input
            type={config.type}
            name={name}
            value={formData[name] || ''}
            onChange={onInputChange}
            placeholder={config.placeholder}
            className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-md transition-all text-gray-800 placeholder-gray-400
              ${hasError 
                ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }`}
            required
          />
          {hasError && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors[name]}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[90%] sm:max-w-[440px] md:max-w-[560px] m-4 bg-white rounded-lg shadow-xl">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 rounded-t-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-1">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {isSuccess ? 'Inscription réussie !' : 'Créer votre compte'}
                </h2>
                {!isSuccess && (
                  <>
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <p className="text-sm text-gray-500">Plan sélectionné: {selectedPlan?.plan_name}</p>
                    </div>
                    <p className="text-sm text-blue-600 font-medium ml-7">{selectedPlan?.price} MAD / {selectedPlan?.contract_duration}</p>
                  </>
                )}
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="h-20 w-20 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-gray-600">
                  Votre compte a été créé avec succès.
                </p>
                
                <div className="bg-blue-50 rounded-md p-4 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-blue-900 font-medium mb-1">
                      Vérifiez votre boîte mail
                    </p>
                    <p className="text-sm text-blue-800">
                      Un email de confirmation a été envoyé à <span className="font-medium">{formData.ownerEmail || formData.businessEmail}</span>. 
                      Veuillez valider votre compte pour pouvoir vous connecter.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <span>Fermer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.entries(formFields).map(([section, { title, icon, fields }]) => {
                const enabledFields = Object.entries(fields).filter(([fieldName]) => fieldName in formData);
                
                if (enabledFields.length === 0) return null;

                return (
                  <div key={section} className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-800">
                      {icon}
                      <h4 className="text-base font-medium">{title}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enabledFields.map(([fieldName, fieldConfig]) => 
                        renderField(fieldName, fieldConfig)
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    'Créer mon compte'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal; 