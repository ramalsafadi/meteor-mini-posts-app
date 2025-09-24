import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { Input, Button } from './styled';
import { Modal } from './Modal';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
const ToggleForm = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.sizes.bodyMedium};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.sm} 0 0 0;
  &:hover { text-decoration: underline; }
`;
const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
  font-size: ${({ theme }) => theme.fonts.sizes.bodyMedium};
  text-align: center;
`;
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;
const Username = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const SignUpForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    Meteor.call('createUser', { username, password }, (err) => {
      if (err) {
        setError(err.reason || 'Failed to create account');
      } else {
        Meteor.loginWithPassword(username, password, (loginErr) => {
          if (loginErr) {
            setError(loginErr.reason || 'Account created, but auto-login failed.');
          }
        });
      }
    });
  };
  return (<div><FormContainer as="form" onSubmit={handleSubmit}><Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />{error && <ErrorMessage>{error}</ErrorMessage>}<Button type="submit">Sign Up</Button></FormContainer><ToggleForm onClick={onToggleForm}>Already have an account? Sign In</ToggleForm></div>);
};

const SignInForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); setError(''); Meteor.loginWithPassword(username, password, (err) => { if (err) { setError(err.reason || 'Failed to sign in'); } }); };
  return (<div><FormContainer as="form" onSubmit={handleSubmit}><Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />{error && <ErrorMessage>{error}</ErrorMessage>}<Button type="submit">Sign In</Button></FormContainer><ToggleForm onClick={onToggleForm}>Don't have an account? Sign Up</ToggleForm></div>);
};

const AuthForms = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const toggleForm = () => setShowSignIn(!showSignIn);
  return showSignIn ? <SignInForm onToggleForm={toggleForm} /> : <SignUpForm onToggleForm={toggleForm} />;
};

export const Auth = () => {
  const user = useTracker(() => Meteor.user());
  const [isModalOpen, setModalOpen] = useState(false);

  if (user) {
    return (
      <UserInfoContainer>
        <Username>{user.username}</Username>
        <Button variant="secondary" onClick={() => Meteor.logout()}>Sign Out</Button>
      </UserInfoContainer>
    );
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Sign In / Sign Up</Button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AuthForms />
      </Modal>
    </>
  );
};