import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient'; // Asegurate del path correcto

const ExpenseCalculator = () => {
  const [units, setUnits] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    fetchUnits();
    fetchExpenses();
  }, []);

  const fetchUnits = async () => {
    const { data, error } = await supabase
      .from('units')
      .select('*');

    if (error) console.error('Error fetching units:', error);
    else setUnits(data);
  };

  const fetchExpenses = async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*');

  if (error) console.error('Error fetching expenses:', error);
  else setExpenses(data);
};


  useEffect(() => {
    if (expenses.length && units.length) {
      const filteredExpenses = expenses.filter(expense => 
        expense.date && expense.date.startsWith(month) // Filtramos gastos por el mes
      );

      const totalOrdinary = filteredExpenses
        .filter(e => e.tipo === 'Ordinario')
        .reduce((sum, e) => sum + Number(e.amount), 0);

      const totalExtraordinary = filteredExpenses
        .filter(e => e.tipo === 'Extraordinario')
        .reduce((sum, e) => sum + Number(e.amount), 0);

      const results = units.map(unit => ({
        ...unit,
        ordinary: Math.round(totalOrdinary * unit.porcentaje / 100),
        extraordinary: Math.round(totalExtraordinary * unit.porcentaje / 100),
        total: Math.round((totalOrdinary + totalExtraordinary) * unit.porcentaje / 100),
      }));

      setCalculations(results);
    }
  }, [expenses, units, month]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Calculadora de Expensas</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Mes:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">Gastos Ordinarios</h3>
          <p className="text-2xl font-bold">
            ${calculations.reduce((sum, unit) => sum + unit.ordinary, 0).toLocaleString('es-AR')}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-medium text-yellow-800">Gastos Extraordinarios</h3>
          <p className="text-2xl font-bold">
            ${calculations.reduce((sum, unit) => sum + unit.extraordinary, 0).toLocaleString('es-AR')}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ordinarias</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Extraordinarias</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {calculations.map((unit) => (
              <tr key={unit.id}>
                <td className="px-6 py-4 whitespace-nowrap">{unit.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${unit.ordinary.toLocaleString('es-AR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${unit.extraordinary.toLocaleString('es-AR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  ${unit.total.toLocaleString('es-AR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseCalculator;
