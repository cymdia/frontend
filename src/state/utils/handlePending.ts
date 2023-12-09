export const handlePending = <T>(state: T): T => ({
  ...state,
  isLoading: true,
  error: null,
});

export const handleAddItemPending = <T>(state: T): T => ({
  ...state,
  isLoading: true,
  needUpdate: false,
  error: null,
});
