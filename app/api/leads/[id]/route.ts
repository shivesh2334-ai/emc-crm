import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request,{params}:any){
 const body = await req.json()
 const lead = await prisma.lead.update({
  where:{id:params.id},
  data:body
 })
 return NextResponse.json(lead)
}
