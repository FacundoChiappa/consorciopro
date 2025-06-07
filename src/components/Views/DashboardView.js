import React from 'react';
import QuickActions from '../Dashboard/QuickActions';
import RecentPayments from '../Payments/RecentPayments';
import ExpenseSummary from '../Expenses/ExpenseSummary';

const DashboardView = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {user.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Panel de administración del consorcio
        </p>
        
        <div className="mt-6 bg-blue-50 rounded-lg p-4 inline-block">
          <p className="text-sm font-medium text-blue-800">
            Alias para transferencias: 
            <span className="ml-2 bg-white px-3 py-1 rounded-md text-blue-600 font-bold">
              consorcio{user.buildingId}
            </span>
          </p>
        </div>
      </div>

      <QuickActions />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentPayments />
        <ExpenseSummary />
      </div>
    </div>
  );
};

export default DashboardView;

// DONE