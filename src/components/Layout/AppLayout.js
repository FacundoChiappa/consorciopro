
const AppLayout = ({ user, currentView, setCurrentView, onLogout, children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold border-b">
          ConsorcioPro
        </div>
        <nav className="p-4 space-y-2">
          <button
            className={`block w-full text-left p-2 rounded ${currentView === 'dashboard' ? 'bg-blue-100' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`block w-full text-left p-2 rounded ${currentView === 'gastos' ? 'bg-blue-100' : ''}`}
            onClick={() => setCurrentView('gastos')}
          >
            Gastos
          </button>
          <button
            className={`block w-full text-left p-2 rounded ${currentView === 'unidades' ? 'bg-blue-100' : ''}`}
            onClick={() => setCurrentView('unidades')}
          >
            Unidades
          </button>
          <button
            className={`block w-full text-left p-2 rounded ${currentView === 'calcular-expensas' ? 'bg-blue-100' : ''}`}
            onClick={() => setCurrentView('calcular-expensas')}
          >
            Calcular Expensas
          </button>
        </nav>
        <div className="p-4 border-t">
          <span className="block mb-2">Administrador</span>
          <button
            onClick={onLogout}
            className="text-red-500 hover:underline"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
