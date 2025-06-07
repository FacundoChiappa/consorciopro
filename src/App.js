import { useState } from 'react';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
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
  const [isRegistering, setIsRegistering] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminPanel user={user} units={units} setUnits={setUnits} expenses={expenses} setExpenses={setExpenses} />;
      case 'unidades':
        return <UnitManager user={user} units={units} setUnits={setUnits} />; // <-- le paso user
      case 'gastos':
        return <ExpenseManager user={user} expenses={expenses} setExpenses={setExpenses} />; // <-- le paso user
      case 'calcular-expensas':
        return <ExpensesCalculator units={units} expenses={expenses} />;
      default:
        return <AdminPanel user={user} units={units} setUnits={setUnits} expenses={expenses} setExpenses={setExpenses} />;
    }
  };

  if (!user) {
    return isRegistering ? (
      <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
    ) : (
      <LoginForm
        onLogin={(userData) => {
          setUser(userData);
          setCurrentView('dashboard');
        }}
        onSwitchToRegister={() => setIsRegistering(true)}
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
