import React from 'react';
import { Shield, Eye, Database, Lock, Mail, CheckCircle, X } from 'lucide-react';

export const SecurityPolicy = () => {
  const sections = [
    {
      title: "Collecte des données",
      icon: Eye,
      color: "bg-blue-50 text-blue-600",
      content: "Nous collectons uniquement les données nécessaires au fonctionnement du service de gestion hôtelière : informations sur les hôtels, les chambres, les employés et les opérations quotidiennes. Aucune donnée client personnelle n'est stockée au-delà de ce qui est nécessaire pour le service."
    },
    {
      title: "Finalités du traitement",
      icon: Database,
      color: "bg-purple-50 text-purple-600",
      content: "Les données sont utilisées exclusivement pour la gestion opérationnelle de l'hôtel (housekeeping, maintenance, petit-déjeuner, stocks), la facturation des services, et l'amélioration de la qualité du service."
    },
    {
      title: "Droits des personnes",
      icon: Shield,
      color: "bg-green-50 text-green-600",
      content: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de portabilité et d'opposition au traitement de vos données. Pour exercer ces droits, contactez notre Délégué à la Protection des Données."
    },
    {
      title: "Mesures de sécurité",
      icon: Lock,
      color: "bg-orange-50 text-orange-600",
      content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées : chiffrement des données en transit et au repos, contrôle d'accès basé sur les rôles (RBAC), journalisation des actions, sauvegardes régulières et audits de sécurité."
    },
    {
      title: "Contact DPO",
      icon: Mail,
      color: "bg-red-50 text-red-600",
      content: "Pour toute question relative à la protection de vos données, contactez notre DPO à l'adresse : dpo@flowtym.com"
    },
    {
      title: "Conformité",
      icon: CheckCircle,
      color: "bg-teal-50 text-teal-600",
      content: "FLOWTYM est conforme au RGPD (UE 2016/679), à la loi Informatique et Libertés, et aux recommandations de la CNIL. Les données sont hébergées dans l'Union Européenne."
    }
  ];

  return (
    <div className="space-y-4 pb-10">
      <div className="bg-surface rounded-[24px] card-shadow p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <Shield size={20} />
          </div>
          <h2 className="text-sm font-bold text-text-primary">Politique de sécurité et confidentialité</h2>
        </div>

        <p className="text-[11px] text-text-secondary leading-relaxed mb-6">
          FLOWTYM s'engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et aux lois applicables en matière de protection des données.
        </p>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="bg-background/50 rounded-2xl p-4 border border-border/30">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${section.color} flex items-center justify-center`}>
                  <section.icon size={16} />
                </div>
                <h3 className="text-xs font-bold text-text-primary">{section.title}</h3>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed pl-11">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[9px] text-text-secondary font-medium opacity-50 uppercase tracking-widest">
            FLOWTYM © 2026
          </p>
        </div>
      </div>
    </div>
  );
};
