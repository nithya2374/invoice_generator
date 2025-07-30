
import AppRoutes from './routes/AppRoutes';
import AdminRoutes from './routes/AdminRoutes';
import {AuthProvider} from "./context/AuthContext";


function App() {
  return (
      
        <AuthProvider>
            <AppRoutes />
            <AdminRoutes/>
        </AuthProvider>
  );
}

export default App;
