import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

const styles = {
  container: { border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '8px', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' },
  error: { color: 'red' },
  toggle: { color: 'blue', cursor: 'pointer', marginTop: '10px' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
};

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
      }
    });
  };

  return (
    <div style={styles.container}>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p onClick={onToggleForm} style={styles.toggle}>Already have an account? Sign In</p>
    </div>
  );
};

const SignInForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        setError(err.reason || 'Failed to sign in');
      }
    });
  };

  return (
    <div style={styles.container}>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
      <p onClick={onToggleForm} style={styles.toggle}>Don't have an account? Sign Up</p>
    </div>
  );
};

export const Auth = () => {
  const user = useTracker(() => Meteor.user());
  const [showSignIn, setShowSignIn] = useState(true);

  if (user) {
    return (
      <div style={styles.userInfo}>
        <span>Welcome, {user.username}</span>
        <button onClick={() => Meteor.logout()} style={styles.button}>Sign Out</button>
      </div>
    );
  }

  const toggleForm = () => setShowSignIn(!showSignIn);

  return showSignIn ? <SignInForm onToggleForm={toggleForm} /> : <SignUpForm onToggleForm={toggleForm} />;
};