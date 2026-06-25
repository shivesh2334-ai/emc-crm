const { clerkMiddleware } = require('@clerk/nextjs/server');
const mw = clerkMiddleware(async (auth, req) => {
  console.log("auth is func?", typeof auth === 'function');
  console.log("auth.protect is func?", typeof auth.protect === 'function');
  // Return a dummy response to satisfy next/server
  return new Response("ok");
});
mw({ url: 'http://localhost/dashboard' }, { waitUntil: () => {} }).catch(console.error);
