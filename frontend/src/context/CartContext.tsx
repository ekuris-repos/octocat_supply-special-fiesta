/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const CART_STORAGE_KEY = 'cart';

export interface CartProduct {
  productId: number;
  name: string;
  price: number;
  imgName: string;
  discount?: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  fee: number;
  total: number;
  addItem: (item: CartProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const getUnitPrice = (item: CartProduct) =>
  item.discount != null && item.discount > 0 ? item.price * (1 - item.discount) : item.price;

const getInitialItems = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const storedCart = sessionStorage.getItem(CART_STORAGE_KEY);
  if (!storedCart) {
    return [];
  }

  try {
    const parsedItems = JSON.parse(storedCart) as CartItem[];
    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getInitialItems);

  useEffect(() => {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartProduct, quantity = 1) => {
    if (quantity <= 0) {
      return;
    }

    setItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.productId === item.productId);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0),
    [items],
  );

  const fee = useMemo(() => (subtotal > 0 && subtotal < 100 ? 7.99 : 0), [subtotal]);
  const total = useMemo(() => subtotal + fee, [subtotal, fee]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        fee,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
