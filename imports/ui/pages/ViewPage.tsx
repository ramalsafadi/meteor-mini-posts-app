import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useParams, Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { PostsCollection } from '../../api/posts/collection';
import { MainLayout } from '../layouts/MainLayout';
import { Card, Button } from '../components/styled';

interface ViewPageParams { _id: string; }

const PostBody = styled.p`
  white-space: pre-wrap;
  font-size: ${({ theme }) => theme.fonts.sizes.bodyLarge};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const PostDate = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.bodyMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const ButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ViewPage = () => {
  const { _id } = useParams<ViewPageParams>();
  const history = useHistory();

  const { post, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('posts.view', _id);
    const isSubReady = handle.ready();
    const postData = isSubReady ? PostsCollection.findOne({ _id }) : undefined;
    return { post: postData, isLoading: !isSubReady };
  });

  const handleDelete = () => {
    // ... same handleDelete logic as before ...
  };

  const renderContent = () => {
    if (isLoading) return <div>Loading post...</div>;
    if (!post) return <div>Post not found.</div>;

    return (
      <Card>
        <PostBody>{post.body}</PostBody>
        <PostDate>Created on: {post.createdAt.toLocaleDateString()}</PostDate>
        <ButtonGroup>
          <Link to={`/posts/${post._id}/edit`}>
            <Button>Edit Post</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>Delete Post</Button>
        </ButtonGroup>
      </Card>
    );
  };

  return (
    <MainLayout title={post?.title || 'View Post'}>
      {renderContent()}
    </MainLayout>
  );
};