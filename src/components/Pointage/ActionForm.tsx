import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, FileText, Send, CheckCircle2, User, AlertCircle, ChevronLeft, ChevronRight, PlusCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/src/hooks/useAuth';
import { cn } from '@/src/lib/utils';

interface ActionFormProps {
  type: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ActionForm = ({ type, onClose, onSuccess }: ActionFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    comment: '',
    file: null as File | null,
    extraDates: [] as string[],
    showExtrasCalendar: false,
  });

  const cpDetails = useMemo(() => {
    if (type !== 'cp') return null;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return { days: 0, returnDate: null };
    }
    
    let days = 0;
    const current = new Date(start);
    const offDays = user?.off_days || [];
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (!offDays.includes(dayOfWeek)) {
        days++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    const returnDate = new Date(end);
    returnDate.setDate(returnDate.getDate() + 1);
    while (offDays.includes(returnDate.getDay())) {
      returnDate.setDate(returnDate.getDate() + 1);
    }
    
    return {
      days,
      returnDate: returnDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    };
  }, [formData.startDate, formData.endDate, user?.off_days, type]);

  const getActionDetails = () => {
    switch (type) {
      case 'off':
        return {
          title: 'Poser un jour OFF',
          subtitle: 'Choisissez votre jour de congé',
          buttonText: 'Valider',
          illustration: '📅'
        };
      case 'retard':
        return {
          title: 'Déclarer un retard',
          subtitle: "Heure d'arrivée prévue",
          buttonText: 'Envoyer',
          illustration: '⏰'
        };
      case 'maladie':
        return {
          title: 'Informer Arrêt Maladie',
          subtitle: "Date du début de l'arrêt",
          buttonText: 'Envoyer',
          illustration: '🤒'
        };
      case 'cp':
        return {
          title: 'Demande de CP',
          subtitle: 'Planifiez vos congés payés',
          buttonText: 'Demander un congé',
          illustration: '🏖️'
        };
      case 'extra':
        return {
          title: 'Gestion des Extras',
          subtitle: 'Proposez vos disponibilités',
          buttonText: 'Valider mes extras',
          illustration: '✨'
        };
      case 'rdv':
        return {
          title: 'Demander un RDV',
          subtitle: 'Prendre rendez-vous avec votre manager',
          buttonText: 'Confirmer',
          illustration: '🤝'
        };
      default:
        return {
          title: 'Action RH',
          subtitle: 'Veuillez remplir le formulaire',
          buttonText: 'Valider',
          illustration: '📝'
        };
    }
  };

  const details = getActionDetails();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting HR Request:', { type, ...formData, cpDetails });
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(onSuccess, 2000);
    }, 1500);
  };

  const toggleExtraDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    const offDays = user?.off_days || [];
    
    if (!offDays.includes(dayOfWeek)) return; // Only allow off days

    setFormData(prev => ({
      ...prev,
      extraDates: prev.extraDates.includes(dateStr)
        ? prev.extraDates.filter(d => d !== dateStr)
        : [...prev.extraDates, dateStr]
    }));
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-surface p-12 rounded-[40px] card-shadow flex flex-col items-center text-center gap-6 w-full max-w-lg"
      >
        <div className="w-20 h-20 bg-green-light rounded-full flex items-center justify-center text-green">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-text-primary">Demande envoyée !</h3>
          <p className="text-text-secondary">Votre demande a été transmise avec succès.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-surface rounded-t-[40px] card-shadow p-8 space-y-8 w-full max-w-lg relative z-50 max-h-[90vh] overflow-y-auto no-scrollbar"
    >
      <div className="flex justify-between items-center">
        <div className="w-12 h-1 bg-border rounded-full absolute top-4 left-1/2 -translate-x-1/2"></div>
        <button 
          type="button"
          onClick={onClose} 
          className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-text-secondary active-tap ml-auto"
        >
          <X size={20} />
        </button>
      </div>

      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-background rounded-[32px] flex items-center justify-center mx-auto text-5xl shadow-inner">
          {details.illustration}
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-text-primary">{details.title}</h3>
          <p className="text-text-secondary text-sm">{details.subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'cp' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Début</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-violet opacity-40" size={18} />
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Fin</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-violet opacity-40" size={18} />
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet/20"
                    required
                  />
                </div>
              </div>
            </div>

            {cpDetails && cpDetails.days > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-violet-light/30 rounded-3xl p-6 border border-violet-light space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-violet uppercase tracking-wider">Jours décomptés</span>
                  <span className="text-2xl font-black text-violet">{cpDetails.days} j</span>
                </div>
                <div className="h-px bg-violet/10 w-full" />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Date de reprise prévue</span>
                  <p className="text-sm font-bold text-text-primary capitalize">{cpDetails.returnDate}</p>
                </div>
                <p className="text-[9px] text-text-secondary italic">
                  * Les jours OFF ({user?.off_days?.map(d => ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][d]).join(', ')}) ne sont pas décomptés.
                </p>
              </motion.div>
            )}
          </div>
        ) : type === 'extra' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-background p-4 rounded-2xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-light rounded-xl flex items-center justify-center text-violet">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">Activer les Extras</p>
                  <p className="text-[10px] text-text-secondary">Je suis disponible pour travailler</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, showExtrasCalendar: !prev.showExtrasCalendar }))}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  formData.showExtrasCalendar ? "bg-green" : "bg-border"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  formData.showExtrasCalendar ? "right-1" : "left-1"
                )} />
              </button>
            </div>

            <AnimatePresence>
              {formData.showExtrasCalendar && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-4"
                >
                  <div className="bg-background rounded-[32px] border border-border p-6 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest">Calendrier des repos</h4>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-violet" />
                          <span className="text-[8px] font-bold text-text-secondary uppercase">Repos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-border" />
                          <span className="text-[8px] font-bold text-text-secondary uppercase">Travail</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                        <div key={i} className="text-[10px] font-bold text-text-secondary text-center py-2">{d}</div>
                      ))}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const date = new Date(2024, 3, day); // April 2024 for demo
                        const dayOfWeek = date.getDay();
                        const isOff = user?.off_days?.includes(dayOfWeek);
                        const dateStr = date.toISOString().split('T')[0];
                        const isSelected = formData.extraDates.includes(dateStr);

                        return (
                          <button
                            key={i}
                            type="button"
                            disabled={!isOff}
                            onClick={() => toggleExtraDate(dateStr)}
                            className={cn(
                              "aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                              !isOff && "bg-background text-text-secondary opacity-20 cursor-not-allowed",
                              isOff && !isSelected && "bg-violet-light text-violet border border-violet/20 active-tap",
                              isSelected && "bg-green text-white shadow-lg scale-110"
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[9px] text-text-secondary italic text-center">
                      * Seuls vos jours de repos sont sélectionnables pour les extras.
                    </p>
                  </div>

                  {formData.extraDates.length > 0 && (
                    <div className="bg-green-light/30 rounded-2xl p-4 border border-green-light flex items-center justify-between">
                      <span className="text-xs font-bold text-green uppercase tracking-wider">Dates sélectionnées</span>
                      <span className="text-lg font-black text-green">{formData.extraDates.length} j</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-violet opacity-40" size={18} />
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet/20"
                  required
                />
              </div>
            </div>
            {(type === 'retard' || type === 'rdv') && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Heure</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet opacity-40" size={18} />
                  <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet/20"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {type === 'maladie' && (
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Justificatif (optionnel)</label>
            <div className="relative">
              <input 
                type="file" 
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                className="hidden" 
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="w-full bg-background border-2 border-dashed border-border rounded-2xl py-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-violet-light/30 transition-colors"
              >
                <FileText className="text-text-secondary opacity-40" size={24} />
                <span className="text-xs font-bold text-text-secondary">
                  {formData.file ? formData.file.name : 'Télécharger un document'}
                </span>
              </label>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Commentaire (optionnel)</label>
          <textarea 
            placeholder="Précisez votre demande..."
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full bg-background border border-border rounded-2xl py-4 px-4 min-h-[120px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet/20 text-text-primary resize-none"
            style={{ pointerEvents: 'auto' }}
          />
        </div>

        <button 
          type="submit"
          disabled={loading || (type === 'extra' && !formData.showExtrasCalendar)}
          className="w-full bg-green text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-green/20 active-tap flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <CheckCircle2 size={22} />
              {details.buttonText}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
