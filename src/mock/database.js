export const buildings = [
  {
    id: 1,
    name: "Edificio Principal",
    address: "Calle Falsa 123",
    units: [
      { id: 1, number: "A1", owner: "Juan Pérez", email: "juan@email.com", phone: "1122334455", percentage: 25 },
      { id: 2, number: "A2", owner: "María Gómez", email: "maria@email.com", phone: "1199887766", percentage: 25 },
      { id: 3, number: "B1", owner: "Carlos López", email: "carlos@email.com", phone: "1155443322", percentage: 25 },
      { id: 4, number: "B2", owner: "Ana Rodríguez", email: "ana@email.com", phone: "1166778899", percentage: 25 }
    ]
  }
];

// Inicializar gastos en localStorage si no existen
if (!localStorage.getItem('expenses')) {
  localStorage.setItem('expenses', JSON.stringify([
    { id: 1, description: "Limpieza", amount: 15000, type: "ordinary", date: new Date().toISOString().split('T')[0] },
    { id: 2, description: "Ascensor", amount: 8000, type: "ordinary", date: new Date().toISOString().split('T')[0] },
    { id: 3, description: "Pintura", amount: 25000, type: "extraordinary", date: new Date().toISOString().split('T')[0] }
  ]));
}

export const getExpenses = () => JSON.parse(localStorage.getItem('expenses')) || [];
export const saveExpenses = (expenses) => localStorage.setItem('expenses', JSON.stringify(expenses));

