export type DashboardData = {
  month: string;
  energy: number;
  waste: number;
  carbon: number;
  recycling: number;
  energyDelta: number;
  carbonDelta: number;
  ecoScore: number;
  ods7: number;
  ods15: number;
  activities: Array<{ id: string; date: string; category: string; quantity: number; unit: string; carbonKg: number; notes?: string | null }>;
};
