import React, { useState } from 'react';

const PaymentForm = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    unit: '',
    month: '',
    paymentMethod: 'credit'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      transactionId: `txn_${Math.random().toString(36).substring(2, 10)}`,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString(),
      method: formData.paymentMethod,
      unit: formData.unit,
      month: formData.month
    };
    onSuccess(transaction);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Unidad Funcional</label>
          <select
            value={formData.unit}
            onChange={(e) => setFormData({...formData, unit: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione unidad</option>
            <option value="A1">Unidad A1</option>
            <option value="A2">Unidad A2</option>
            <option value="B1">Unidad B1</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mes</label>
          <select
            value={formData.month}
            onChange={(e) => setFormData({...formData, month: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione mes</option>
            <option value="Enero 2023">Enero 2023</option>
            <option value="Febrero 2023">Febrero 2023</option>
            <option value="Marzo 2023">Marzo 2023</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Monto</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="credit">Tarjeta de Crédito</option>
            <option value="debit">Tarjeta de Débito</option>
            <option value="transfer">Transferencia Bancaria</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Procesar Pago
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;

// DONE