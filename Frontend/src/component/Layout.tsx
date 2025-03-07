import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Header from './Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
    <Header/>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
        </>
  );
};

export default Layout;