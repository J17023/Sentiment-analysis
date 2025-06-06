import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  login,
  register,
  saveToken,
  getToken,
  removeToken,
  isAuthenticated,
  AuthRequest,
} from "./auth";

// Mocks global fetch
(globalThis as any).fetch = vi.fn();

const mockToken = "mocked-token";
const credentials: AuthRequest = {
  username: "testuser",
  password: "testpassword",
};

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

describe("Auth Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it("saveToken should store token in localStorage", () => {
    saveToken(mockToken);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "auth_token",
      mockToken
    );
    expect(getToken()).toBe(mockToken);
  });

  it("removeToken should clear the token", () => {
    saveToken(mockToken);
    removeToken();
    expect(getToken()).toBeNull();
  });

  it("isAuthenticated should return true when token exists", () => {
    saveToken(mockToken);
    expect(isAuthenticated()).toBe(true);
  });

  it("isAuthenticated should return false when no token exists", () => {
    removeToken();
    expect(isAuthenticated()).toBe(false);
  });

  it("login should return token on success", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: mockToken }),
    });

    const response = await login(credentials);
    expect(response.token).toBe(mockToken);
  });

  it("login should throw error on failure", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: "Invalid credentials" }),
    });

    await expect(login(credentials)).rejects.toThrow("Invalid credentials");
  });

  it("register should return message on success", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "User registered successfully" }),
    });

    const response = await register(credentials);
    expect(response.message).toBe("User registered successfully");
  });

  it("register should throw error on failure", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: "Username already exists" }),
    });

    await expect(register(credentials)).rejects.toThrow(
      "Username already exists"
    );
  });
});
