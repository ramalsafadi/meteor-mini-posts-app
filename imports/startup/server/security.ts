import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';


const WRITE_METHODS = [
  'posts.insert',
  'posts.update',
  'posts.remove',
];

/**
 * Add a rule to the DDP Rate Limiter.
 * This rule targets the methods listed in WRITE_METHODS.
 */
DDPRateLimiter.addRule({
  name(name) {
    return WRITE_METHODS.includes(name);
  },
  

  userId(userId) {
    return true;
  },
}, 10, 5 * 60 * 1000); // 10 requests per 5 minutes (5 * 60 * 1000 milliseconds)