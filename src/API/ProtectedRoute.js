import { Navigate } from 'react-router-dom';
import AuthService from './AuthApi'; // Adjust the import based on your file structure

const ProtectedRoute = ({ element }) => {
  const currentUser = AuthService.getCurrentUser();

  return currentUser ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;