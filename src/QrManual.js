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
            nombreAcceso: null,
            codigoQR: null,
        };
    }

    validateQR = (codigo) => {
        const { navigation } = this.props;
        this.setState({ qrValido: true });

        const data = new FormData();
        data.append('qrCode', codigo);
        console.log('FormData: ', data);

        axios.post('https://wafleqr.site/ws/validateQR.php', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log('response: ', response.data);

                if (response.data.Status) {
                    this.setState({ nombreAcceso: response.data.nombre_acceso, qrValido: false });
                } else {
                    Alert.alert('Error', 'Acceso no permitido', [{ text: 'Aceptar' }]);
                }
            })
            .catch((error) => {
                console.error('Error al enviar los datos:', error.response ? error.response.data : error.message);
            });
    };

    render() {
        const { showInput, qrValido, nombreAcceso, codigoQR } = this.state;

        return (
            <View style={Styles.contentWrapper}>
                <View style={Styles.container}>
                    {showInput ? (
                        <View style={Styles.containerQR}>
                            <Text style={Styles.labelTextLogin}>Código de visita</Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="Ingrese el código"
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
                                    <Text style={Styles.labelUsuario}>usuario: </Text>
                                    <Text style={Styles.labelNombreUsuario}>{nombreAcceso}</Text>
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
