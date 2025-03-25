/* eslint-disable no-unused-vars */
import * as React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './Styles.js';
import axios from 'axios';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            userEmail: '',
            isEmailValid: true,
        };
    }

    componentDidMount() {
        this.addFocusListener();
    }

    componentWillUnmount() {
        this.removeFocusListener();
    }

    addFocusListener = () => {
        this.unsubscribeFocusListener = this.props.navigation.addListener('focus', this.loadUserData);
    };

    removeFocusListener = () => {
        if (this.unsubscribeFocusListener) {
            this.unsubscribeFocusListener();
        }
    };

    loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const parsedUserData = JSON.parse(userData);

            if (parsedUserData?.id) {
                this.navigateToHome();
            }
        } catch (error) {
            this.logError('Error al cargar los datos del usuario:', error);
        }
    };

    handleLogin = async () => {
        const { userEmail, password } = this.state;

        if (this.areFieldsValid(userEmail, password)) {
            try {
                const response = await this.sendLoginRequest(userEmail, password);
                this.handleLoginResponse(response);
            } catch (error) {
                this.handleLoginError(error);
            }
        } else {
            this.showAlert('Error', 'Los campos no pueden estar vacíos. Intente de nuevo.');
        }
    };

    areFieldsValid = (userEmail, password) => {
        return userEmail.trim() !== '' && password.trim() !== '';
    };

    sendLoginRequest = async (userEmail, password) => {
        const requestData = this.createLoginRequestData(userEmail, password);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://wafleqr.site/ws/loginSecurityUser.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: requestData,
        };

        return axios.request(config);
    };

    createLoginRequestData = (userEmail, password) => {
        return JSON.stringify({
            email: userEmail,
            password: password,
        });
    };

    handleLoginResponse = (response) => {
        if (response.data.Status) {
            this.saveUserData(response.data.User);
            this.navigateToHome();
        } else {
            this.showAlert('Error', 'Usuario o contraseña inválida. Por favor, intente de nuevo.');
        }
    };

    handleLoginError = (error) => {
        const errorMessage = error.response ? error.response.data : error.message;
        this.logError('Error durante el inicio de sesión:', errorMessage);
        this.showAlert('Error', 'Ocurrió un error durante el inicio de sesión. Por favor, intente de nuevo.');
    };

    saveUserData = async (user) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(user));
            Keyboard.dismiss();
        } catch (error) {
            this.logError('Error al guardar los datos del usuario:', error);
        }
    };

    navigateToHome = () => {
        this.props.navigation.navigate('HomeScreen');
    };

    showAlert = (title, message) => {
        Alert.alert(title, message, [{ text: 'Aceptar' }]);
    };

    validateUserEmail = (text) => {
        const emailRegex = /^\(?([\d]{4})\)?([\d]{4})$/;
        const isEmailValid = emailRegex.test(text);

        this.setState({ userEmail: text, isEmailValid });
    };

    logError = (message, error) => {
        console.error(message, error);
    };

    render() {
        const { isEmailValid, userEmail, password } = this.state;

        return (
            <ScrollView style={Styles.contentWrapper}>
                <View style={Styles.contentWrapperLogin}>
                    <View style={Styles.triangle} />
                    <Text style={Styles.title}>Login</Text>
                    <View style={Styles.underline} />
                    <Text style={Styles.labelTextLogin}>Nombre de usuario</Text>
                    <TextInput
                        style={isEmailValid ? Styles.input : Styles.mailInputRed}
                        placeholder="Ingrese su usuario"
                        onChangeText={this.validateUserEmail}
                        value={userEmail}
                    />
                    <Text style={Styles.labelTextLogin}>Contraseña</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder="Ingrese su contraseña"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={password}
                    />
                    <TouchableOpacity onPress={this.handleLogin} underlayColor="white" style={Styles.buttonContainer}>
                        <Text style={Styles.loginButton}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
