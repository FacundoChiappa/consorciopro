import React from 'react';

const WelcomeSection = ({ user }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido, {user.name}!
          </h1>
          <p className="mt-1 text-gray-600">
            Panel de administración del consorcio
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-800">
              Alias para transferencias: 
              <span className="ml-2 bg-white px-3 py-1 rounded-md text-blue-600 font-bold">
                consorcio{user.buildingId}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex flex-wrap gap-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Subir recibo de pago
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Generar recibo PDF
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Ver historial de pagos
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;

// DONE