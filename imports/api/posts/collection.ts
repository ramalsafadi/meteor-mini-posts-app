import { Mongo } from 'meteor/mongo';


 //Define the structure of a single Post document.

export interface Post {
  _id?: string; 
  userId: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}


//Creates the MongoDB collection named 'posts'.
 
export const PostsCollection = new Mongo.Collection<Post>('posts');