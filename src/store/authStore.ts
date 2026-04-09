import { create } from "zustand";

const TOKEN_EXPIRES_AT_KEY = "token_expires_at";
const SESSION_EXPIRED_MESSAGE =
  "로그인 세션이 만료되었습니다. 다시 로그인해 주세요.";

let expiryTimerId: ReturnType<typeof setTimeout> | null = null;

interface IStoreState {
  isLoggedIn: boolean;
  /** expiresIn: 로그인 시점부터 만료까지 남은 시간(초). API `expiresIn`과 동일. */
  storeLogin: (token: string, expiresIn?: number) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const getExpiresAtMs = (): number | null => {
  const raw = localStorage.getItem(TOKEN_EXPIRES_AT_KEY);
  if (raw == null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

const clearExpiryTimer = () => {
  if (expiryTimerId !== null) {
    clearTimeout(expiryTimerId);
    expiryTimerId = null;
  }
};

const clearExpiryStorage = () => {
  localStorage.removeItem(TOKEN_EXPIRES_AT_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  clearExpiryTimer();
  localStorage.removeItem("token");
  clearExpiryStorage();
};

const computeInitialLoggedIn = (): boolean => {
  const token = getToken();
  if (!token) return false;
  const expiresAt = getExpiresAtMs();
  if (expiresAt != null && Date.now() >= expiresAt) {
    localStorage.removeItem("token");
    clearExpiryStorage();
    return false;
  }
  return true;
};

const scheduleTokenExpiry = (expiresAtMs: number) => {
  clearExpiryTimer();
  const onExpire = () => {
    expiryTimerId = null;
    useAuthStore.setState({ isLoggedIn: false });
    removeToken();
    window.alert(SESSION_EXPIRED_MESSAGE);
  };
  const delay = expiresAtMs - Date.now();
  if (delay <= 0) {
    onExpire();
    return;
  }
  expiryTimerId = setTimeout(onExpire, delay);
};

export const useAuthStore = create<IStoreState>((set) => ({
  isLoggedIn: computeInitialLoggedIn(),
  storeLogin: (token: string, expiresIn?: number) => {
    set({ isLoggedIn: true });
    setToken(token);
    if (
      typeof expiresIn === "number" &&
      expiresIn > 0 &&
      Number.isFinite(expiresIn)
    ) {
      const expiresAtMs = Date.now() + expiresIn * 1000;
      localStorage.setItem(TOKEN_EXPIRES_AT_KEY, String(expiresAtMs));
      scheduleTokenExpiry(expiresAtMs);
    } else {
      clearExpiryStorage();
      clearExpiryTimer();
    }
  },
  storeLogout: () => {
    clearExpiryTimer();
    set({ isLoggedIn: false });
    localStorage.removeItem("token");
    clearExpiryStorage();
  },
}));

const token = getToken();
const expiresAt = getExpiresAtMs();
if (token && expiresAt != null && Date.now() < expiresAt) {
  scheduleTokenExpiry(expiresAt);
}
