import { useState } from 'react';
import ExpenseManager from '../Expenses/ExpenseManager';
import PaymentManager from './PaymentManager';
import UnitManagement from './UnitManagement';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('expenses');
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-6 py-4 font-medium ${activeTab === 'expenses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Gastos
        </button>
        <button
          onClick={() => setActiveTab('units')}
          className={`px-6 py-4 font-medium ${activeTab === 'units' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Unidades
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-6 py-4 font-medium ${activeTab === 'payments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Pagos
        </button>
      </div>
      <div className="p-6">
        {activeTab === 'expenses' && <ExpenseManager />}
        {activeTab === 'units' && <UnitManagement />}
        {activeTab === 'payments' && <PaymentManager />}
      </div>
    </div>
  );
};
export default AdminPanel;