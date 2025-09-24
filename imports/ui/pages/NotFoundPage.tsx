import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

export const NotFoundPage = () => {
  return (
    <MainLayout title="Page Not Found">
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to your posts</Link>
    </MainLayout>
  );
};