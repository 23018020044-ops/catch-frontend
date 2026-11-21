export const formatPKR = (amount: number): string => {
  try {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'Rs.');
  } catch (e) {
    return `Rs. ${amount.toLocaleString()}`;
  }
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

export const formatWalkTime = (meters: number): string => {
  const mins = Math.max(1, Math.round(meters / 80));
  return `${mins} min walk`;
};
