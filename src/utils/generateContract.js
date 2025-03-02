import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateContract = (bookingData) => {
  if (!bookingData) {
    console.error('No booking data provided');
    return null;
  }

  const doc = new jsPDF();
  
  // Add company logo/header
  doc.setFontSize(20);
  doc.text('Rental Agreement', 105, 20, { align: 'center' });
  
  // Add contract number and date
  doc.setFontSize(12);
  doc.text(`Contract #: ${bookingData?.id || 'N/A'}`, 20, 40);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 48);
  
  // Customer Information
  doc.setFontSize(14);
  doc.text('Customer Information', 20, 65);
  doc.setFontSize(12);
  doc.text(`Name: ${bookingData?.customer?.name || 'N/A'}`, 20, 75);
  doc.text(`Email: ${bookingData?.customer?.email || 'N/A'}`, 20, 83);
  doc.text(`Phone: ${bookingData?.customer?.phone || 'N/A'}`, 20, 91);
  doc.text(`Address: ${bookingData?.customer?.address || 'N/A'}`, 20, 99);
  doc.text(`License Number: ${bookingData?.customer?.licenseNumber || 'N/A'}`, 20, 107);

  // Vehicle Information
  doc.setFontSize(14);
  doc.text('Vehicle Information', 20, 124);
  doc.setFontSize(12);
  doc.text(`Make: ${bookingData?.vehicle?.make || 'N/A'}`, 20, 134);
  doc.text(`Model: ${bookingData?.vehicle?.model || 'N/A'}`, 20, 142);
  doc.text(`Year: ${bookingData?.vehicle?.year || 'N/A'}`, 20, 150);
  doc.text(`License Plate: ${bookingData?.vehicle?.licensePlate || 'N/A'}`, 20, 158);

  // Rental Details
  doc.setFontSize(14);
  doc.text('Rental Details', 20, 175);
  doc.setFontSize(12);
  doc.text(`Pickup Date: ${bookingData?.startDate ? new Date(bookingData.startDate).toLocaleDateString() : 'N/A'}`, 20, 185);
  doc.text(`Return Date: ${bookingData?.endDate ? new Date(bookingData.endDate).toLocaleDateString() : 'N/A'}`, 20, 193);
  doc.text(`Daily Rate: $${bookingData?.dailyRate?.toFixed(2) || 'N/A'}`, 20, 201);
  doc.text(`Total Amount: $${bookingData?.totalAmount?.toFixed(2) || 'N/A'}`, 20, 209);

  // Terms and Conditions
  doc.setFontSize(14);
  doc.text('Terms and Conditions', 20, 226);
  doc.setFontSize(10);
  const terms = [
    '1. The renter must return the vehicle in the same condition as received.',
    '2. The renter is responsible for any damages during the rental period.',
    '3. Smoking is not permitted in the vehicle.',
    '4. The vehicle must not be used for illegal purposes.',
    '5. Early returns will not result in a refund.'
  ];
  terms.forEach((term, index) => {
    doc.text(term, 20, 236 + (index * 8));
  });

  // Signatures
  doc.setFontSize(12);
  doc.text('Customer Signature: _____________________', 20, 290);
  doc.text('Date: ________________', 140, 290);

  doc.text('Company Representative: _____________________', 20, 270);
  doc.text('Date: ________________', 140, 270);

  return doc;
}; 