import { PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../../utils/supabaseClient';

const PaymentManager = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    unidad: '',
    mes: '',
    monto: '',
    metodo_pago: '',
  });

  useEffect(() => {
    if (user) fetchPayments();
  }, [user]); // <- Importante agregar user como dependencia

  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id) // <- Trae solo pagos del usuario actual
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setPayments(data);
    }
  };

  const handleAddPayment = async () => {
    if (!newPayment.unidad || !newPayment.mes || !newPayment.monto || !newPayment.metodo_pago) {
      toast.error('Completa todos los campos.');
      return;
    }

    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          ...newPayment,
          monto: parseFloat(newPayment.monto),
          user_id: user.id, // <- Asocia al usuario
        }
      ])
      .select();

    if (error) {
      toast.error('Error agregando pago.');
      console.error(error);
    } else {
      setPayments([data[0], ...payments]);
      toast.success('Pago agregado exitosamente!');
      setNewPayment({ unidad: '', mes: '', monto: '', metodo_pago: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeletePayment = async (id) => {
    const confirmDelete = window.confirm('¿Seguro querés eliminar este pago?');

    if (!confirmDelete) return;

    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id); // <- Solo deja borrar los pagos de ese usuario

    if (error) {
      toast.error('Error al eliminar pago.');
      console.error(error);
    } else {
      setPayments(payments.filter((payment) => payment.id !== id));
      toast.success('Pago eliminado exitosamente!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Gestión de Pagos</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="w-5 h-5" />
          Agregar Pago
        </button>
      </div>

      {/* Tabla de Pagos */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Unidad</th>
            <th>Mes</th>
            <th>Monto</th>
            <th>Método de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="py-2">{payment.unidad}</td>
              <td className="py-2">{payment.mes}</td>
              <td className="py-2">${Number(payment.monto).toLocaleString('es-AR')}</td>
              <td className="py-2">{payment.metodo_pago}</td>
              <td className="py-2">
                <button
                  onClick={() => handleDeletePayment(payment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Pago</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Unidad"
                value={newPayment.unidad}
                onChange={(e) => setNewPayment({ ...newPayment, unidad: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <input
                type="text"
                placeholder="Mes"
                value={newPayment.mes}
                onChange={(e) => setNewPayment({ ...newPayment, mes: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <input
                type="number"
                placeholder="Monto"
                value={newPayment.monto}
                onChange={(e) => setNewPayment({ ...newPayment, monto: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <select
                value={newPayment.metodo_pago}
                onChange={(e) => setNewPayment({ ...newPayment, metodo_pago: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Selecciona el tipo de pago</option>
                <option value="Debito">Tarjeta Débito</option>
                <option value="Credito">Tarjeta Crédito</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Efectivo">Efectivo</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddPayment}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManager;
