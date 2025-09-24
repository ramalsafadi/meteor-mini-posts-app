import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Input, Textarea } from './styled';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
`;

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
  // THIS IS THE LOGIC THAT WAS MISSING
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) {
      setError('Title and body are required.');
      return;
    }
    setError('');
    onSave(title, body);
  };
  // END OF MISSING LOGIC

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="body">Body</Label>
        <Textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} />
      </FormGroup>
      <ButtonGroup>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
        <Button type="submit">{post ? 'Save Changes' : 'Create Post'}</Button>
      </ButtonGroup>
    </FormContainer>
  );
};