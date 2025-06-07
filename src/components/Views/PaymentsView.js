import React, { useState } from 'react';
import PaymentForm from '../Payment/PaymentForm';

const PaymentsView = ({ user }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentSuccess = (transaction) => {
    setPaymentStatus({
      success: true,
      message: `Pago de ${transaction.amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})} procesado correctamente`,
      transactionId: transaction.transactionId
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Pasarela de Pagos</h2>
          <p className="text-gray-600 mt-1">Complete los datos para procesar el pago</p>
        </div>

        <div className="p-6">
          {paymentStatus ? (
            <div className={`p-4 rounded-lg ${paymentStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex items-center">
                <svg className={`h-5 w-5 ${paymentStatus.success ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={paymentStatus.success ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                </svg>
                <span className="ml-2 font-medium">{paymentStatus.message}</span>
              </div>
              {paymentStatus.success && (
                <div className="mt-2 text-sm">
                  ID de transacción: {paymentStatus.transactionId}
                </div>
              )}
            </div>
          ) : (
            <PaymentForm 
              user={user} 
              onSuccess={handlePaymentSuccess} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;