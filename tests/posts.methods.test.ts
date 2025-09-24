import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert }  from 'chai';
import { PostsCollection } from '/imports/api/posts/collection';
import '/imports/api/posts/methods'; 


describe('posts.remove', () => {
  let sandbox;

  // Before each test, we create a "sandbox" to hold our mocks.
  beforeEach(() => {

    const sinon = require('sinon');
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should remove a post owned by the user', async () => {
    const userId = Random.id();
    const postId = Random.id();
    const post = { _id: postId, userId, title: 'Test Post', body: 'Test Body' };

    // Mock PostsCollection.findOneAsync to return our fake post
    sandbox.stub(PostsCollection, 'findOneAsync').resolves(post);
    // Mock PostsCollection.removeAsync to do nothing but we can check if it was called
    const removeStub = sandbox.stub(PostsCollection, 'removeAsync').resolves();

    // Mock a method call as if a specific user is logged in
    await mockMethodCall('posts.remove', { _id: postId }, { context: { userId } });

    // Assert that findOneAsync was called with the correct arguments
    assert.isTrue(PostsCollection.findOneAsync.calledWith({ _id: postId, userId }));
    
    // Assert that removeAsync was called with the correct postId
    assert.isTrue(removeStub.calledWith(postId));
  });

  it('should throw an error if user does not own the post', async () => {
    const userId = Random.id();
    const otherUserId = Random.id();
    const postId = Random.id();
    
    // Mock findOneAsync to return nothing, simulating that the post doesn't exist
    // for this user.
    sandbox.stub(PostsCollection, 'findOneAsync').resolves(null);
    const removeStub = sandbox.stub(PostsCollection, 'removeAsync');

    try {
      // Call the method as 'userId' trying to delete a post owned by 'otherUserId'
      await mockMethodCall('posts.remove', { _id: postId }, { context: { userId } });
      // If the method doesn't throw, this line will be reached and the test will fail.
      assert.fail('The method should have thrown an error.');
    } catch (error) {
      // Assert that the correct error was thrown
      assert.equal(error.error, 'not-found');
    }

    // Assert that the remove method was never called
    assert.isFalse(removeStub.called);
  });
});