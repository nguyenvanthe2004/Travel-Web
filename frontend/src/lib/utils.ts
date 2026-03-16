
export const formatPrice = (price: number): string => {
  return `$${price?.toLocaleString("en-US") || "0"}`;
};
export const getNights = (checkIn: Date, checkOut: Date) => {
  if (!checkIn || !checkOut) return 0;

  const diff = checkOut.getTime() - checkIn.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const statusStyles = {
  confirmed: "bg-emerald-50 text-emerald-600 border-emerald-200",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  cancelled: "bg-red-50 text-red-400 border-red-200",
};

export const accentBarStyles = {
  confirmed: "bg-emerald-400",
  pending: "bg-amber-400",
  cancelled: "bg-red-400",
};
