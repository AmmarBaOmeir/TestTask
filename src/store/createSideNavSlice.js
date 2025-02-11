export const createSideNavSlice = (set) => {
  return {
    viewMode: true,
    setViewMode: (viewMode) => set({ viewMode }),
    navs: [],
    setNavs: (navs) => set({ navs }),
    editedNavs: [],
    setEditedNavs: (editedNavs) => set({ editedNavs }),
    favorites: [],
    setFavorites: (favorites) => set({ favorites }),
  };
};
