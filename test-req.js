const { clerkMiddleware } = require('@clerk/nextjs/server');
const mw = clerkMiddleware(async (auth, req) => {
  console.log("auth type:", typeof auth);
  console.log("auth.protect:", typeof auth.protect);
  console.log("auth():", typeof auth());
  return new Response("ok");
});

const req = {
  url: 'http://localhost/dashboard',
  headers: new Map(),
  method: 'GET',
  nextUrl: { pathname: '/dashboard', search: '' }
};
req.headers.get = (k) => null;
req.headers.set = (k, v) => null;
req.headers.forEach = () => null;

mw(req, { waitUntil: () => {} }).catch(console.error);
