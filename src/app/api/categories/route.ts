import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, color } = body;
    
        const category = await prisma.category.create({
        data: {
            name,
            color,
        },
        });
    
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
    }
}