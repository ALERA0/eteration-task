// basketSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: [],
    totalPrice:0,
  },
  reducers: {
    addToBasket: (state, action) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // Ürün zaten sepette varsa miktarını artır
        state.items[existingItemIndex].quantity += 1;
      } else {
        // Yeni bir ürünse sadece eklenen ürünü ekle
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem('basket', JSON.stringify(state.items)); // localStorage'e güncellenmiş sepeti kaydet
    },
    removeFromBasket: (state, action) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // Ürün sepette varsa miktarını azalt
        state.items[existingItemIndex].quantity -= 1;

        if (state.items[existingItemIndex].quantity === 0) {
          // Eğer miktar 0 olursa ürünü sepette tamamen sil
          state.items.splice(existingItemIndex, 1);
        }
      }

      localStorage.setItem('basket', JSON.stringify(state.items)); // localStorage'e güncellenmiş sepeti kaydet
    },
    resetBasket: (state) => {
      // Sepeti sıfırla
      state.items = [];
      localStorage.removeItem('basket'); // localStorage'dan sepeti temizle
    },
    calculateTotalPrice: (state) => {
      let total = 0;
      for (const item of state.items) {
        total += item.quantity * parseFloat(item.price);
      }
      state.totalPrice = total;
    },
  },
});

export const { addToBasket, removeFromBasket, resetBasket,calculateTotalPrice } = basketSlice.actions;

export default basketSlice.reducer;
