
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== role) return <Navigate to="/"/>;
  return <Outlet />;
};

export default ProtectedRoute;
