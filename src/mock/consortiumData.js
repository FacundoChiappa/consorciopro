export const buildings = [
  {
    id: 1,
    name: "Edificio Central",
    address: "Av. Principal 1234",
    units: [
      { id: 1, number: "A1", owner: "Juan Pérez", percentage: 5.2 },
      { id: 2, number: "A2", owner: "María Gómez", percentage: 5.2 }
    ]
  }
];

export const expenses = [
  {
    id: 1,
    description: "Limpieza mensual",
    amount: 15000,
    type: "ordinary",
    date: "2023-05-15"
  }
];

export const payments = [
  {
    id: 1,
    unit: "A1",
    amount: 12500,
    date: "2023-05-10",
    month: "Mayo 2023"
  }
];