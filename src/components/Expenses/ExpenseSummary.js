import React from 'react';

const ExpenseSummary = () => {
  const expenses = [
    { category: 'Mantenimiento', amount: 5000, percentage: 35 },
    { category: 'Limpieza', amount: 3000, percentage: 21 },
    { category: 'Seguridad', amount: 4000, percentage: 28 },
    { category: 'Servicios', amount: 2000, percentage: 14 }
  ];

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Gastos</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">Total gastado este mes</span>
          <span className="text-lg font-bold text-gray-900">
            {total.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          {expenses.map((expense, index) => (
            <div 
              key={index}
              className={`h-4 rounded-full ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-yellow-500' : 'bg-purple-500'}`}
              style={{ width: `${expense.percentage}%`, display: 'inline-block' }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-yellow-500' : 'bg-purple-500'}`} />
              <span className="text-sm font-medium text-gray-700">{expense.category}</span>
            </div>
            <span className="text-sm text-gray-500">
              {expense.amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})} ({expense.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseSummary;