import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PostsCollection } from '../../api/posts/collection';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/styled';

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PostCard = styled(Card)`
  text-decoration: none;
  color: inherit;
  transition: box-shadow 200ms ease-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.sizes.h3};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PostDate = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.bodyMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ListPage = () => {
  const { posts, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('posts.list', 100, 0);
    const isSubReady = handle.ready();
    const postsData = isSubReady ? PostsCollection.find({}, { sort: { createdAt: -1 } }).fetch() : [];
    return { posts: postsData, isLoading: !isSubReady };
  });

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState>Loading posts...</LoadingState>;
    }

    if (posts.length === 0) {
      return <div>You haven't created any posts yet. <Link to="/new">Create one now!</Link></div>;
    }

    return (
      <PostsGrid>
        {posts.map(post => (
          <Link to={`/posts/${post._id}`} key={post._id} style={{ textDecoration: 'none' }}>
            <PostCard>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>Created on: {post.createdAt.toLocaleDateString()}</PostDate>
            </PostCard>
          </Link>
        ))}
      </PostsGrid>
    );
  };

  return (
    <MainLayout title="My Posts">
      {renderContent()}
    </MainLayout>
  );
};