import { users } from '../mock/database';

export const authenticateUser = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { error: "Credenciales inválidas" };
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    buildingId: user.buildingId,
    unitId: user.unitId
  };
};