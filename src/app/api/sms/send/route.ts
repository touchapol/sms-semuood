import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { to, from, message } = data;

        if (!to || !from || !message) {
            return NextResponse.json(
                { status: 'error', message: 'Missing required fields: to, from, message' },
                { status: 400 }
            );
        }

        const authHeader = request.headers.get('authorization');
        let token = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        if (!token) {
            return NextResponse.json({ status: 'error', message: 'Bearer Token is required in Authorization header' }, { status: 401 });
        }

        const validTokenDevice = await prisma.device.findUnique({
            where: { token }
        });

        if (!validTokenDevice) {
            return NextResponse.json({ status: 'error', message: 'Invalid API Token' }, { status: 401 });
        }

        const device = await prisma.device.findUnique({
            where: { phoneNumber: to },
        });

        if (!device) {
            return NextResponse.json(
                { status: 'error', message: 'Destination phone number not found in simulator' },
                { status: 404 }
            );
        }

        // บันทึกข้อความลงฐานข้อมูล
        const savedMessage = await prisma.message.create({
            data: {
                deviceId: device.id,
                fromNumber: from,
                body: message,
            },
        });

        return NextResponse.json({
            status: 'success',
            data: {
                messageId: savedMessage.id,
                deliveredTo: device.phoneNumber,
                timestamp: savedMessage.receivedAt,
            }
        });
    } catch (error) {
        console.error('Failed to process incoming SMS:', error);
        return NextResponse.json(
            { status: 'error', message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
