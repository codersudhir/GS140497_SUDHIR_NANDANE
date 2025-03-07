import React from 'react';
import Sidebar from './Sidebar';
import Header from './Navbar';

// Layout component that wraps the main content with a header and sidebar
const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      {/* Header component */}
      <Header/>
      <div className="flex h-screen">
        {/* Sidebar component */}
        <Sidebar />
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </>
  );
};

export default Layout;