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
            phoneNumber: '',
            isPhoneValid: true,
        };
    }

    componentDidMount() {
        this.unsubscribeFocusListener = this.props.navigation.addListener('focus', this.loadUserData);
    }

    componentWillUnmount() {
        this.unsubscribeFocusListener();
    }

    loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const parsedUserData = JSON.parse(userData);

            if (parsedUserData?.id) {
                this.props.navigation.navigate('HomeScreen');
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    handleLogin = async () => {
        const { phoneNumber, password } = this.state;

        if (this.areFieldsValid(phoneNumber, password)) {
            try {
                const response = await this.sendLoginRequest(phoneNumber, password);
                this.handleLoginResponse(response);
            } catch (error) {
                this.handleLoginError(error);
            }
        } else {
            this.showAlert('Error', 'Fields cannot be empty. Please try again.');
        }
    };

    areFieldsValid = (phoneNumber, password) => {
        return phoneNumber.trim() !== '' && password.trim() !== '';
    };

    sendLoginRequest = async (phoneNumber, password) => {
        const requestData = JSON.stringify({
            email: phoneNumber,
            password: password,
        });

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

    handleLoginResponse = (response) => {
        if (response.data.Status) {
            Keyboard.dismiss();
            AsyncStorage.setItem('userData', JSON.stringify(response.data.User));
            this.props.navigation.navigate('HomeScreen');
        } else {
            this.showAlert('Error', 'Invalid username or password. Please try again.');
        }
    };

    handleLoginError = (error) => {
        const errorMessage = error.response ? error.response.data : error.message;
        console.error('Error during login:', errorMessage);
        this.showAlert('Error', 'An error occurred during login. Please try again.');
    };

    showAlert = (title, message) => {
        Alert.alert(title, message, [{ text: 'Accept' }]);
    };

    validatePhoneNumber = (text) => {
        const phoneRegex = /^\(?([\d]{4})\)?([\d]{4})$/;
        const isPhoneValid = phoneRegex.test(text);

        this.setState({ phoneNumber: text, isPhoneValid });
    };

    render() {
        const { isPhoneValid, phoneNumber, password } = this.state;

        return (
            <ScrollView style={Styles.contentWrapper}>
                <View style={Styles.contentWrapperLogin}>
                    <View style={Styles.triangle} />
                    <Text style={Styles.title}>Login</Text>
                    <View style={Styles.underline} />
                    <Text style={Styles.labelTextLogin}>Nombre de usuario</Text>
                    <TextInput
                        style={isPhoneValid ? Styles.input : Styles.mailInputRed}
                        placeholder="Ingrese su usuario"
                        onChangeText={this.validatePhoneNumber}
                        value={phoneNumber}
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
                        <Text style={Styles.loginButton}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
