import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phoneNumber } = body;

        if (!phoneNumber || typeof phoneNumber !== 'string') {
            return NextResponse.json({ status: 'error', message: 'Valid phone number is required' }, { status: 400 });
        }

        const token = crypto.randomUUID();

        const device = await prisma.device.upsert({
            where: { phoneNumber },
            update: { token },
            create: {
                phoneNumber,
                token,
            },
        });

        return NextResponse.json({
            status: 'success',
            data: {
                phoneNumber: device.phoneNumber,
                token: device.token,
            }
        });
    } catch (error) {
        console.error('Failed to register device:', error);
        return NextResponse.json(
            { status: 'error', message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
