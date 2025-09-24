import { z } from 'zod';

export const insertPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).max(100),
  body: z.string().min(1, { message: "Body is required." }),
});

export type InsertPostParams = z.infer<typeof insertPostSchema>;

export const updatePostSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, { message: "Title is required." }).max(100).optional(),
  body: z.string().min(1, { message: "Body is required." }).optional(),
});

export type UpdatePostParams = z.infer<typeof updatePostSchema>;


export const removePostSchema = z.object({
  _id: z.string(),
});

export type RemovePostParams = z.infer<typeof removePostSchema>;