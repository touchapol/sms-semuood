import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

function generatePhoneNumber() {
    const prefix = ['08', '09', '06'];
    const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    const randomSuffix = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+66${randomPrefix.replace('0', '')}${randomSuffix}`;
}

export async function POST(request: Request) {
    try {
        const phoneNumber = generatePhoneNumber();
        const token = crypto.randomUUID();

        const device = await prisma.device.create({
            data: {
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
        console.error('Failed to create device:', error);
        return NextResponse.json(
            { status: 'error', message: 'Failed to generate phone number' },
            { status: 500 }
        );
    }
}
