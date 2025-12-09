import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { mockUsers } from '@/data/mockUsers';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
  updatePoints: (amount: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: (userId: string) => {
        const user = mockUsers.find((u) => u.id === userId);
        if (user) {
          set({ user, isLoggedIn: true });
        }
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      updatePoints: (amount: number) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              points: currentUser.points + amount,
            },
          });
        }
      },
    }),
    {
      name: 'sea-mate-auth',
    }
  )
);
