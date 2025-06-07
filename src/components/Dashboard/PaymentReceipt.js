import React from 'react';
import jsPDF from 'jspdf';

const PaymentReceipt = ({ unit }) => {

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Recibo de Expensas', 20, 20);

    doc.setFontSize(12);
    doc.text(`Unidad: ${unit.unitNumber}`, 20, 40);
    doc.text(`Propietario: ${unit.ownerName}`, 20, 50);
    doc.text(`Email: ${unit.email}`, 20, 60);
    doc.text(`Teléfono: ${unit.phone}`, 20, 70);
    doc.text(`Monto a Pagar: $${unit.amountDue}`, 20, 90);

    doc.save(`Recibo_Unidad_${unit.unitNumber}.pdf`);
  };

  return (
    <div className="p-6">
      <button onClick={generatePDF} className="bg-red-500 text-white p-2 rounded">
        Descargar Recibo en PDF
      </button>
    </div>
  );
};

export default PaymentReceipt;