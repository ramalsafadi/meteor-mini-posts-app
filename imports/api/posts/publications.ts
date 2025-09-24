import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { PostsCollection } from './collection';

/**
 * Publication: 'posts.list'
 * @param {number} limit - The number of posts to return.
 * @param {number} skip - The number of posts to skip (for pagination).
 */
Meteor.publish('posts.list', function (limit: number, skip: number) {
  if (!this.userId) {
    return this.ready();
  }

  check(limit, Number);
  check(skip, Number);

  const cursor = PostsCollection.find(
    {
      userId: this.userId,
    },
    {
      sort: { createdAt: -1 },
      limit,
      skip,
      fields: {
        _id: 1,
        title: 1,
        createdAt: 1,
      },
    }
  );

  return cursor;
});


/**
 * Publication: 'posts.view'
 *
 * Publishes a single post document for its owner.
 * Returns all fields for the document.
 *
 * @param {string} postId - The _id of the post to publish.
 */
Meteor.publish('posts.view', function (postId: string) {
  if (!this.userId) {
    return this.ready();
  }
  check(postId, String);


  const cursor = PostsCollection.find({
    _id: postId,
    userId: this.userId,
  });

  return cursor;
});