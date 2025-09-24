import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { PostsCollection } from './collection';

Meteor.publish('posts.list', async function (limit: number, skip: number) {
  if (!this.userId) {
    return this.ready();
  }

  check(limit, Number);
  check(skip, Number);

  const user = await Meteor.users.findOneAsync(this.userId);
  const isAdmin = user?.roles?.includes('admin');

  const query = isAdmin ? {} : { userId: this.userId };

  const fields: any = { _id: 1, title: 1, createdAt: 1 };
  if (isAdmin) {
    fields.userId = 1;
  }

  return PostsCollection.find(query, {
    sort: { createdAt: -1 },
    limit,
    skip,
    fields,
  });
});

Meteor.publish('posts.view', async function (postId: string) {
  if (!this.userId) {
    return this.ready();
  }
  
  check(postId, String);

  const user = await Meteor.users.findOneAsync(this.userId);
  const isAdmin = user?.roles?.includes('admin');
  
  const query = isAdmin 
    ? { _id: postId } 
    : { _id: postId, userId: this.userId };

  return PostsCollection.find(query);
});