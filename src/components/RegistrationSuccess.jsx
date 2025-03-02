import React from 'react';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = ({ email }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center px-4 py-6">
      <div className="mb-6 flex justify-center">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Inscription réussie !
      </h3>
      
      <div className="space-y-4 mb-8">
        <p className="text-gray-600">
          Votre compte a été créé avec succès.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-sm text-blue-900 font-medium mb-1">
              Vérifiez votre boîte mail
            </p>
            <p className="text-sm text-blue-800">
              Un email de confirmation a été envoyé à <span className="font-medium">{email}</span>. 
              Veuillez valider votre compte pour pouvoir vous connecter.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/login')}
        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Aller à la page de connexion
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default RegistrationSuccess; 