import React, { useState } from 'react';

const PaymentGateway = ({ 
  amount = 0, 
  onSuccess = (transaction) => console.log('Pago completado:', transaction)
}) => {
  const [paymentData, setPaymentData] = useState({
    amount: amount,
    unit: '',
    month: '',
    paymentMethod: 'credit'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if (!paymentData.unit || !paymentData.month) return;

    setIsProcessing(true);
    
    // Simulación de pago procesado
    setTimeout(() => {
      const transaction = {
        transactionId: `txn_${Math.random().toString(36).substring(2, 10)}`,
        amount: paymentData.amount,
        date: new Date().toISOString(),
        method: paymentData.paymentMethod,
        unit: paymentData.unit,
        month: paymentData.month,
        status: 'completed'
      };
      
      setIsProcessing(false);
      onSuccess(transaction);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Pasarela de Pagos</h3>
        <span className="text-sm text-blue-600">Forma 100% segura</span>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Total</span>
            <p className="text-2xl font-bold text-gray-800">
              {paymentData.amount.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 2
              })}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Unidad Funcional</label>
            <select
              value={paymentData.unit}
              onChange={(e) => setPaymentData({...paymentData, unit: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isProcessing}
            >
              <option value="">Seleccione su unidad</option>
              <option value="A1">Unidad A1</option>
              <option value="A2">Unidad A2</option>
              <option value="B1">Unidad B1</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Mes a Pagar</label>
            <select
              value={paymentData.month}
              onChange={(e) => setPaymentData({...paymentData, month: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isProcessing}
            >
              <option value="">Seleccione el mes</option>
              <option value="Enero 2023">Enero 2023</option>
              <option value="Febrero 2023">Febrero 2023</option>
              <option value="Marzo 2023">Marzo 2023</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
            <select
              value={paymentData.paymentMethod}
              onChange={(e) => setPaymentData({...paymentData, paymentMethod: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isProcessing}
            >
              <option value="credit">Tarjeta de Crédito</option>
              <option value="debit">Tarjeta de Débito</option>
              <option value="transfer">Transferencia Bancaria</option>
            </select>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={!paymentData.unit || !paymentData.month || isProcessing}
          className={`w-full py-3 px-4 rounded-lg shadow-sm transition-all duration-200 ${
            isProcessing
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
          } ${
            (!paymentData.unit || !paymentData.month) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando pago...
            </span>
          ) : (
            'Confirmar Pago'
          )}
        </button>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Protegido con encriptación SSL</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;

// DONE