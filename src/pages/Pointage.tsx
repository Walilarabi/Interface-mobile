import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, History, Calendar, LayoutGrid, PieChart, ChevronLeft, Menu, X as CloseIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Scanner } from '@/src/components/Pointage/Scanner';
import { Historique } from '@/src/components/Pointage/Historique';
import { Planning } from '@/src/components/Pointage/Planning';
import { ActionsRH } from '@/src/components/Pointage/ActionsRH';
import { SoldeConges } from '@/src/components/Pointage/SoldeConges';
import { ActionForm } from '@/src/components/Pointage/ActionForm';
import { Geolocation } from '@/src/components/Pointage/Geolocation';
import { useTranslation } from '@/src/hooks/useTranslation';

export const Pointage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'scanner';
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGeolocated, setIsGeolocated] = useState(false);

  const tabs = [
    { id: 'scanner', label: t('pointage.scanner'), icon: Scan },
    { id: 'historique', label: t('pointage.history'), icon: History },
    { id: 'planning', label: t('pointage.planning'), icon: Calendar },
    { id: 'actions', label: t('pointage.actions'), icon: LayoutGrid },
    { id: 'solde', label: t('pointage.balance'), icon: PieChart },
  ];

  const setTab = (id: string) => {
    navigate(`/pointage?tab=${id}`);
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    if (activeTab === 'scanner' && !isGeolocated) {
      return <Geolocation onConfirm={() => setIsGeolocated(true)} />;
    }

    switch (activeTab) {
      case 'scanner': return <Scanner />;
      case 'historique': return <Historique />;
      case 'planning': return <Planning />;
      case 'actions': return <ActionsRH onAction={(type) => setSelectedAction(type)} />;
      case 'solde': return <SoldeConges />;
      default: return <Scanner />;
    }
  };

  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label || t('pointage.title');

  return (
    <div className="h-full flex flex-col bg-background relative overflow-hidden">
      {/* Header with Back Button and Menu */}
      <div className="bg-surface px-6 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-border shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="active-tap text-text-primary w-10 h-10 rounded-xl bg-background flex items-center justify-center">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold text-text-primary uppercase tracking-wider">{activeTabLabel}</h2>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 bg-violet-light rounded-xl flex items-center justify-center text-violet active-tap"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-start">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-xs h-full bg-surface shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-violet text-white">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest opacity-70">{t('pointage.actions')}</span>
                  <span className="text-xl font-bold">{t('pointage.title')}</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center active-tap"
                >
                  <CloseIcon size={24} />
                </button>
              </div>

              <div className="flex-1 py-4 overflow-y-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-5 transition-colors active-tap ${
                      activeTab === tab.id 
                        ? 'bg-violet-light text-violet border-r-4 border-violet' 
                        : 'text-text-secondary hover:bg-background'
                    }`}
                  >
                    <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                    <span className="font-bold text-sm uppercase tracking-wider">{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                ))}
              </div>

              <div className="p-6 border-t border-border bg-background">
                <p className="text-[10px] text-text-secondary text-center uppercase tracking-widest font-medium">FLOWTYM v2.4.0</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Action Form Overlay */}
      <AnimatePresence>
        {selectedAction && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setSelectedAction(null)}
            />
            <div className="relative z-10 w-full max-w-lg">
              <ActionForm 
                type={selectedAction} 
                onClose={() => setSelectedAction(null)}
                onSuccess={() => setSelectedAction(null)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
