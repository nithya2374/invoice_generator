import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/admindashboard';
import AdminLayout from '../Layout/AdminLayout';
import AdminRoute  from '../components/Common/AdminRoute';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import VisitorHome from '../pages/VisitorHome';

const AdminRoutes = () => {
  return (
    <Routes>  
      <Route element={<AdminRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AdminRoutes;
