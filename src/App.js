import { useState } from 'react';
import LoginForm from './components/Auth/LoginForm';
import AdminPanel from './components/Dashboard/AdminPanel';
import UnitManager from './components/Dashboard/UnitManagement';
import ExpensesCalculator from './components/Expenses/ExpenseCalculator';
import ExpenseManager from './components/Expenses/ExpenseManager';
import AppLayout from './components/Layout/AppLayout';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [units, setUnits] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminPanel units={units} setUnits={setUnits} expenses={expenses} setExpenses={setExpenses} />;
      case 'unidades':
        return <UnitManager units={units} setUnits={setUnits} />;
      case 'gastos':
        return <ExpenseManager expenses={expenses} setExpenses={setExpenses} />;
      case 'calcular-expensas':
        return <ExpensesCalculator units={units} expenses={expenses} />;
      default:
        return <AdminPanel units={units} setUnits={setUnits} expenses={expenses} setExpenses={setExpenses} />;
    }
  };

  if (!user) {
    return (
      <LoginForm
        onLogin={(userData) => {
          setUser(userData);
          setCurrentView('dashboard');
        }}
      />
    );
  }

  return (
    <AppLayout
      user={user}
      currentView={currentView}
      setCurrentView={setCurrentView}
      onLogout={() => setUser(null)}
    >
      {renderContent()}
    </AppLayout>
  );
};

export default App;