
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import UserHome from '../pages/user/UserHome';
import Profile from '../pages/user/Profile';
import CreateInvoice from '../pages/invoices/Createinvoice';
import MyInvoices from '../pages/invoices/Myinvoice';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import VisitorHome from '../pages/VisitorHome';
import UserLayout from '../Layout/UserLayout';
import AdminRoutes from './AdminRoutes'; 


const AppRoutes = () => {
  return (
      
    <Routes>    
      <Route path="/" element={<VisitorHome/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      
      {/*  Mount Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route path="/user" element={<UserLayout />}>
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/invoices/create" element={<CreateInvoice />} />
          <Route path="/user/invoices/mine" element={<MyInvoices />} />  
        </Route>
      </Route>

    </Routes>

    
  );
};

export default AppRoutes;
