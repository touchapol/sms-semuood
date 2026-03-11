import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');

        let token = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        if (!token) {
            return NextResponse.json({ status: 'error', message: 'Bearer Token is required in Authorization header' }, { status: 401 });
        }

        const data = await request.json();
        const { from } = data;

        if (!from) {
            return NextResponse.json({ status: 'error', message: 'Sender (from) is required' }, { status: 400 });
        }

        const device = await prisma.device.findUnique({
            where: { token },
        });

        if (!device) {
            return NextResponse.json({ status: 'error', message: 'Unauthorized token' }, { status: 403 });
        }

        const updateResult = await prisma.message.updateMany({
            where: {
                deviceId: device.id,
                fromNumber: from,
                isRead: false
            },
            data: {
                isRead: true
            }
        });

        return NextResponse.json({
            status: 'success',
            data: {
                markedReadCount: updateResult.count
            }
        });
    } catch (error) {
        console.error('Failed to mark messages as read:', error);
        return NextResponse.json(
            { status: 'error', message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
