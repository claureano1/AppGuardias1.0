import { describe, it, expect, vi } from 'vitest';
import LoginScreen from './Login';

describe('LoginScreen', () => {
    let login;

    beforeEach(() => {
        // Crear una instancia de la clase LoginScreen
        login = new LoginScreen({});
    });

    // Prueba para la función areFieldsValid
    describe('areFieldsValid', () => {
        it('debería devolver true si ambos campos están llenos', () => {
            expect(login.areFieldsValid('user@example.com', 'password123')).toBe(true);
        });

        it('debería devolver false si alguno de los campos está vacío', () => {
            expect(login.areFieldsValid('', 'password123')).toBe(false);
            expect(login.areFieldsValid('user@example.com', '')).toBe(false);
            expect(login.areFieldsValid('', '')).toBe(false);
        });
    });

    // Prueba para la función validateUserEmail
    describe('validateUserEmail', () => {
        it('debería validar un usuario con formato correcto', () => {
            login.validateUserEmail('12345678');
            expect(login.state.isEmailValid).toBe(true);
        });

        it('debería invalidar un usuario con formato incorrecto', () => {
            login.validateUserEmail('abcd1234');
            expect(login.state.isEmailValid).toBe(false);
        });
    });

    // Prueba para la función createLoginRequestData
    describe('createLoginRequestData', () => {
        it('debería crear un objeto JSON con los datos de usuario y contraseña', () => {
            const requestData = login.createLoginRequestData('user@example.com', 'password123');
            expect(requestData).toBe(
                JSON.stringify({
                    email: 'user@example.com',
                    password: 'password123',
                })
            );
        });
    });

    // Prueba para la función handleLoginResponse
    describe('handleLoginResponse', () => {
        it('debería navegar a HomeScreen si el inicio de sesión es exitoso', () => {
            const navigateMock = vi.fn();
            login.props = { navigation: { navigate: navigateMock } };

            const mockResponse = { data: { Status: true, User: { id: 1 } } };
            login.handleLoginResponse(mockResponse);

            expect(navigateMock).toHaveBeenCalledWith('HomeScreen');
        });

        it('debería mostrar un error si el inicio de sesión falla', () => {
            const showAlertMock = vi.spyOn(login, 'showAlert');
            const mockResponse = { data: { Status: false } };

            login.handleLoginResponse(mockResponse);

            expect(showAlertMock).toHaveBeenCalledWith(
                'Error',
                'Usuario o contraseña inválida. Por favor, intente de nuevo.'
            );
        });
    });

    // Prueba para la función handleLoginError
    describe('handleLoginError', () => {
        it('debería mostrar un error si ocurre un problema durante el inicio de sesión', () => {
            const showAlertMock = vi.spyOn(login, 'showAlert');
            const mockError = { message: 'Network Error' };

            login.handleLoginError(mockError);

            expect(showAlertMock).toHaveBeenCalledWith(
                'Error',
                'Ocurrió un error durante el inicio de sesión. Por favor, intente de nuevo.'
            );
        });
    });

    // Prueba para la función saveUserData
    describe('saveUserData', () => {
        it('debería guardar los datos del usuario en AsyncStorage', async () => {
            const setItemMock = vi.spyOn(AsyncStorage, 'setItem').mockResolvedValueOnce();
            const user = { id: 1, name: 'John Doe' };

            await login.saveUserData(user);

            expect(setItemMock).toHaveBeenCalledWith('userData', JSON.stringify(user));
        });
    });
});