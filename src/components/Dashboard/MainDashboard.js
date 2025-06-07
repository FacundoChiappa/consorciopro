import ExpenseSection from '../Expenses/ExpenseSection';
import PaymentSection from '../Payment/PaymentSection';
import UnitManagement from '../Units/UnitManagement';
import Navbar from './Navbar';
import QuickActions from './QuickActions';
import WelcomeSection from './WelcomeSection';

const MainDashboard = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection user={user} />
        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActions />
        </div>

        <div className="mt-12 space-y-8">
          <PaymentSection />
          <ExpenseSection />
          <UnitManagement />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;