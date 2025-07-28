import React, { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';

import ProtectedRoute from './ProtectedRoute';
import Sidebar from '../components/UI/Sidebar';

interface LayoutProps {
  children?: ReactNode; // Explicitly allow children for flexibility
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="flex flex-col h-full w-full min-h-screen px-2 py-1 bg-black">
        <Navbar />

     
      <div className=" flex bg-black h-full min-h-screen">
     <Sidebar/>
        <main className="h-full w-full min-h-screen">
            <ProtectedRoute>
         { children || <Outlet /> }
         </ProtectedRoute>
        </main>
      </div>
    </div>
  );
};

export default Layout;