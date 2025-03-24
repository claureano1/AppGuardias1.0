/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, Alert, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { Styles } from './Styles.js';
const axios = require('axios').default;

class QrManual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: true,
            idVisita: null,
            qrValido: false,
            guestName: null,
            codigoQR: null,
            expirationDate: null,
        };
    }

    validateQR = async (Codigo) => {
        this.setState({ QRValido: true }); // Muestra el indicador de carga

        const data = JSON.stringify({
            qrCode: Codigo, // Envía el código QR en el cuerpo de la solicitud
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://wafleqr.site/ws/validateQR.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        console.log("Enviando solicitud de validación de QR...");

        axios.request(config)
            .then((response) => {
                console.log("Respuesta del servidor: ", JSON.stringify(response.data));
                if (response.data.Status) {
                    // Si el QR es válido, actualiza el estado con los datos recibidos
                    this.setState({ guestName: response.data.AccessDetails.guestName, expirationDate: response.data.AccessDetails.expirationDate, QRValido: false, showInput: false });
                } else {
                    // Si el QR no es válido, muestra una alerta
                    Alert.alert('Error', response.data.Message || 'Acceso no permitido', [{
                        text: 'Aceptar',
                    }]);
                    this.setState({ QRValido: false }); // Oculta el indicador de carga
                }
            })
            .catch((error) => {
                console.error("Error al validar el QR: ", error);
                Alert.alert('Error', 'Ocurrió un problema al validar el código QR', [{
                    text: 'Aceptar',
                }]);
                this.setState({ QRValido: false }); // Oculta el indicador de carga
            });
    }

    render() {
        const { showInput, qrValido, guestName, codigoQR, expirationDate } = this.state;

        return (
            <View style={Styles.contentWrapper}>
                <View style={Styles.container}>
                    {showInput ? (
                        <View style={Styles.containerQR}>
                            <Text style={Styles.labelTextLogin}>Código de visita</Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="Ingrese el código"
                                placeholderTextColor="#000"
                                onChangeText={text => this.setState({ codigoQR: text })}
                                value={codigoQR}
                            />
                            <TouchableOpacity onPress={() => this.validateQR(codigoQR)} style={Styles.buttonContainer}>
                                <Text style={Styles.loginButton}>Validar Acceso</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            {qrValido ? (
                                <View>
                                    <ActivityIndicator size="large" color="#00ff00" />
                                </View>
                            ) : (
                                <View>
                                    <Text style={Styles.labelAcceso}>Acceso Valido</Text>
                                    <Text style={Styles.labelUsuario}>Invitado: </Text>
                                    <Text style={Styles.labelNombreUsuario}>{guestName}</Text>

                                    <Text style={Styles.labelUsuario}>Fecha de Expiración: </Text>
                                    <Text style={Styles.labelNombreUsuario}>{expirationDate}</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

export default QrManual;
