import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MoreVertical, Send, Check, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface Message {
  id: string;
  sender: string;
  role: string;
  text: string;
  time: string;
  isMe: boolean;
  avatar?: string;
}

export const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Léa',
      role: 'Gouvernante',
      text: 'Jeanne, besoin de toi à la chambre 205 pour vérifier un problème de climatisation.',
      time: '09:35',
      isMe: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lea'
    },
    {
      id: '2',
      sender: 'Jeanne',
      role: 'F. de chambre',
      text: "Je vais y aller de suite, j'ai presque fini l'étage, je vous tiens au courant !",
      time: '09:36',
      isMe: true,
    },
    {
      id: '3',
      sender: 'Léa',
      role: 'Gouvernante',
      text: 'Parfait, merci Jeanne !',
      time: '09:36',
      isMe: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lea'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="bg-violet text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
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
              <h1 className="font-bold text-lg leading-tight">Chat équipe</h1>
              <p className="text-[10px] opacity-70 uppercase tracking-widest font-medium">En ligne</p>
            </div>
          </div>
        </div>
        <button className="active-tap w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-32">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.isMe ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
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
              {msg.text}
            </div>

            {msg.isMe && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] text-text-secondary">{msg.time}</span>
                <CheckCheck size={12} className="text-violet" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-24 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border z-40">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1 bg-surface rounded-[24px] border border-border px-4 py-3 flex items-center">
            <input 
              type="text" 
              placeholder="Écrire un message..." 
              className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-secondary/50"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="text-violet opacity-50 active-tap">
              <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">X</div>
            </button>
          </div>
          <button className="w-12 h-12 rounded-full bg-violet text-white flex items-center justify-center shadow-lg active-tap">
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Tracking Commissions Badge */}
      <div className="fixed bottom-44 left-6 right-6 z-30">
        <div className="bg-surface/90 backdrop-blur-sm border border-border p-3 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-light flex items-center justify-center text-violet">
              <Send size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-text-primary">Tracking Commissions</p>
              <p className="text-[9px] text-text-secondary">Visible seulement par la réception</p>
            </div>
          </div>
          <span className="bg-green-light text-green text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Bientôt</span>
        </div>
      </div>
    </div>
  );
};
