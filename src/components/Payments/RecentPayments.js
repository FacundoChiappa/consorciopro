import React from 'react';

const RecentPayments = () => {
  const payments = [
    {
      id: 1,
      unit: 'A1',
      amount: 12500,
      date: '2023-05-10',
      month: 'Mayo 2023',
      status: 'completed'
    },
    {
      id: 2,
      unit: 'A2',
      amount: 12500,
      date: '2023-05-12',
      month: 'Mayo 2023',
      status: 'completed'
    },
    {
      id: 3,
      unit: 'B1',
      amount: 11800,
      date: '2023-05-15',
      month: 'Mayo 2023',
      status: 'pending'
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Pagos Recientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    payment.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status === 'completed' ? 'Completado' : 'Pendiente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPayments;