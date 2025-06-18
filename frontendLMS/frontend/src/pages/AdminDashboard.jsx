import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Make sure the import path is correct

const AdminDashboard = () => {
  const { user } = useAuth(); // Ensure useAuth returns an object with 'user'

  return (
    <div>
      Admin Dashboard - {user?.name || 'Guest'}
    </div>
  );
};

export default AdminDashboard;

