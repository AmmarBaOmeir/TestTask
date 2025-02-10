export const createSideNavSlice = (set) => {
  return {
    viewMode: true,
    setViewMode: (newValue) => set(newValue),
  };
};
