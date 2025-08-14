
import AppRoutes from './routes/AppRoutes';
import AdminRoutes from './routes/AdminRoutes';
import {AuthProvider} from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"



function App() {
  return (
      
        <AuthProvider>
            <AppRoutes />
            <AdminRoutes/>
            <ToastContainer position="top-right" autoClose={3000} /> 
        </AuthProvider>
  );
}

export default App;
