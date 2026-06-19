import { create } from 'zustand';
import { products as mockProducts } from '../mockData';

const useStore = create((set, get) => ({
  // Products
  products: mockProducts,
  currentProduct: null,

  // Cart
  cart: [],

  // Favorites
  favorites: [],

  // UI State
  isSkuOpen: false,
  isCouponOpen: false,
  selectedSpecs: {},
  quantity: 1,

  // 加购抛物线动画触发
  flyTrigger: null, // { x, y, image } or null

  // Actions
  setCurrentProduct: (id) => {
    const product = mockProducts.find(p => p.id === id);
    set({ currentProduct: product, selectedSpecs: {}, quantity: 1 });
  },

  toggleSku: () => set(state => ({ isSkuOpen: !state.isSkuOpen })),
  toggleCoupon: () => set(state => ({ isCouponOpen: !state.isCouponOpen })),

  // 触发抛物线动画
  triggerFly: (x, y, image) => set({ flyTrigger: { x, y, image, _t: Date.now() } }),
  clearFly: () => set({ flyTrigger: null }),

  selectSpec: (specName, option) => {
    set(state => ({
      selectedSpecs: { ...state.selectedSpecs, [specName]: option }
    }));
  },

  setQuantity: (qty) => {
    if (qty >= 1 && qty <= 99) {
      set({ quantity: qty });
    }
  },

  addToCart: (product, specs, qty) => {
    set(state => {
      const existingIndex = state.cart.findIndex(
        item => item.id === product.id && JSON.stringify(item.specs) === JSON.stringify(specs)
      );

      if (existingIndex >= 0) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += qty;
        return { cart: newCart };
      }

      return {
        cart: [...state.cart, {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          specs,
          quantity: qty,
          checked: true
        }]
      };
    });
  },

  removeFromCart: (index) => {
    set(state => ({
      cart: state.cart.filter((_, i) => i !== index)
    }));
  },

  updateCartQuantity: (index, qty) => {
    set(state => {
      const newCart = [...state.cart];
      newCart[index].quantity = qty;
      return { cart: newCart };
    });
  },

  toggleCartCheck: (index) => {
    set(state => {
      const newCart = [...state.cart];
      newCart[index].checked = !newCart[index].checked;
      return { cart: newCart };
    });
  },

  toggleFavorite: (productId) => {
    set(state => {
      const isFav = state.favorites.includes(productId);
      return {
        favorites: isFav
          ? state.favorites.filter(id => id !== productId)
          : [...state.favorites, productId]
      };
    });
  },

  isFavorite: (productId) => {
    return get().favorites.includes(productId);
  }
}));

export default useStore;
