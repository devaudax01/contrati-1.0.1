export type DocumentType = {
  idFront: File | null;
  idBack: File | null;
  licenseFront: File | null;
  licenseBack: File | null;
};

export type RentalHistoryItem = {
  id: number;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'ongoing' | 'cancelled';
  totalAmount: string;
};

export type CustomerAction = {
  type: string;
  date: string;
};

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: 'Individual' | 'Corporate';
  status: 'active' | 'disabled' | 'blocked';
  address: string;
  birthDate: string;
  driverLicense: string;
  licenseIssueDate: string;
  nationality: string;
  idType: 'identity' | 'passport';
  documents: {
    idFront: string | null;
    idBack: string | null;
    licenseFront: string | null;
    licenseBack: string | null;
  };
  rentalHistory: RentalHistoryItem[];
  actions: CustomerAction[];
};

export type CustomerModalProps = {
  customer: Customer;
  onClose: () => void;
  isEditing: boolean;
  isCreating: boolean;
  onSave: (customer: Customer) => void;
}; 