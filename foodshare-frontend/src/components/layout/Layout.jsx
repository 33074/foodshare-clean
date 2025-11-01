import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Footer.css';

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

// --- THIS IS THE FIX ---
// We make the main element full-width by default
const mainStyle = {
  flex: 1,
  width: '100%',
  padding: 0,
  margin: 0,
};

const Layout = () => {
  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
