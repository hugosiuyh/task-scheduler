import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

const Layout: React.FC = () => {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
};

export default Layout;
