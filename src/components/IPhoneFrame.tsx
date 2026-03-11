'use client';

import { ReactNode, useState, useEffect } from 'react';

const FRAME_W = 430;
const FRAME_H = 932;
const PADDING = 48;

interface IPhoneFrameProps {
    children: ReactNode;
}

export default function IPhoneFrame({ children }: IPhoneFrameProps) {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calc = () => {
            const maxH = window.innerHeight - PADDING;
            const s = Math.min(1, maxH / FRAME_H);
            setScale(s);
        };
        calc();
        window.addEventListener('resize', calc);
        return () => window.removeEventListener('resize', calc);
    }, []);

    return (
        <div style={{ width: FRAME_W * scale, height: FRAME_H * scale }}>
            <div
                className="relative origin-top-left"
                style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})` }}
            >
                {/* Outer Shell */}
                <div
                    className="absolute inset-0 rounded-[60px] bg-gradient-to-b from-[#2a2a2e] via-[#1a1a1e] to-[#2a2a2e]"
                    style={{
                        boxShadow: `
              inset 0 0 0 1px rgba(255,255,255,0.08),
              0 0 0 1px rgba(0,0,0,0.3),
              0 20px 60px rgba(0,0,0,0.5),
              0 0 80px rgba(0,0,0,0.15)
            `,
                    }}
                >
                    <div className="absolute inset-0 rounded-[60px] overflow-hidden pointer-events-none">
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)',
                            }}
                        />
                    </div>

                    <div
                        className="absolute"
                        style={{
                            left: -3, top: 180, width: 4, height: 28,
                            background: 'linear-gradient(to right, #3a3a3e, #4a4a4e)',
                            boxShadow: '-1px 0 2px rgba(0,0,0,0.4)',
                            borderRadius: '2px 0 0 2px',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            left: -3, top: 240, width: 4, height: 56,
                            background: 'linear-gradient(to right, #3a3a3e, #4a4a4e)',
                            boxShadow: '-1px 0 2px rgba(0,0,0,0.4)',
                            borderRadius: '2px 0 0 2px',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            left: -3, top: 310, width: 4, height: 56,
                            background: 'linear-gradient(to right, #3a3a3e, #4a4a4e)',
                            boxShadow: '-1px 0 2px rgba(0,0,0,0.4)',
                            borderRadius: '2px 0 0 2px',
                        }}
                    />

                    <div
                        className="absolute"
                        style={{
                            right: -3, top: 270, width: 4, height: 80,
                            background: 'linear-gradient(to left, #3a3a3e, #4a4a4e)',
                            boxShadow: '1px 0 2px rgba(0,0,0,0.4)',
                            borderRadius: '0 2px 2px 0',
                        }}
                    />

                    <div className="absolute inset-[8px] rounded-[52px] bg-black overflow-hidden">
                        <div className="absolute inset-[2px] rounded-[50px] overflow-hidden bg-white dark:bg-black">
                            <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-[12px]">
                                <div
                                    className="relative flex items-center justify-center"
                                    style={{ width: 126, height: 37, borderRadius: 50, background: '#000' }}
                                >
                                    <div
                                        className="absolute"
                                        style={{
                                            right: 22, width: 12, height: 12, borderRadius: '50%',
                                            background: 'radial-gradient(circle, #1a1a3a 30%, #0a0a1a 60%, #000 100%)',
                                            boxShadow: 'inset 0 0 2px rgba(50,50,100,0.5)',
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-[14px] h-[54px] pointer-events-none">
                                <div className="w-[85px] flex justify-center items-center gap-1 pl-2">
                                    <span className="text-[15px] font-medium tracking-[-0.2px] mt-[1px] text-black dark:text-white" style={{ fontFeatureSettings: '"tnum"' }}>
                                        21:49
                                    </span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" className="fill-black dark:fill-white opacity-80 mt-[1px]">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <div className="flex items-center gap-[5px] pr-1">
                                    <svg width="18" height="12" viewBox="0 0 18 12" className="fill-black dark:fill-white">
                                        <rect x="0" y="8" width="3" height="4" rx="1" />
                                        <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                                        <rect x="10" y="3" width="3" height="9" rx="1" />
                                        <rect x="15" y="0" width="3" height="12" rx="1" />
                                    </svg>
                                    <span className="text-[12px] font-bold text-black dark:text-white tracking-tighter mt-[1px]">
                                        5G
                                    </span>
                                    <svg width="25" height="12" viewBox="0 0 25 12" className="text-black dark:text-white fill-current ml-0.5">
                                        <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                                        <rect x="2" y="2" width="16" height="8" rx="1.5" />
                                        <path d="M24 4V8C24.5523 8 25 7.55228 25 7V5C25 4.44772 24.5523 4 24 4Z" opacity="0.4" />
                                    </svg>
                                </div>
                            </div>

                            <div className="absolute inset-0 pt-[54px] pb-0 flex flex-col">
                                {children}
                            </div>
                            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-50">
                                <div className="w-[140px] h-[5px] rounded-full bg-black/20 dark:bg-white/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
