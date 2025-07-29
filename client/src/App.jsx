
import AppRoutes from './routes/AppRoutes';
import AdminRoutes from './routes/AdminRoutes';
import {AuthProvider} from "./context/AuthContext";
//import AdminRoute from "./routes/AdminRoutes";

function App() {
  return (
      
        <AuthProvider>
            <AppRoutes />
            <AdminRoutes/>
        </AuthProvider>
  );
}

export default App;
