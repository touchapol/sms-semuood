import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sms_simulator_device';

export function useDevice() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const generateDevice = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/device/new', { method: 'POST' });
            const data = await res.json();
            if (data.status === 'success') {
                setPhoneNumber(data.data.phoneNumber);
                setToken(data.data.token);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
            }
        } catch (e) {
            console.error('Failed to generate device', e);
        } finally {
            setIsLoading(false);
        }
    };

    const registerDevice = async (newPhoneNumber: string) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/device/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: newPhoneNumber })
            });
            const data = await res.json();
            if (data.status === 'success') {
                setPhoneNumber(data.data.phoneNumber);
                setToken(data.data.token);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
                return true;
            }
        } catch (e) {
            console.error('Failed to register device', e);
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    const resetDevice = () => {
        localStorage.removeItem(STORAGE_KEY);
        setPhoneNumber('');
        setToken('');
    };

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setPhoneNumber(parsed.phoneNumber);
                setToken(parsed.token);
                setIsLoading(false);
            } catch (e) {
                localStorage.removeItem(STORAGE_KEY);
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, []);

    return { phoneNumber, token, isLoading, generateDevice, registerDevice, resetDevice };
}

export function useMessages(token: string) {
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMessages = useCallback(async (isBackground = false) => {
        if (!token) return;
        if (!isBackground) setIsLoading(true);
        try {
            const res = await fetch(`/api/messages`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.status === 'success') {
                setMessages(data.data.messages);
            }
        } catch (e) {
            console.error('Failed to fetch messages', e);
        } finally {
            if (!isBackground) setIsLoading(false);
        }
    }, [token]);

    const markAsRead = async (fromSender: string) => {
        if (!token) return;
        try {
            const res = await fetch(`/api/messages/mark-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ from: fromSender })
            });
            const data = await res.json();
            if (data.status === 'success' && data.data.markedReadCount > 0) {
                fetchMessages(true);
            }
        } catch (e) {
            console.error('Error marking messages as read', e);
        }
    };

    useEffect(() => {
        fetchMessages(false);
        const interval = setInterval(() => fetchMessages(true), 3000);
        return () => clearInterval(interval);
    }, [fetchMessages]);

    return { messages, isLoading, refresh: fetchMessages, markAsRead };
}
