import { PayloadAction } from "@reduxjs/toolkit";

interface EntityWithId {
  id: string | number;
}

interface StateWithItems<C> {
  items: C[];
  isLoading: boolean;
  error: any;
  needUpdate: boolean;
}

export const handleFetchItemsFulfilled = <C, T extends StateWithItems<C>, E>(
  state: T,
  action: PayloadAction<E>,
): T => ({
  ...state,
  items: action.payload,
  isLoading: false,
  error: null,
});

export const handleAddItemFulfilled = <C, T extends StateWithItems<C>, E>(
  state: T,
  action: PayloadAction<E>,
): T => ({
  ...state,
  items: [...state.items, action.payload],
  isLoading: false,
  error: null,
});

export const handleDeleteItemFulfilled = <
  C extends EntityWithId,
  T extends StateWithItems<C>,
  E,
>(
  state: T,
  action: PayloadAction<E>,
): T => ({
  ...state,
  items: [...state.items.filter((item) => item.id !== action.payload)],
  isLoading: false,
  error: null,
});

export const handleEditItemFulfilled = <
  C extends EntityWithId,
  T extends StateWithItems<C>,
  E extends EntityWithId,
>(
  state: T,
  action: PayloadAction<E>,
): T => {
  const index = state.items.findIndex((item) => item.id === action.payload.id);
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      { ...action.payload },
      ...state.items.slice(index + 1),
    ],
    isLoading: false,
    error: null,
  };
};
