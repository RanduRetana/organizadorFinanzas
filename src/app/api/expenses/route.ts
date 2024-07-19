import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, amount, description, userId, categoryId, isShared = true } = body;

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        description,
        userId,
        categoryId,
        isShared,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Error creating expense' }, { status: 500 });
  }
}