import { type UserProps } from "@lir/lib/schema";

import { type StateCreator, createStore, useStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

type SessionState = {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  unsetUser: () => void;
};

const createSessionSlice: StateCreator<
  SessionState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  SessionState
> = (set) => ({
  user: null,

  setUser: (user: UserProps) => {
    set({ user }, false, "session/setUser");
  },

  unsetUser: () => {
    set({ user: null }, false, "session/unsetUser");
  },
});

export const sessionStore = createStore<SessionState>()(
  persist(
    devtools(
      (...a) => ({
        ...createSessionSlice(...a),
      }),
      { name: "Session Store" }
    ),
    {
      name: "session",
    }
  )
);

export const useAuth = () => useStore(sessionStore, (state) => !!state?.user);

export const useCurrentUser = () => useStore(sessionStore, (state) => state.user);

export const setUser = (user: UserProps) => sessionStore.getState().setUser(user);

export const unsetUser = () => sessionStore.getState().unsetUser();
