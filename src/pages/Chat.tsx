import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MoreVertical, Send, Check, CheckCheck, Trash2, BellOff, Settings, UserPlus, Mic, Play, Pause, Volume2, Users, Briefcase, ConciergeBell, Wrench, ShieldCheck, Megaphone, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/hooks/useAuth';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/hooks/useTranslation';

interface Message {
  id: string;
  sender: string;
  role: string;
  text?: string;
  voiceUrl?: string;
  duration?: string;
  time: string;
  isMe: boolean;
  avatar?: string;
  type?: 'text' | 'voice' | 'broadcast';
  targetService?: string;
}

export const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [activeService, setActiveService] = useState('general');

  const SERVICES = [
    { id: 'general', label: t('common.all'), icon: Users, color: 'text-violet bg-violet/10' },
    { id: 'housekeeping', label: t('dashboard.housekeeping'), icon: Briefcase, color: 'text-green bg-green/10' },
    { id: 'reception', label: t('dashboard.reception'), icon: ConciergeBell, color: 'text-blue-500 bg-blue-50' },
    { id: 'maintenance', label: t('dashboard.maintenance'), icon: Wrench, color: 'text-orange-500 bg-orange-50' },
    { id: 'direction', label: t('dashboard.direction'), icon: ShieldCheck, color: 'text-red-500 bg-red-50' },
    { id: 'staff', label: t('dashboard.staff'), icon: UserPlus, color: 'text-pink-500 bg-pink-50' },
  ];
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  const isAdmin = user?.role === 'direction';

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    general: [
      {
        id: '1',
        sender: 'Léa',
        role: 'Gouvernante',
        text: 'Jeanne, besoin de toi à la chambre 205 pour vérifier un problème de climatisation.',
        time: '09:35',
        isMe: false,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lea',
        type: 'text'
      },
      {
        id: '2',
        sender: 'Jeanne',
        role: 'F. de chambre',
        text: "Je vais y aller de suite, j'ai presque fini l'étage, je vous tiens au courant !",
        time: '09:36',
        isMe: true,
        type: 'text'
      }
    ],
    housekeeping: [],
    reception: [],
    maintenance: [],
    direction: [],
    staff: []
  });

  const staffMembers = [
    { id: '1', name: 'Julien B.', role: 'Réception', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julien' },
    { id: '2', name: 'Léa M.', role: 'Gouvernante', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lea' },
    { id: '3', name: 'Thomas R.', role: 'Maintenance', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas' },
    { id: '6', name: 'Jeanne D.', role: 'F. de chambre', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jeanne' },
  ];

  const handleSend = (text?: string, voiceUrl?: string, duration?: string, type: 'text' | 'voice' | 'broadcast' = 'text', target?: string) => {
    if (type === 'text' && !text?.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: user?.first_name || 'Moi',
      role: user?.role || 'Staff',
      text,
      voiceUrl,
      duration,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type,
      targetService: target
    };

    setMessages(prev => ({
      ...prev,
      [activeService]: [...(prev[activeService] || []), newMessage]
    }));
    setMessage('');
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingInterval.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
    setIsRecording(false);
    const duration = `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`;
    handleSend(undefined, 'dummy-url', duration, 'voice');
  };

  const clearChat = () => {
    setMessages(prev => ({ ...prev, [activeService]: [] }));
    setShowMenu(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, activeService]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="bg-violet text-white px-6 py-4 flex flex-col gap-4 shrink-0 z-50 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="active-tap w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-light flex items-center justify-center text-green shadow-sm">
                <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">{t('dashboard.chat')}</h1>
                <p className="text-[10px] opacity-70 uppercase tracking-widest font-medium">{t('common.online')} • {SERVICES.find(s => s.id === activeService)?.label}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button 
                onClick={() => setShowBroadcastModal(true)}
                className="active-tap w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-yellow-400"
                title="Notification ciblée"
              >
                <Megaphone size={20} />
              </button>
            )}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="active-tap w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
              >
                <MoreVertical size={24} />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowMenu(false)}
                      className="fixed inset-0 z-40"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl z-50 py-2 border border-border/50 text-text-primary"
                    >
                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => { setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm font-medium"
                          >
                            <UserPlus size={16} className="text-text-secondary" />
                            {t('common.soon')}
                          </button>
                          <button 
                            onClick={() => { setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm font-medium"
                          >
                            <BellOff size={16} className="text-text-secondary" />
                            {t('common.soon')}
                          </button>
                          <button 
                            onClick={() => { setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm font-medium"
                          >
                            <Settings size={16} className="text-text-secondary" />
                            {t('common.soon')}
                          </button>
                          <div className="h-px bg-border/50 my-1 mx-2" />
                        </>
                      )}
                      <button 
                        onClick={clearChat}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 active:bg-red-100 transition-colors text-sm font-medium text-red-500"
                      >
                        <Trash2 size={16} />
                        {t('common.delete')}
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Service Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all active-tap",
                activeService === service.id 
                  ? "bg-white text-violet shadow-lg scale-105" 
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              )}
            >
              <service.icon size={14} />
              {service.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
      >
        {activeService === 'staff' ? (
          <div className="space-y-4">
            <div className="bg-pink-50 border border-pink-100 p-4 rounded-2xl mb-6">
              <p className="text-xs font-bold text-pink-600 mb-1 flex items-center gap-2">
                <ShieldCheck size={14} />
                {t('dashboard.direction')}
              </p>
              <p className="text-[10px] text-pink-500 leading-relaxed">
                {t('common.soon')}
              </p>
            </div>
            <div className="grid gap-3">
              {staffMembers.map(member => (
                <button
                  key={member.id}
                  onClick={() => {
                    setActiveService('general'); // Switch to general for now or handle specific chat
                    setShowBroadcastModal(true);
                  }}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border hover:border-pink-200 transition-all active-tap text-left"
                >
                  <img src={member.avatar} alt="" className="w-10 h-10 rounded-xl" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-text-primary">{member.name}</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">{member.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                    <Megaphone size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          (messages[activeService] || []).map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.isMe ? "ml-auto items-end" : "mr-auto items-start",
              msg.type === 'broadcast' && "max-w-full w-full items-center"
            )}
          >
            {msg.type === 'broadcast' ? (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl w-full flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                  <Megaphone size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest">{t('notifications.title')} • {msg.targetService}</p>
                    <span className="text-[9px] text-text-secondary">{msg.time}</span>
                  </div>
                  <p className="text-sm font-bold text-text-primary">{msg.text}</p>
                </div>
              </div>
            ) : (
              <>
                {!msg.isMe && (
                  <div className="flex items-center gap-2 mb-1">
                    <img src={msg.avatar} alt={msg.sender} className="w-6 h-6 rounded-full bg-surface border border-border" />
                    <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">{msg.sender}</span>
                    <span className="text-[9px] text-text-secondary italic">({msg.role})</span>
                    <span className="text-[9px] text-text-secondary ml-1">{msg.time}</span>
                  </div>
                )}
                
                <div className={cn(
                  "px-4 py-3 rounded-[24px] text-sm shadow-sm",
                  msg.isMe 
                    ? "bg-violet text-white rounded-tr-none" 
                    : "bg-surface text-text-primary border border-border/50 rounded-tl-none"
                )}>
                  {msg.type === 'voice' ? (
                    <div className="flex items-center gap-3 min-w-[150px]">
                      <button className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        msg.isMe ? "bg-white/20 text-white" : "bg-violet/10 text-violet"
                      )}>
                        <Play size={14} fill="currentColor" />
                      </button>
                      <div className="flex-1 h-1 bg-current opacity-20 rounded-full relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-current rounded-full" />
                      </div>
                      <span className="text-[10px] font-bold">{msg.duration}</span>
                      <Volume2 size={14} className="opacity-50" />
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>

                {msg.isMe && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[9px] text-text-secondary">{msg.time}</span>
                    <CheckCheck size={12} className="text-violet" />
                  </div>
                )}
              </>
            )}
          </motion.div>
          ))
        )}
      </div>

      {/* Bottom Container (Input) */}
      {activeService !== 'staff' && (
        <div className="shrink-0 bg-background/80 backdrop-blur-md border-t border-border p-4 pb-24">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex-1 bg-surface rounded-[24px] border border-border px-4 py-3 flex items-center transition-all",
              isRecording && "bg-red-50 border-red-200"
            )}>
              {isRecording ? (
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-red-500 font-mono">{formatTime(recordingTime)}</span>
                  </div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{t('common.loading')}...</span>
                </div>
              ) : (
                <>
                  <input 
                    type="text" 
                    placeholder={t('common.loading')} 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-secondary/50"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(message)}
                  />
                  {message && (
                    <button 
                      onClick={() => setMessage('')}
                      className="text-violet opacity-50 active-tap"
                    >
                      <X size={16} />
                    </button>
                  )}
                </>
              )}
            </div>
            
            <button 
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active-tap",
                isRecording ? "bg-red-500 text-white scale-125" : "bg-violet/10 text-violet"
              )}
            >
              <Mic size={20} />
            </button>

            {message && !isRecording && (
              <button 
                onClick={() => handleSend(message)}
                className="w-12 h-12 rounded-full bg-violet text-white flex items-center justify-center shadow-lg active-tap"
              >
                <Send size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Broadcast Modal */}
      <AnimatePresence>
        {showBroadcastModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBroadcastModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md z-[101]"
            >
              <div className="bg-white rounded-[32px] border border-border/50 shadow-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                      <Megaphone size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-text-primary">{t('notifications.title')}</h2>
                  </div>
                  <button onClick={() => setShowBroadcastModal(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary active-tap">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 block">{t('dashboard.staff')}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICES.map(s => (
                        <button
                          key={s.id}
                          onClick={() => setActiveService(s.id)}
                          className={cn(
                            "px-3 py-2 rounded-xl text-[10px] font-bold border transition-all active-tap",
                            activeService === s.id ? "bg-violet text-white border-violet" : "bg-gray-50 border-border text-text-secondary"
                          )}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 block">{t('common.description')}</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-border rounded-2xl p-4 text-sm outline-none focus:border-violet transition-colors min-h-[100px]"
                      placeholder={t('common.loading')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    handleSend(message, undefined, undefined, 'broadcast', SERVICES.find(s => s.id === activeService)?.label);
                    setShowBroadcastModal(false);
                  }}
                  className="w-full py-4 bg-violet text-white font-bold rounded-2xl shadow-lg shadow-violet/20 active-tap"
                >
                  {t('common.confirm')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
