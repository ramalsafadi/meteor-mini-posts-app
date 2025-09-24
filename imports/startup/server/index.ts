import { Meteor } from 'meteor/meteor';
import { PostsCollection } from '../../api/posts/collection';
import '../../api/posts';
import './security';

/**
 * This code runs once when the server starts up.
 */
Meteor.startup(() => {

  PostsCollection.createIndex({ userId: 1, createdAt: -1 });
});