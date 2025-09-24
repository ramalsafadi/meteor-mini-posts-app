import { Meteor } from 'meteor/meteor';


Meteor.publish('users.me', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Meteor.users.find(this.userId, {
    fields: {
      roles: 1,
    },
  });
});