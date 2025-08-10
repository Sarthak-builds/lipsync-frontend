import React, { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/UI/Sidebar';
import ProtectedRoute from './ProtectedRoute';

interface LayoutProps {
  children?: ReactNode; // Explicitly allow children for flexibility
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="flex flex-col h-full w-full min-h-screen overflow-x-hidden pl-1  bg-black">

     
      <div className=" flex h-full min-h-screen">
     <Sidebar />
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