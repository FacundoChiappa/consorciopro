import React from 'react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Generar Recibo PDF',
      description: 'Crea y descarga recibos en formato PDF',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      action: 'generateReceipt'
    },
    {
      title: 'Subir Recibo',
      description: 'Sube comprobantes de pago',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      action: 'uploadReceipt'
    },
    {
      title: 'Calcular Expensas',
      description: 'Calcula las expensas del mes actual',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      action: 'calculateExpenses'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <div 
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
          onClick={() => console.log('Action:', action.action)}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              {action.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{action.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;