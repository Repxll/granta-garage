"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Состояние каркаса. В продукте машина и гараж живут на сервере и опознаются по Telegram-юзеру;
// здесь — localStorage, чтобы happy path кликался целиком.

export type GarageItem = {
  slug: string;
  name: string;
  price: number;
  workPrice: number;
  photo: boolean;
  reworked: boolean | null;
  addedAt: string;
};

type State = {
  body: string | null;
  modification: string | null;
  garage: GarageItem[];
  respects: string[];
};

const empty: State = { body: null, modification: null, garage: [], respects: [] };

const Ctx = createContext<{
  state: State;
  setCar: (body: string, modification: string) => void;
  addItem: (item: GarageItem) => void;
  toggleRespect: (id: string) => void;
  reset: () => void;
}>({ state: empty, setCar: () => {}, addItem: () => {}, toggleRespect: () => {}, reset: () => {} });

const KEY = "granta-frame-v1";

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(empty);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...empty, ...JSON.parse(raw) });
    } catch {
      // приватный режим или заблокированное хранилище — каркас просто стартует пустым
    }
  }, []);

  const persist = (next: State) => {
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // см. выше
    }
  };

  return (
    <Ctx.Provider
      value={{
        state,
        setCar: (body, modification) => persist({ ...state, body, modification }),
        addItem: (item) => persist({ ...state, garage: [...state.garage, item] }),
        toggleRespect: (id) =>
          persist({
            ...state,
            respects: state.respects.includes(id)
              ? state.respects.filter((r) => r !== id)
              : [...state.respects, id],
          }),
        reset: () => persist(empty),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
