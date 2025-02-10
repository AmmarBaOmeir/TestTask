import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { withLenses, lens } from '@dhmk/zustand-lens';
import { createSideNavSlice } from './createSideNavSlice';

export const useSideNavStore = create()(
  devtools(
    withLenses(() => ({
      sideNav: lens(createSideNavSlice),
    })),
    {
      name: 'SideNavStore',
    }
  )
);
