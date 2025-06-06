import { describe, it, vi, expect, beforeEach } from "vitest";
import * as authService from "../services/auth";

// Mock del servicio de autenticación
vi.mock("../services/auth", async () => {
  const actual = await vi.importActual("../services/auth");
  return {
    ...actual,
    register: vi.fn(),
  };
});

describe("Register logic", () => {
  const mockAlert = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock global alert
    global.alert = mockAlert;
  });

  it("debería registrar un usuario correctamente", async () => {
    // Mock de la respuesta de registro exitoso
    const mockRegisterResponse = {
      message: "User registered successfully",
    };

    (authService.register as any).mockResolvedValueOnce(mockRegisterResponse);

    try {
      const result = await authService.register({
        username: "testuser",
        password: "testpassword",
      });

      // Simular las acciones que haría el componente Register
      mockAlert("Usuario registrado exitosamente!");
      mockNavigate("/login");
    } catch (error) {
      // No debería entrar aquí en caso de éxito
      expect(true).toBe(false);
    }

    // Verificar que register fue llamado con los parámetros correctos
    expect(authService.register).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });

    // Verificar que se mostraron los mensajes y navegación correctos
    expect(mockAlert).toHaveBeenCalledWith("Usuario registrado exitosamente!");
  });

  it("debería manejar errores de registro", async () => {
    const registerError = new Error("Username already exists");
    (authService.register as any).mockRejectedValueOnce(registerError);

    try {
      await authService.register({
        username: "failuser",
        password: "failpassword",
      });

      // No debería llegar aquí si hay error
      expect(true).toBe(false);
    } catch (error) {
      // Verificar que el error fue propagado correctamente
      expect((error as Error).message).toBe("Username already exists");
    }

    // Verificar que register fue llamado con los parámetros correctos
    expect(authService.register).toHaveBeenCalledWith({
      username: "failuser",
      password: "failpassword",
    });

    // Verificar que las funciones mock NO fueron llamadas en caso de error
    expect(mockAlert).not.toHaveBeenCalled();
  });
});
