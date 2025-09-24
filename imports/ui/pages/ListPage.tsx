import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import { PostsCollection, Post } from '../../api/posts/collection';
import { MainLayout } from '../layouts/MainLayout';

// A simple Loading component. TODO: update this to make it look better.
const Loading = () => <div>Loading...</div>;

// A component to show when there are no posts.
const EmptyState = () => (
  <div>
    <p>You haven't created any posts yet.</p>
    <Link to="/new">Create your first post</Link>
  </div>
);

// The main List Page component.
export const ListPage = () => {
  // useTracker is the hook that makes our component reactive.
  const { posts, isLoading } = useTracker(() => {
    // 1. Subscribe to the 'posts.list' publication.
    // We are not implementing pagination yet, so we use a hardcoded limit.
    const handle = Meteor.subscribe('posts.list', 100, 0);
    const isSubReady = handle.ready();
    const postsData = isSubReady
      ? PostsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
      : [];

    return {
      posts: postsData,
      isLoading: !isSubReady,
    };
  });

  // This function renders the content based on the state from useTracker.
  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (posts.length === 0) {
      return <EmptyState />;
    }

    // A simple list of posts. TODO: update the design
    return (
      <ul>
        {posts.map(post => (
          <li key={post._id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <Link to={`/posts/${post._id}`}>
              <h3>{post.title}</h3>
            </Link>
            <p>Created on: {post.createdAt.toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <MainLayout title="My Posts">
      {renderContent()}
    </MainLayout>
  );
};