import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useParams, useHistory } from 'react-router-dom';

import { PostsCollection } from '../../api/posts/collection';
import { MainLayout } from '../layouts/MainLayout';
import { PostForm } from '../components/PostForm';

// Define the shape of the URL parameters for TypeScript.
interface EditPageParams {
  _id: string;
}

export const EditPage = () => {
  const { _id } = useParams<EditPageParams>();
  const history = useHistory();

  // We use useTracker to both subscribe to AND fetch the data for the form.
  const { post, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('posts.view', _id);
    const isSubReady = handle.ready();
    const postData = isSubReady ? PostsCollection.findOne({ _id }) : undefined;

    return {
      post: postData,
      isLoading: !isSubReady,
    };
  });

  const handleSave = (title: string, body: string) => {
    // Call the 'posts.update' method.
    // The data object must include the _id to identify the document.
    Meteor.call('posts.update', { _id, title, body }, (error) => {
      if (error) {
        alert(`Error updating post: ${error.reason}`);
      } else {
        // On success, redirect to the view page for that post.
        history.push(`/posts/${_id}`);
      }
    });
  };
  
  const handleCancel = () => {
    history.push(`/posts/${_id}`);
  };

  if (isLoading) {
    return (
      <MainLayout title="Edit Post">
        <div>Loading post data...</div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout title="Edit Post">
        <div>Post not found.</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Edit Post">
      <PostForm post={post} onSave={handleSave} onCancel={handleCancel} />
    </MainLayout>
  );
};