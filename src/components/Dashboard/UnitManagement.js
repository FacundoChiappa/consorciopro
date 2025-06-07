import { PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../../utils/supabaseClient'; // Acordate de ajustar bien el path

const UnitManagement = () => {
  const [units, setUnits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUnit, setNewUnit] = useState({
    nombre: '',
    telefono: '',
    email: '',
    porcentaje: '',
    piso: '',
  });

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setUnits(data);
    }
  };

  const handleAddUnit = async () => {
    if (!newUnit.nombre || !newUnit.telefono || !newUnit.email || !newUnit.porcentaje || !newUnit.piso) {
      toast.error('Completa todos los campos.');
      return;
    }

    const { data, error } = await supabase
      .from('units')
      .insert([newUnit])
      .select(); // Necesario para que devuelva el nuevo registro

    if (error) {
      toast.error('Error agregando unidad.');
      console.error(error);
    } else {
      setUnits([data[0], ...units]); // Agrego la nueva unidad arriba
      toast.success('Unidad agregada exitosamente!');
      setNewUnit({
        nombre: '',
        telefono: '',
        email: '',
        porcentaje: '',
        piso: '',
      });
      setIsModalOpen(false);
    }
  };

  const handleDeleteUnit = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro que querés eliminar esta unidad?');

    if (!confirmDelete) return;

    const { error } = await supabase
      .from('units')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Error al eliminar unidad.');
      console.error(error);
    } else {
      setUnits(units.filter((unit) => unit.id !== id));
      toast.success('Unidad eliminada exitosamente!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Gestión de Unidades</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="w-5 h-5" />
          Agregar Unidad
        </button>
      </div>

      {/* Tabla de Unidades */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>% Expensas</th>
            <th>Piso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {units.map((unit) => (
            <tr key={unit.id}>
              <td className="py-2">{unit.nombre}</td>
              <td className="py-2">{unit.telefono}</td>
              <td className="py-2">{unit.email}</td>
              <td className="py-2">{unit.porcentaje}%</td>
              <td className="py-2">{unit.piso}</td>
              <td className="py-2">
                <button
                  onClick={() => handleDeleteUnit(unit.id)}
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
            <h3 className="text-lg font-semibold mb-4">Agregar Nueva Unidad</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={newUnit.nombre}
                onChange={(e) => setNewUnit({ ...newUnit, nombre: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={newUnit.telefono}
                onChange={(e) => setNewUnit({ ...newUnit, telefono: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUnit.email}
                onChange={(e) => setNewUnit({ ...newUnit, email: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <input
                type="number"
                placeholder="% Expensas"
                value={newUnit.porcentaje}
                onChange={(e) => setNewUnit({ ...newUnit, porcentaje: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <input
                type="text"
                placeholder="Piso"
                value={newUnit.piso}
                onChange={(e) => setNewUnit({ ...newUnit, piso: e.target.value })}
                className="w-full border border-gray-300 rounded p-2"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddUnit}
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

export default UnitManagement;
