import { useState, useMemo } from 'react';
import { useMessages } from '../hooks/useSimulator';
import { ArrowUpDown, User, ChevronRight, Search, Mic, SquarePen, ArrowLeft } from 'lucide-react';

export default function MessagesScreen({ token }: { token: string }) {
  const { messages, isLoading, markAsRead } = useMessages(token);
  const [selectedSender, setSelectedSender] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const formatMessageTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    }
  };

  const chatGroups = useMemo(() => {
    const groups: Record<string, {
      from: string;
      latestTime: string;
      latestMsg: string;
      unreadCount: number;
      id: string;
    }> = {};

    messages.forEach(msg => {
      const from = msg.from || 'Unknown';
      if (!groups[from]) {
        groups[from] = {
          from,
          latestTime: msg.time,
          latestMsg: msg.message,
          unreadCount: msg.unread ? 1 : 0,
          id: msg.id
        };
      } else {
        if (msg.unread) {
          groups[from].unreadCount += 1;
        }
      }
    });

    let grouped = Object.values(groups).sort((a, b) => new Date(b.latestTime).getTime() - new Date(a.latestTime).getTime());

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      grouped = grouped.filter(g => {
        if (g.from.toLowerCase().includes(q)) return true;
        const senderMsgs = messages.filter(m => (m.from || 'Unknown') === g.from);
        return senderMsgs.some(m => m.message.toLowerCase().includes(q));
      });
    }

    return grouped;
  }, [messages, searchQuery]);

  if (isLoading) {
    return <div className="flex flex-col h-full bg-black items-center justify-center text-white">Loading...</div>;
  }

  if (selectedSender) {
    const senderMessages = messages.filter(m => (m.from || 'Unknown') === selectedSender);
    return (
      <div className="flex flex-col h-full bg-white dark:bg-black relative">
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-[#2c2c2e] pt-2">
          <div className="flex items-center px-2 pb-3">
            <div
              onClick={() => setSelectedSender(null)}
              className="text-[#0a84ff] flex shrink-0 items-center justify-center rounded-lg hover:bg-primary/10 transition-colors cursor-pointer px-2 py-1"
            >
              <ArrowLeft className="w-6 h-6 mr-1" />
              <span className="text-[17px]">Back</span>
            </div>
            <div className="flex items-center justify-center flex-1 pr-14">
              <div className="size-8 rounded-full bg-slate-300 dark:bg-[#3a3a3c] flex items-center justify-center overflow-hidden shrink-0 mr-2">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-slate-900 dark:text-slate-100 text-[15px] font-semibold tracking-tight truncate max-w-[120px]">
                {selectedSender}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-4 pb-8">
          {senderMessages.map((msg) => (
            <div key={msg.id} className="flex flex-col items-start w-full">
              <div className="bg-slate-100 dark:bg-[#2c2c2e] text-black dark:text-white px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] self-start border border-black/5 dark:border-white/5">
                <p className="text-[15px] leading-snug whitespace-pre-wrap">{msg.message}</p>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-[#8e8e93] mt-1 ml-1">{formatMessageTime(msg.time)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black relative">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button className="text-black dark:text-white bg-slate-200 dark:bg-[#1c1c1e] text-[15px] px-4 py-1.5 rounded-full font-medium tracking-tight">
            Edit
          </button>
          <div className="relative">
            <button className="text-black dark:text-white bg-slate-200 dark:bg-[#1c1c1e] size-9 rounded-full flex items-center justify-center">
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        <h1 className="text-[34px] font-bold tracking-tight mb-2 text-black dark:text-white">Messages</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {chatGroups.map((group) => (
          <div
            key={group.from}
            onClick={() => {
              setSelectedSender(group.from);
              if (group.unreadCount > 0) {
                markAsRead(group.from);
              }
            }}
            className="flex pr-4 py-2 hover:bg-slate-50 dark:hover:bg-[#1c1c1e] cursor-pointer transition-colors relative"
          >
            <div className="w-6 flex items-center justify-center shrink-0">
              {group.unreadCount > 0 && (
                <div className="size-2.5 rounded-full bg-[#0a84ff]"></div>
              )}
            </div>
            <div className="size-[46px] rounded-full bg-slate-300 dark:bg-[#3a3a3c] flex items-center justify-center overflow-hidden shrink-0 mr-3 mt-0.5">
              <User className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0 border-b border-slate-100 dark:border-[#2c2c2e] pb-3">
              <div className="flex items-center justify-between mb-0.5">
                <h3 className={`font-semibold text-[16px] truncate ${group.unreadCount > 0 ? 'text-black dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                  {group.from}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] text-slate-500 dark:text-[#8e8e93]">{formatMessageTime(group.latestTime)}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-[#3a3a3c]" />
                </div>
              </div>
              <p className={`text-[15px] line-clamp-2 pr-2 leading-snug ${group.unreadCount > 0 ? 'text-slate-800 dark:text-slate-300 font-medium' : 'text-slate-500 dark:text-[#8e8e93]'}`}>
                {group.latestMsg}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 right-0 px-4 flex items-center gap-3 z-20 pointer-events-none">
        <div className="flex-1 flex items-center bg-slate-200 dark:bg-[#1c1c1e] rounded-full h-11 px-3 pointer-events-auto shadow-lg border border-black/5 dark:border-white/5">
          <Search className="w-5 h-5 text-slate-500 dark:text-[#8e8e93] mr-2" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-[16px] placeholder-slate-500 dark:placeholder-[#8e8e93] text-black dark:text-white focus:outline-none"
            placeholder="Search"
            type="text"
          />
          <Mic className="w-5 h-5 text-slate-500 dark:text-[#8e8e93] ml-2" />
        </div>
        <button className="size-11 rounded-full bg-slate-200 dark:bg-[#1c1c1e] flex items-center justify-center pointer-events-auto text-black dark:text-white shadow-lg border border-black/5 dark:border-white/5">
          <SquarePen className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
