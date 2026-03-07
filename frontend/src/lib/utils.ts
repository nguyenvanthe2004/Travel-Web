export const formatPrice = (price: number): string => {
  return `$${price?.toLocaleString("en-US") || "0"}`;
};
export const getNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = end.getTime() - start.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };