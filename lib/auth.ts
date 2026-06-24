import { auth } from '@clerk/nextjs/server'
export async function requireAuth(){
 const session = await auth()
 return session
}
