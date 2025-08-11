import React, { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/UI/Sidebar';
import ProtectedRoute from './ProtectedRoute';

interface LayoutProps {
  children?: ReactNode; //ye...it is used for exlicity allowing children to be flexible as react node or component type thing
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-hidden">
        <ProtectedRoute>
          {children || <Outlet />}
        </ProtectedRoute>
      </main>
    </div>
  );
};

export default Layout;