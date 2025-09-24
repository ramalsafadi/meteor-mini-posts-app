import React, { useState, useEffect } from 'react';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minHeight: '150px',
    fontFamily: 'sans-serif',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  error: {
    color: 'red',
    marginTop: '5px',
  },
};

interface PostFormProps {
  post?: { 
    _id: string;
    title: string;
    body: string;
  };
  onSave: (title: string, body: string) => void;
  onCancel?: () => void; 
}

export const PostForm: React.FC<PostFormProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  // This `useEffect` hook pre-fills the form if we are in "Edit" mode.
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // client-side validation
    if (!title || !body) {
      setError('Title and body are required.');
      return;
    }

    setError('');
    onSave(title, body);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <p style={styles.error}>{error}</p>}
      <div>
        <label htmlFor="title" style={styles.label}>Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <label htmlFor="body" style={styles.label}>Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={styles.textarea}
        />
      </div>
      <div>
        <button type="submit" style={styles.button}>
          {post ? 'Save Changes' : 'Create Post'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{...styles.button, backgroundColor: '#6c757d', marginLeft: '10px'}}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};