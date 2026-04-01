import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ShieldCheck, ChevronRight } from 'lucide-react';
import { Document } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface CoffreFortProps {
  onSign: (doc: Document) => void;
}

export const CoffreFort = ({ onSign }: CoffreFortProps) => {
  const documents: Document[] = [
    { id: '1', user_id: 'u1', type: 'pay_slip', name: 'Fiche de paie - Mars 2026', date: '2026-03-31', url: '#', signed: true },
    { id: '2', user_id: 'u1', type: 'pay_slip', name: 'Fiche de paie - Février 2026', date: '2026-02-28', url: '#', signed: true },
    { id: '3', user_id: 'u1', type: 'contract', name: 'Avenant contrat de travail', date: '2026-03-15', url: '#', signed: false },
    { id: '4', user_id: 'u1', type: 'attestation', name: 'Attestation employeur', date: '2026-01-10', url: '#', signed: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-violet/5 p-4 rounded-2xl border border-violet/10 flex items-start gap-3">
        <ShieldCheck className="text-violet shrink-0" size={20} />
        <p className="text-xs text-text-secondary leading-relaxed">
          Votre coffre-fort numérique est un espace sécurisé où sont archivés vos documents administratifs.
        </p>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-surface p-4 rounded-2xl card-shadow flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                doc.type === 'pay_slip' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
              )}>
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">{doc.name}</p>
                <p className="text-[10px] text-text-secondary uppercase tracking-wider">{doc.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!doc.signed ? (
                <button 
                  onClick={() => onSign(doc)}
                  className="bg-violet text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider active-tap"
                >
                  Signer
                </button>
              ) : (
                <button className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-text-secondary active-tap">
                  <Download size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
