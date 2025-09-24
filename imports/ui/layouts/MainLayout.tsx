import React, { useState, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { Auth } from '../components/Auth';

const LayoutContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;
const dazzlingAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const AppTitle = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.h0};
  font-weight: ${({ theme }) => theme.fonts.weights.bold}; 
  
  /* The Gradient */
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.error}, 
    #ff7a00, 
    #d62976, 
    ${({ theme }) => theme.colors.primary} 
  );
  
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  
  /* Apply the animation */
  background-size: 300% 300%; /* Make the background larger so it has room to move */
  animation: ${dazzlingAnimation} 8s ease infinite; /* Apply the keyframes */
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  // On mobile, hide the nav as auth takes priority
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;


const Content = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const PageTitle = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.h1};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
const DesktopNav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;
const HamburgerButton = styled.button`
  display: none; // Hidden by default
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block; // Visible only on mobile
  }
  z-index: 1100; // Above the backdrop
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;
const Footer = styled.footer`
  text-align: center;
  position: fixed;
  bottom: 10px;
  padding-top: ${({ theme }) => theme.spacing.xl};

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fonts.sizes.caption};
`;
const MobileNav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 250ms ease-in-out;
  z-index: 1050; // Above backdrop, below hamburger
`;

const StyledNavLink = styled(NavLink)`
  font-size: ${({ theme }) => theme.fonts.sizes.bodyLarge};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <LayoutContainer>
      <Header>
        <AppTitle>Mini Posts</AppTitle>
        <DesktopNav>
          <StyledNavLink to="/" exact activeClassName="active">My Posts</StyledNavLink>
          <StyledNavLink to="/new" activeClassName="active">Create Post</StyledNavLink>
        </DesktopNav>
        <div style={{  display: 'flex', alignItems: 'center', gap: '16px' ,paddingLeft:'50px'}}>
          <Auth />
          <HamburgerButton onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {/* Simple SVG for Hamburger Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </HamburgerButton>
        </div>
      </Header>

      {/* Mobile Menu rendered outside the header flow */}
      <MobileNav $isOpen={isMobileMenuOpen}>
        <StyledNavLink to="/" exact activeClassName="active" onClick={() => setMobileMenuOpen(false)}>My Posts</StyledNavLink>
        <StyledNavLink to="/new" activeClassName="active" onClick={() => setMobileMenuOpen(false)}>Create Post</StyledNavLink>
      </MobileNav>

      <main>
        <PageTitle>{title}</PageTitle>
        <Content>{children}</Content>
      </main>
      <Footer>
        Made by Eng. RAM ALSAFADI with lots of love ❤️ and coffee ☕
      </Footer>
    </LayoutContainer>
  );
};