import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { PostsCollection } from '/imports/api/posts/collection';
import '/imports/api/posts/publications'; 
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

describe('posts.list publication', () => {

  // We'll set up the database before each test
  beforeEach(async () => {
    await PostsCollection.removeAsync({});

    const userAId = Random.id();
    const userBId = Random.id();

    // Insert test data
    await PostsCollection.insertAsync({
      title: 'User A Post 1',
      body: 'Body A1',
      userId: userAId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await PostsCollection.insertAsync({
      title: 'User A Post 2',
      body: 'Body A2',
      userId: userAId,
      createdAt: new Date(Date.now() - 1000), // Slightly older
      updatedAt: new Date(),
    });

    await PostsCollection.insertAsync({
      title: 'User B Post 1',
      body: 'Body B1',
      userId: userBId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it('should only publish posts owned by the logged-in user', async () => {
    const userAId = (await PostsCollection.findOneAsync({ title: 'User A Post 1' })).userId;
    
    // The PublicationCollector simulates a client subscription.
    const collector = new PublicationCollector({ userId: userAId });

    // Collect the documents published by 'posts.list'
    const collections = await collector.collect('posts.list', 10, 0);

    // Assert that we got the 'posts' collection back
    assert.isDefined(collections.posts, 'The posts collection should be published');
    // Assert that only the 2 posts for User A were published
    assert.equal(collections.posts.length, 2);
  });

  it('should publish posts with limited fields', async () => {
    const userAId = (await PostsCollection.findOneAsync({ title: 'User A Post 1' })).userId;
    const collector = new PublicationCollector({ userId: userAId });
    
    const collections = await collector.collect('posts.list', 10, 0);
    
    const post = collections.posts[0];

    // Assert that the published post has ONLY the allowed fields
    assert.hasAllKeys(post, ['_id', 'title', 'createdAt']);
    // Assert that sensitive/unnecessary fields like 'body' and 'userId' are NOT present
    assert.doesNotHaveAnyKeys(post, ['body', 'userId', 'updatedAt']);
  });

  it('should not publish anything if the user is not logged in', async () => {
    // Run the collector without a userId
    const collector = new PublicationCollector();
    const collections = await collector.collect('posts.list', 10, 0);
    
    // Assert that the 'posts' collection is either undefined or empty
    assert.isTrue(!collections.posts || collections.posts.length === 0);
  });
});