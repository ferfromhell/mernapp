import { createResolver } from 'apollo-resolvers';

export const baseResolver = createResolver(
    //incoming requests will pass through this resolver like a no-op
   null,
   (root, args, context, error) =>error
 );
 export const isAuthenticatedResolver = baseResolver.createResolver(
    // Extract the user from context (undefined if non-existent)
    (root, args, { user }, info) => {
      if (!user) throw new Error("User not login");
    }
  );