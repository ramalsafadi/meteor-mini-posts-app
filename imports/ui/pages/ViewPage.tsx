import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useParams, Link, useHistory } from 'react-router-dom';

import { PostsCollection, Post } from '../../api/posts/collection';
import { MainLayout } from '../layouts/MainLayout';


interface ViewPageParams {
  _id: string;
}

export const ViewPage = () => {
  // Get the post _id from the URL.
  const { _id } = useParams<ViewPageParams>();
  const history = useHistory();

  const { post, isLoading } = useTracker(() => {
    // Subscribe to the specific post.
    const handle = Meteor.subscribe('posts.view', _id);
    const isSubReady = handle.ready();

    // Fetch the single post from Minimongo.
    const postData = isSubReady ? PostsCollection.findOne({ _id }) : undefined;

    return {
      post: postData,
      isLoading: !isSubReady,
    };
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      Meteor.call('posts.remove', { _id }, (error) => {
        if (error) {
          alert(`Error deleting post: ${error.reason}`);
        } else {
          history.push('/'); // Redirect to list on success
        }
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading post...</div>;
    }

    if (!post) {
      return <div>Post not found or you don't have permission to view it.</div>;
    }

    // Display the full post details.
    return (
      <div>
        <p style={{ whiteSpace: 'pre-wrap', border: '1px solid #eee', padding: '15px' }}>
          {post.body}
        </p>
        <div style={{ marginTop: '20px' }}>
          <Link to={`/posts/${post._id}/edit`}>
            <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer', borderRadius: '4px' }}>
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer', borderRadius: '4px', marginLeft: '10px' }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <MainLayout title={post?.title || 'View Post'}>
      {renderContent()}
    </MainLayout>
  );
};