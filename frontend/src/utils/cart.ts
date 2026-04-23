export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FEE = 7.99;

export interface PricedCartItem {
  price: number;
  discount?: number;
}

/**
 * Discount is expected as a decimal ratio (e.g. 0.2 means 20% off).
 */
export const getUnitPrice = (item: PricedCartItem) =>
  item.discount != null && item.discount > 0 ? item.price * (1 - item.discount) : item.price;

export const calculateFee = (subtotal: number) =>
  subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
