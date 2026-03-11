'use client';
import { useState } from 'react';
import { ArrowLeft, Search, Key, Copy, Send, History, Check } from 'lucide-react';

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div onClick={handleCopy} className="cursor-pointer text-slate-500 hover:text-white transition-colors flex items-center justify-center p-1" title="Copy to clipboard">
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </div>
  );
}

export default function ApiDocsScreen({ phoneNumber, token }: { phoneNumber: string, token: string }) {
  const displayToken = token || "Loading...";
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  const postSnippet = `curl -X POST "${baseUrl}/api/sms/send" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token || 'YOUR_DEVICE_TOKEN'}" \\
  -d '{
    "to": "${phoneNumber || '+668XXXXXXXX'}",
    "from": "OTP_SERVICE",
    "message": "Your verification code is 123456."
  }'`;

  const getSnippet = `curl -X GET "${baseUrl}/api/messages" \\
  -H "Authorization: Bearer ${token || 'YOUR_DEVICE_TOKEN'}"`;

  const getSingleSnippet = `curl -X GET "${baseUrl}/api/messages?id=YOUR_MESSAGE_ID" \\
  -H "Authorization: Bearer ${token || 'YOUR_DEVICE_TOKEN'}"`;

  const responseSnippet = `{
  "status": "success",
  "data": [
    {
      "id": "msg_89231",
      "status": "delivered",
      "timestamp": "2023-10-24T14:20:00Z"
    }
  ]
}`;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-[#2c2c2e] pt-2">
        <div className="flex items-center px-4 pb-4 justify-between">
          <div className="text-primary flex size-10 shrink-0 items-center justify-center rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 px-4">API Documentation</h1>
          <div className="text-slate-500 flex size-10 shrink-0 items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
        </div>
        <div className="flex px-4 gap-6 overflow-x-auto no-scrollbar">
          <a className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-2 whitespace-nowrap" href="#auth">
            <p className="text-sm font-bold leading-normal">Authentication</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 whitespace-nowrap" href="#send">
            <p className="text-sm font-semibold leading-normal">Send SMS</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 whitespace-nowrap" href="#retrieve">
            <p className="text-sm font-semibold leading-normal">Retrieve</p>
          </a>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-8 pb-8">
        <section id="auth" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-6 h-6 text-primary" />
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Authentication</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Use your device token to retrieve messages.
          </p>
          <div className="bg-slate-900 dark:bg-[#1c1c1e] rounded-xl p-4 overflow-hidden shadow-sm border border-transparent dark:border-[#2c2c2e]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Your Token</span>
              <CopyButton textToCopy={displayToken} />
            </div>
            <code className="text-xs font-mono text-blue-400 block whitespace-pre-wrap leading-relaxed break-all">
              {displayToken}
            </code>
          </div>
        </section>

        <section id="send" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-3">
            <Send className="w-6 h-6 text-primary" />
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Send SMS (Simulation)</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Invoke this endpoint to simulate receiving an SMS on this device.
          </p>
          <div className="bg-slate-900 dark:bg-[#1c1c1e] rounded-xl p-4 overflow-hidden shadow-sm border border-transparent dark:border-[#2c2c2e]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">cURL POST Request</span>
              <CopyButton textToCopy={postSnippet} />
            </div>
            <code className="text-xs font-mono text-green-400 block whitespace-pre-wrap leading-relaxed">
              {postSnippet}
            </code>
          </div>
        </section>

        <section id="retrieve" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-6 h-6 text-primary" />
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Retrieve Messages</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
            Fetch a list of all outbound and inbound messages. You can filter results by date range or recipient.
          </p>
          <div className="bg-slate-900 dark:bg-[#1c1c1e] rounded-xl p-4 overflow-hidden shadow-sm border border-transparent dark:border-[#2c2c2e]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">cURL GET All Messages</span>
              <CopyButton textToCopy={getSnippet} />
            </div>
            <code className="text-xs font-mono text-green-400 block whitespace-pre-wrap leading-relaxed mb-6">
              {getSnippet}
            </code>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">cURL GET Single Message</span>
              <CopyButton textToCopy={getSingleSnippet} />
            </div>
            <code className="text-xs font-mono text-green-400 block whitespace-pre-wrap leading-relaxed mb-6">
              {getSingleSnippet}
            </code>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Response</span>
              <CopyButton textToCopy={responseSnippet} />
            </div>
            <code className="text-xs font-mono text-yellow-400 block whitespace-pre-wrap leading-relaxed">
              {responseSnippet}
            </code>
          </div>
        </section>
      </main>
    </div>
  );
}
