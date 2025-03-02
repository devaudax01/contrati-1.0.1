import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 10,
  },
  value: {
    width: '70%',
    fontSize: 10,
  },
  signature: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
    fontSize: 10,
  },
});

export const ContractPDF = ({ contract }) => {
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CONTRAT DE LOCATION DE VEHICULE (511)</Text>
          <Text>Rental Car - Carco car</Text>
          <Text style={{ fontSize: 10 }}>Tel: +212 6 67 99 91 72 | Email: contact@carcocar.com</Text>
        </View>

        {/* Vehicle Section */}
        <View style={styles.section}>
          <Text style={styles.title}>VEHICULE</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Marque:</Text>
            <Text style={styles.value}>{contract?.vehicle?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Immatriculation:</Text>
            <Text style={styles.value}>{contract?.vehicle?.plate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date de départ:</Text>
            <Text style={styles.value}>
              {contract?.startDate ? new Date(contract.startDate).toLocaleDateString() : ''}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date de retour:</Text>
            <Text style={styles.value}>
              {contract?.endDate ? new Date(contract.endDate).toLocaleDateString() : ''}
            </Text>
          </View>
        </View>

        {/* Customer Section */}
        <View style={styles.section}>
          <Text style={styles.title}>LOCATAIRE</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nom:</Text>
            <Text style={styles.value}>{contract?.customer?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{contract?.customer?.email}</Text>
          </View>
        </View>

        {/* Signatures */}
        <View style={styles.signature}>
          <View style={styles.signatureBox}>
            <Text>Signature du locataire</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text>Signature de l'agent</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return MyDocument;
};

// Separate functions for preview and download
export const previewPDF = async (contract) => {
  const blob = await pdf((<ContractPDF contract={contract} />)).toBlob();
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  // Clean up after a delay to ensure the blob is loaded in the new tab
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

export const downloadPDF = async (contract) => {
  const blob = await pdf((<ContractPDF contract={contract} />)).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `contract-${contract.contractNumber || 'new'}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}; 