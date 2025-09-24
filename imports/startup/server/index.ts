import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { PostsCollection } from '../../api/posts/collection';
import '../../api/posts';
import '../../api/users/publications';
import './security';

// This hook runs every time a new user is created. It is the guaranteed way
// to add custom data to a user document upon creation.
Accounts.onCreateUser((options, user) => {
  if (options.roles) {
    user.roles = options.roles;
  }
  return user;
});

Meteor.startup(async () => {
  PostsCollection.createIndex({ userId: 1, createdAt: -1 });

  const adminUsername = 'admin';
  const adminUser = await Accounts.findUserByUsername(adminUsername);

  if (!adminUser) {
    console.log(`Creating default admin user: ${adminUsername}`);
    // We pass the role directly into the createUser options.
    // The onCreateUser hook above will catch this and add it to the document.
    Accounts.createUser({
      username: adminUsername,
      password: 'password',
      roles: ['admin'],
    });
    console.log(`Admin user creation initiated.`);
  }
});