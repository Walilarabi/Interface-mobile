
// src/services/mockData.ts

export const mockInternalComments = [
  {
    id: '1',
    location: 'room',
    room_number: '204',
    rating: 9,
    comment: 'Chambre impeccable, merci pour le petit mot de bienvenue !',
    created_at: new Date().toISOString(),
    status: 'new'
  },
  {
    id: '2',
    location: 'restaurant',
    room_number: null,
    rating: 10,
    comment: 'Service au petit déjeuner exceptionnel, Julie a été adorable.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'read'
  },
  {
    id: '3',
    location: 'spa',
    room_number: '105',
    rating: 8,
    comment: 'Le spa est magnifique, mais il manquait des serviettes propres à 16h.',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    status: 'new'
  }
];

export const mockPlatformComments = [
  {
    id: 'p1',
    platform: 'booking',
    rating: 4.5,
    comment: 'Excellent séjour, personnel très accueillant et propreté irréprochable.',
    guest_name: 'Jean Dupont',
    date: '2026-03-28',
    response: 'Merci beaucoup Jean ! Au plaisir de vous revoir.'
  },
  {
    id: 'p2',
    platform: 'google',
    rating: 5,
    comment: 'The best hotel in Paris! The staff goes above and beyond.',
    guest_name: 'Sarah Miller',
    date: '2026-03-30',
    response: null
  },
  {
    id: 'p3',
    platform: 'tripadvisor',
    rating: 4,
    comment: 'Très bon hôtel, bien situé. Un peu de bruit le matin.',
    guest_name: 'Marc L.',
    date: '2026-03-25',
    response: 'Merci pour votre retour Marc, nous allons regarder cela.'
  },
  {
    id: 'p4',
    platform: 'expedia',
    rating: 4.8,
    comment: 'Excellent service and very clean rooms. Highly recommended!',
    guest_name: 'David Wilson',
    date: '2026-04-01',
    response: null
  },
  {
    id: 'p5',
    platform: 'expedia',
    rating: 3.5,
    comment: 'Good location, but the elevator was slow.',
    guest_name: 'Emma Thompson',
    date: '2026-03-29',
    response: 'We are sorry for the inconvenience, Emma. We are working on it.'
  },
  {
    id: 'p6',
    platform: 'trip',
    rating: 4.2,
    comment: 'Great experience, very convenient location and clean rooms.',
    guest_name: 'Lucas G.',
    date: '2026-04-02',
    response: null
  }
];

export const mockSatisfactionScore = {
  global_score: 88,
  internal_score: 92,
  platform_score: 84,
  evolution: 4,
  breakdown: {
    room: 94,
    restaurant: 89,
    spa: 82,
    fitness: 85
  }
};

export const mockTeamScores = {
  teams: [
    { team: 'Housekeeping', score: 94, positive_comments: 124 },
    { team: 'Réception', score: 91, positive_comments: 89 },
    { team: 'Restaurant', score: 88, positive_comments: 67 },
    { team: 'Maintenance', score: 85, positive_comments: 34 }
  ],
  team_of_the_month: 'Housekeeping'
};

export const mockStaffScore = {
  userId: 'user_1',
  score: 95,
  evolution: 2,
  badges: ['top_performer', 'early_bird', 'customer_favorite'],
  last_update: new Date().toISOString()
};

export const mockRanking = [
  { name: 'Lâvia', score: 98, photo: 'https://picsum.photos/seed/lavia/100/100' },
  { name: 'Jovanna B.', score: 95, photo: 'https://picsum.photos/seed/jovanna/100/100' },
  { name: 'Clara L.', score: 92, photo: 'https://picsum.photos/seed/clara/100/100' },
  { name: 'Thomas R.', score: 89, photo: 'https://picsum.photos/seed/thomas/100/100' },
  { name: 'Julie D.', score: 88, photo: 'https://picsum.photos/seed/julie/100/100' }
];

export const mockNotifications = [
  {
    id: 'n1',
    type: 'info',
    title: 'Planning mis à jour',
    message: 'Votre planning pour la semaine prochaine a été validé.',
    created_at: new Date().toISOString(),
    read: false
  },
  {
    id: 'n2',
    type: 'success',
    title: 'Félicitations !',
    message: 'Vous avez reçu le badge "Top Performer" du mois.',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: 'n3',
    type: 'warning',
    title: 'Retard signalé',
    message: 'Votre retard de ce matin a été enregistré.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    read: true
  }
];

export const mockPlanning = [
  { date: '2026-04-01', shift: '08:00 - 16:00', role: 'Housekeeping' },
  { date: '2026-04-02', shift: '08:00 - 16:00', role: 'Housekeeping' },
  { date: '2026-04-03', shift: 'OFF', role: null },
  { date: '2026-04-04', shift: '08:00 - 16:00', role: 'Housekeeping' },
  { date: '2026-04-05', shift: '08:00 - 16:00', role: 'Housekeeping' }
];

export const mockCongeBalance = {
  cp: 12.5,
  rtt: 4,
  recup: 2
};

export const mockRHRequests = [
  { id: 'req1', type: 'cp', status: 'approved', date: '2026-03-15', label: 'Congés Payés' },
  { id: 'req2', type: 'off', status: 'pending', date: '2026-04-10', label: 'Jour Off' }
];
