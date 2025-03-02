import { User, Mail, Phone, CreditCard, Calendar, Users, FileText } from 'lucide-react';
import { format, addDays } from 'date-fns';

export const bookingFormConfig = {
  sections: [
    {
      id: 'customerInfo',
      title: 'Customer Information',
      description: 'Enter the primary driver\'s details',
      fields: [
        {
          id: 'name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'Enter full name',
          icon: User,
          required: true,
          validation: {
            required: 'Name is required',
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: 'Please enter a valid name'
            },
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          }
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'Enter email address',
          icon: Mail,
          required: true,
          validation: {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email'
            }
          }
        },
        {
          id: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: 'Enter phone number',
          icon: Phone,
          required: true,
          validation: {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9+-\s()]*$/,
              message: 'Please enter a valid phone number'
            }
          }
        },
        {
          id: 'licenseNumber',
          label: 'Driver License',
          type: 'text',
          placeholder: 'Enter license number',
          icon: CreditCard,
          required: true,
          validation: {
            required: 'License number is required'
          }
        }
      ]
    },
    {
      id: 'bookingDetails',
      title: 'Booking Details',
      description: 'Select your rental period',
      fields: [
        {
          id: 'startDate',
          label: 'Start Date & Time',
          type: 'datetime',
          icon: Calendar,
          required: true,
          validation: {
            required: 'Start date and time is required'
          }
        },
        {
          id: 'endDate',
          label: 'End Date & Time',
          type: 'datetime',
          icon: Calendar,
          required: true,
          validation: {
            required: 'End date and time is required'
          }
        }
      ]
    },
    {
      id: 'additionalDrivers',
      title: 'Additional Drivers',
      description: 'Add additional drivers if needed',
      optional: true,
      fields: [
        {
          id: 'additionalDriver',
          label: 'Additional Driver',
          type: 'toggle',
          icon: Users,
          subfields: [
            {
              id: 'name',
              label: 'Full Name',
              type: 'text',
              placeholder: 'Enter full name',
              icon: User,
              validation: {
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: 'Please enter a valid name'
                }
              }
            },
            {
              id: 'licenseNumber',
              label: 'Driver License',
              type: 'text',
              placeholder: 'Enter license number',
              icon: CreditCard
            }
          ]
        }
      ]
    },
    {
      id: 'documents',
      title: 'Required Documents',
      description: 'Upload required documents',
      fields: [
        {
          id: 'driverLicense',
          label: 'Driver License',
          type: 'file',
          icon: FileText,
          required: true,
          accept: 'image/*,.pdf',
          validation: {
            required: 'Driver license document is required'
          }
        },
        {
          id: 'insurance',
          label: 'Insurance Document',
          type: 'file',
          icon: FileText,
          required: true,
          accept: 'image/*,.pdf',
          validation: {
            required: 'Insurance document is required'
          }
        }
      ]
    }
  ],
  terms: {
    id: 'terms',
    label: 'I agree to the terms and conditions',
    type: 'checkbox',
    required: true,
    validation: {
      required: 'You must accept the terms and conditions'
    }
  }
};

export const validateField = (value, validation) => {
  if (!validation) return '';

  if (validation.required && !value) {
    return validation.required;
  }

  if (validation.pattern && !validation.pattern.value.test(value)) {
    return validation.pattern.message;
  }

  if (validation.minLength && value.length < validation.minLength.value) {
    return validation.minLength.message;
  }

  return '';
};

export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const calculateDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const initialBookingState = {
  customer: {
    name: '',
    email: '',
    phone: '',
    licenseNumber: ''
  },
  startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  endDate: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
  additionalDriver: {
    enabled: false,
    name: '',
    licenseNumber: ''
  },
  documents: {
    driverLicense: null,
    insurance: null
  },
  terms: false
}; 