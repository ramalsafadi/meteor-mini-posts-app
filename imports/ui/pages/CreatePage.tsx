import React, 'react';
import { useHistory } from 'react-router-dom'; // For redirecting after success
import { Meteor } from 'meteor/meteor';
import { MainLayout } from '../layouts/MainLayout';

// In React Router v5, we get history from this hook
import { PostForm } from '../components/PostForm';

export const CreatePage = () => {
  const history = useHistory();

  const handleSave = (title: string, body: string) => {

    Meteor.call('posts.insert', { title, body }, (error) => {
      if (error) {
        // TODO: make a better notification system
        alert(`Error creating post: ${error.reason}`);
      } else {
        history.push('/');
      }
    });
  };

  return (
    <MainLayout title="Create a New Post">
      <PostForm onSave={handleSave} />
    </MainLayout>
  );
};