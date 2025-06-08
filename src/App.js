import { useEffect, useState } from 'react';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import AdminPanel from './components/Dashboard/AdminPanel';
import UnitManager from './components/Dashboard/UnitManagement';
import ExpensesCalculator from './components/Expenses/ExpenseCalculator';
import ExpenseManager from './components/Expenses/ExpenseManager';
import AppLayout from './components/Layout/AppLayout';
import { supabase } from './utils/supabaseClient';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [units, setUnits] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminPanel user={user} units={units} setUnits={setUnits} expenses={expenses} setExpenses={setExpenses} />;
      case 'unidades':
        return <UnitManager user={user} units={units} setUnits={setUnits} />;
      case 'gastos':
        return <ExpenseManager user={user} expenses={expenses} setExpenses={setExpenses} />;
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
        onLoginSuccess={(userData) => {
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
      onLogout={async () => {
        await supabase.auth.signOut();
        setUser(null);
      }}
    >
      {renderContent()}
    </AppLayout>
  );
};

export default App;
