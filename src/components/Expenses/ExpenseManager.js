import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const ExpenseManager = ({ user }) => {  // <-- Le pasamos `user`
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
    tipo: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) console.error('Error fetching expenses:', error);
    else setExpenses(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.date || !formData.tipo) {
      alert('Completa todos los campos obligatorios.');
      return;
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          ...formData,
          amount: parseFloat(formData.amount),
          user_id: user.id, // <-- Muy importante: atamos el gasto al usuario
        }
      ])
      .select();

    if (error) {
      console.error('Error agregando gasto:', error);
    } else {
      setExpenses([data[0], ...expenses]);
      setFormData({
        description: '',
        amount: '',
        date: '',
        category: '',
        tipo: '',
      });
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error eliminando gasto:', error);
    } else {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestor de Gastos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Monto"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Categoría"
          className="border p-2 rounded"
        />
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecciona tipo de gasto</option>
          <option value="Ordinario">Ordinario</option>
          <option value="Extraordinario">Extraordinario</option>
        </select>

        <button type="submit" className="col-span-1 md:col-span-2 bg-green-500 text-white p-2 rounded">
          Agregar Gasto
        </button>
      </form>

      {/* Tabla de gastos */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Lista de Gastos</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Monto</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">{expense.description}</td>
                <td className="border px-4 py-2">{expense.category}</td>
                <td className="border px-4 py-2">{expense.tipo}</td>
                <td className="border px-4 py-2">${Number(expense.amount).toLocaleString('es-AR')}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseManager;
