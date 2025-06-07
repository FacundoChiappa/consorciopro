import { useState } from 'react';

const UnitManager = () => {
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    unitNumber: '',
    floor: '',
    ownerName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUnits([...units, formData]);
    setFormData({
      unitNumber: '',
      floor: '',
      ownerName: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestor de Unidades</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="unitNumber"
          value={formData.unitNumber}
          onChange={handleChange}
          placeholder="Número de Unidad"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          placeholder="Piso"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="Nombre del Propietario"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border p-2 rounded"
        />
        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-500 text-white p-2 rounded">
          Agregar Unidad
        </button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-2">Lista de Unidades</h3>
        <ul className="list-disc pl-6">
          {units.map((unit, index) => (
            <li key={index} className="mb-2">
              Unidad {unit.unitNumber}, Piso {unit.floor} - {unit.ownerName} ({unit.email}, {unit.phone})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UnitManager;
