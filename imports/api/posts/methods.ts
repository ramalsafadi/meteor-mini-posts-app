import { Meteor } from 'meteor/meteor';
import { PostsCollection } from './collection';
import {
  insertPostSchema,
  InsertPostParams,
  updatePostSchema,
  UpdatePostParams,
  removePostSchema,
  RemovePostParams,
} from './schema';

Meteor.methods({
  /**
   * Method: 'posts.insert' (Now async)
   */
  async 'posts.insert'(params: InsertPostParams) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to create a post.');
    }

    insertPostSchema.parse(params);

    const postId = await PostsCollection.insertAsync({
      ...params,
      userId: this.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return postId;
  },

  /**
   * Method: 'posts.update' (Now async)
   */
  async 'posts.update'(params: UpdatePostParams) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to update a post.');
    }

    updatePostSchema.parse(params);

    const { _id, title, body } = params;

    const post = await PostsCollection.findOneAsync({ _id, userId: this.userId });

    if (!post) {
      throw new Meteor.Error('not-found', 'The post was not found or you do not have permission to edit it.');
    }

    const updates: { title?: string; body?: string; updatedAt: Date } = {
      updatedAt: new Date(),
    };
    if (title) updates.title = title;
    if (body) updates.body = body;

    await PostsCollection.updateAsync(_id, { $set: updates });
  },

  /**
   * Method: 'posts.remove' (Now async)
   */
  async 'posts.remove'(params: RemovePostParams) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to remove a post.');
    }
    
    removePostSchema.parse(params);

    const { _id } = params;

    const post = await PostsCollection.findOneAsync({ _id, userId: this.userId });

    if (!post) {
      throw new Meteor.Error('not-found', 'The post was not found or you do not have permission to remove it.');
    }
    
    await PostsCollection.removeAsync(_id);
  },
});