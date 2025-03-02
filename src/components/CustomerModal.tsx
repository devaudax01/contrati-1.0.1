import { X, ArrowRight, Upload } from 'lucide-react';
import { useState } from 'react';
import { CustomerModalProps, DocumentType } from '../types/customer';

const CustomerModal = ({ 
  customer, 
  onClose, 
  isEditing, 
  isCreating, 
  onSave 
}: CustomerModalProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [idType, setIdType] = useState<'identity' | 'passport'>(customer.idType || 'identity');
  const [documents, setDocuments] = useState<DocumentType>({
    idFront: null,
    idBack: null,
    licenseFront: null,
    licenseBack: null
  });

  const customerTypes = ["Individual", "Corporate"] as const;

  const handleFileChange = (documentType: keyof DocumentType, file: File) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  // ... rest of your component code ...
};

export default CustomerModal; 