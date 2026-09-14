"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api, tg, type AppState } from "./api";

// Состояние приходит с сервера одним запросом и обновляется после каждого действия.
// localStorage больше не участвует: гараж должен быть виден с любого устройства
// и попадать в чужие ленты.

type Ctx = {
  state: AppState | null;
  loading: boolean;
  error: string | null;
  setCar: (body: string, modification: string) => Promise<void>;
  addInstall: (i: { partSlug: string; price: number; workPrice: number; reworked: boolean }) => Promise<void>;
  toggleRespect: (target: string) => Promise<void>;
  reload: () => Promise<void>;
};

const AppCtx = createContext<Ctx>({
  state: null,
  loading: true,
  error: null,
  setCar: async () => {},
  addInstall: async () => {},
  toggleRespect: async () => {},
  reload: async () => {},
});

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setState(await api.state());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не получилось загрузить");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = tg();
    t?.ready?.();
    t?.expand?.();
    // Тема — как в мессенджере у пользователя (и ?theme=dark для проверки в браузере)
    const q = new URLSearchParams(window.location.search).get("theme");
    const dark = q ? q === "dark" : t?.colorScheme === "dark";
    document.documentElement.classList.toggle("dark", dark);
    void reload();
  }, [reload]);

  return (
    <AppCtx.Provider
      value={{
        state,
        loading,
        error,
        reload,
        setCar: async (body, modification) => {
          await api.setCar(body, modification);
          await reload();
        },
        addInstall: async (i) => {
          await api.addInstall({ ...i, hasPhoto: true });
          await reload();
        },
        toggleRespect: async (target) => {
          // Оптимистично: счётчик отзывается сразу, расхождение чинится перезагрузкой.
          setState((s) =>
            s
              ? {
                  ...s,
                  respects: s.respects.includes(target)
                    ? s.respects.filter((t) => t !== target)
                    : [...s.respects, target],
                }
              : s,
          );
          try {
            await api.respect(target);
          } catch {
            await reload();
          }
        },
      }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export const useApp = () => useContext(AppCtx);
