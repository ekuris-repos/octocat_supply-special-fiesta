import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency, getUnitPrice } from '../utils/cart';

export default function Cart() {
  const { items, subtotal, fee, total, updateQuantity, removeItem, clearCart } = useCart();
  const { darkMode } = useTheme();

  if (items.length === 0) {
    return (
      <div
        className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-24 pb-16 px-4 transition-colors duration-300`}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border shadow-sm p-10 text-center transition-colors duration-300`}
          >
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>Your Cart</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-4`}>
              Your cart is empty. Add some products to get started.
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-24 pb-16 px-4 transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>Your Cart</h1>
          {items.map((item) => {
            const unitPrice = getUnitPrice(item);

            return (
              <div
                key={item.productId}
                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border shadow-sm p-4`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <img
                    src={`/${item.imgName}`}
                    alt={item.name}
                    className={`w-24 h-24 object-contain rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  />
                  <div className="flex-grow">
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                      {item.name}
                    </h2>
                    <p className="text-primary font-bold mt-1">{formatCurrency(unitPrice)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className={`${darkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-gray-700'} w-8 h-8 rounded`}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span
                      className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-6 text-center`}
                      aria-label={`Cart quantity of ${item.name}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className={`${darkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-gray-700'} w-8 h-8 rounded`}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border shadow-sm p-6 h-fit`}
        >
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4`}>Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
              <span className={darkMode ? 'text-light' : 'text-gray-800'}>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Shipping Fee</span>
              <span className={darkMode ? 'text-light' : 'text-gray-800'}>{formatCurrency(fee)}</span>
            </div>
            <div className={`flex justify-between font-semibold text-lg border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-3`}>
              <span className={darkMode ? 'text-light' : 'text-gray-800'}>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="w-full mt-6 px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
