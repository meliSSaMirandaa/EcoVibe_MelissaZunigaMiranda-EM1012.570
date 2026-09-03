export const FACTORS = {
  electricity: 0.42,
  waste: 0.58,
  transportCarKm: 0.17,
  water: 0.00035,
  recyclingAvoided: 0.18,
};

export function estimateCarbon(category: string, quantity: number) {
  switch (category) {
    case 'ENERGY': return quantity * FACTORS.electricity;
    case 'WASTE': return quantity * FACTORS.waste;
    case 'TRANSPORT': return quantity * FACTORS.transportCarKm;
    case 'WATER': return quantity * FACTORS.water;
    case 'RECYCLING': return -quantity * FACTORS.recyclingAvoided;
    default: return 0;
  }
}
