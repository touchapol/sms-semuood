import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');

        let token = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        if (!token) {
            return NextResponse.json({ status: 'error', message: 'Bearer Token is required in Authorization header' }, { status: 401 });
        }

        const url = new URL(request.url);
        const messageId = url.searchParams.get('id');

        const device = await prisma.device.findUnique({
            where: { token },
        });

        if (!device) {
            return NextResponse.json({ status: 'error', message: 'Device not found' }, { status: 404 });
        }

        const whereClause: any = { deviceId: device.id };
        if (messageId) {
            whereClause.id = messageId;
        }

        const messages = await prisma.message.findMany({
            where: whereClause,
            orderBy: { receivedAt: 'desc' },
        });

        return NextResponse.json({
            status: 'success',
            data: {
                phoneNumber: device.phoneNumber,
                messages: messages.map((msg: any) => ({
                    id: msg.id,
                    from: msg.fromNumber,
                    message: msg.body,
                    time: msg.receivedAt.toISOString(),
                    unread: !msg.isRead,
                }))
            }
        });
    } catch (error) {
        console.error('Failed to retrieve messages:', error);
        return NextResponse.json(
            { status: 'error', message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
