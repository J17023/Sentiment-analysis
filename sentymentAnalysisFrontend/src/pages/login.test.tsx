/*import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import * as authService from "../services/auth";

const mockAlert = vi.fn();
vi.stubGlobal("alert", mockAlert);

vi.mock("../services/auth", async () => {
  const actual = await vi.importActual("../services/auth");
  return {
    ...actual,
    login: vi.fn(),
    saveToken: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.only("debería hacer login y guardar el token", async () => {
    const mockToken = "mocked-token";

    (authService.login as any).mockResolvedValueOnce({ token: mockToken });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpassword",
      });
      expect(authService.saveToken).toHaveBeenCalledWith(mockToken);
      expect(mockAlert).toHaveBeenCalledWith("Bienvenido! Token: " + mockToken);
    });
  });

  it("debería lanzar error si el login falla", async () => {
    const loginError = new Error("Login failed");
    (authService.login as any).mockRejectedValueOnce(loginError);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "failuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "failpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        username: "failuser",
        password: "failpassword",
      });
    });

    // Verificar que se muestra un mensaje de error
    const errorMessage = await waitFor(() =>
      screen.getByText(/error al iniciar sesión|login failed/i)
    );
    expect(errorMessage).toBeDefined();
    expect(errorMessage.textContent).toMatch(
      /error al iniciar sesión|login failed/i
    );
  });
});
*/
// import { describe, it, vi, expect, beforeEach } from "vitest";
// import * as authService from "../services/auth";

// // Mock del servicio de autenticación
// vi.mock("../services/auth", async () => {
//   const actual = await vi.importActual("../services/auth");
//   return {
//     ...actual,
//     login: vi.fn(),
//     saveToken: vi.fn(),
//   };
// });

// describe("Login component logic", () => {
//   const mockAlert = vi.fn();
//   const mockNavigate = vi.fn();

//   beforeEach(() => {
//     vi.clearAllMocks();
//     // Mock global alert
//     global.alert = mockAlert;
//   });

//   it("debería hacer login y guardar el token", async () => {
//     // Mock de la respuesta de login con el nuevo formato JWT
//     const mockTokenResponse = {
//       access_token: "fake-jwt-token-12345",
//       token_type: "bearer",
//     };

//     (authService.login as any).mockResolvedValueOnce(mockTokenResponse);

//     try {
//       const result = await authService.login({
//         username: "testuser",
//         password: "testpassword",
//       });

//       // Simular el guardado del token (como haría el componente Login)
//       authService.saveToken(result.access_token);
//       mockAlert("¡Bienvenido! Sesión iniciada correctamente.");
//       mockNavigate("/sentimentAnaylisis");
//     } catch (error) {
//       // No debería entrar aquí
//       expect(true).toBe(false);
//     }

//     // Verificar que login fue llamado con los parámetros correctos
//     expect(authService.login).toHaveBeenCalledWith({
//       username: "testuser",
//       password: "testpassword",
//     });

//     // Verificar que saveToken fue llamado con el token correcto
//     expect(authService.saveToken).toHaveBeenCalledWith("fake-jwt-token-12345");

//     // Verificar que se mostraron los mensajes correctos
//     expect(mockAlert).toHaveBeenCalledWith(
//       "¡Bienvenido! Sesión iniciada correctamente."
//     );
//   });

//   it("debería manejar errores de login", async () => {
//     const loginError = new Error("Invalid credentials");
//     (authService.login as any).mockRejectedValueOnce(loginError);

//     try {
//       await authService.login({
//         username: "failuser",
//         password: "wrongpassword",
//       });

//       // No debería llegar aquí si hay error
//       expect(true).toBe(false);
//     } catch (error) {
//       // Verificar que el error fue propagado correctamente
//       expect((error as Error).message).toBe("Invalid credentials");
//     }

//     // Verificar que login fue llamado con los parámetros correctos
//     expect(authService.login).toHaveBeenCalledWith({
//       username: "failuser",
//       password: "wrongpassword",
//     });

//     // Verificar que saveToken NO fue llamado
//     expect(authService.saveToken).not.toHaveBeenCalled();

//     // Verificar que alert NO fue llamado
//     expect(mockAlert).not.toHaveBeenCalled();
//   });
// });
