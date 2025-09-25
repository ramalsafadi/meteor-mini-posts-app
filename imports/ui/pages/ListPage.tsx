import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { PostsCollection } from '../../api/posts/collection';
import { MainLayout } from '../layouts/MainLayout';
import { Card, Button } from '../components/styled';

// MODIFICATION: Make the PostCard a flex container
const PostCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  transition: box-shadow 200ms ease-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
  }
`;

const PostInfoLink = styled(Link)`
  text-decoration: none;
  flex-grow: 1; /* Allow this part to take up available space */
`;

const PostTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.sizes.h3};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PostDate = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.bodyMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const PostAuthor = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.caption};
  color: ${({ theme }) => theme.colors.secondary};
  margin: 8px 0;
  font-style: italic;
  word-break: break-all;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ListPage = () => {
  const history = useHistory();

  const { posts, isLoading, isAdmin, currentUserId } = useTracker(() => {
    const userSub = Meteor.subscribe('users.me');
    const postsSub = Meteor.subscribe('posts.list', 100, 0);
    
    const isReady = userSub.ready() && postsSub.ready();
    
    const user = Meteor.user();
    const adminCheck = user?.roles?.includes('admin');
    
    const postsData = isReady ? PostsCollection.find({}, { sort: { createdAt: -1 } }).fetch() : [];

    return { 
      posts: postsData, 
      isLoading: !isReady, 
      isAdmin: adminCheck,
      currentUserId: Meteor.userId(), // Get current user's ID for ownership checks
    };
  });

  // NEW: Handler for the delete button
  const handleDelete = (event: React.MouseEvent, postId: string) => {
    // This is critical to prevent the Link from navigating
    event.preventDefault();
    event.stopPropagation();

    if (window.confirm('Are you sure you want to delete this post?')) {
      Meteor.call('posts.remove', { _id: postId }, (error) => {
        if (error) {
          alert(`Error deleting post: ${error.reason}`);
        }
        // No success action needed, reactivity will handle the UI update.
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState>Loading posts...</LoadingState>;
    }

    if (posts.length === 0) {
      return <div>You haven't created any posts yet. <Link to="/new">Create one now!</Link></div>;
    }

    return (
      <PostsGrid>
        {posts.map(post => {
          // Determine if the current user can delete this specific post
          const canDelete = isAdmin || post.userId === currentUserId;

          return (
            <PostCard key={post._id}>
              <PostInfoLink to={`/posts/${post._id}`}>
                <PostTitle>{post.title}</PostTitle>
                {isAdmin && post.userId !== currentUserId && <PostAuthor>Author ID: {post.userId}</PostAuthor>}
                <PostDate>Created on: {post.createdAt.toLocaleDateString()}</PostDate>
              </PostInfoLink>

              {/* Conditionally render the delete button */}
              {canDelete && (
                <Button 
                  variant="destructive" 
                  onClick={(e) => handleDelete(e, post._id!)}
                  style={{ flexShrink: 0 }} // Prevent button from shrinking
                >
                  Delete
                </Button>
              )}
            </PostCard>
          );
        })}
      </PostsGrid>
    );
  };

  return (
    <MainLayout title={isAdmin ? "All User Posts" : "My Posts"}>
      {renderContent()}
    </MainLayout>
  );
};