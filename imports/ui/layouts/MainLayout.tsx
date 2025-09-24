import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Auth } from '../components/Auth';

const styles = {
  layout: {
    fontFamily: 'sans-serif',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#007bff',
  },
  activeNavLink: {
    textDecoration: 'underline',
  },
  content: {
    marginTop: '20px',
  },
};

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <h1>Mini Posts App</h1>
        <nav style={styles.nav}>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink)}
          >
            My Posts
          </NavLink>
          <NavLink
            to="/new"
            style={({ isActive }) => (isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink)}
          >
            Create Post
          </NavLink>
        </nav>
   <Auth />
      </header>
      <div style={styles.content}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};