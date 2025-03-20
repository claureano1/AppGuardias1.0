/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, Alert, ActivityIndicator, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Styles } from './Styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios').default;

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historial: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.getUserData();

    }

    getUserData = async () => {

        try {
            const user = await AsyncStorage.getItem('userData');
            const parsed = JSON.parse(user);

            console.log('usuario:::::::: ', parsed);

            if (parsed?.id && parsed?.idResidential) {
                this.getHistory(parsed.id, parsed.idResidential);
            } else {
                console.log('idSecurity o idResidential no existen en userData');
            }
        } catch (error) {
            console.log(error);
        }
    };


    getHistory = async (idSecurity, idResidential) => {
        this.setState({ isLoading: true });
        var userData = this.state.UserData;

        var FechaDesde = new Date();
        FechaDesde.setDate(FechaDesde.getDate() - 7);

        var FechaHasta = new Date();
        const data = JSON.stringify({
            idSecurity: idSecurity,
            idResidential:idResidential,
            startDate: FechaDesde,
            endDate: FechaHasta,
        });
        console.log("Enviando solicitud de validación de QR...", data);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://wafleqr.site/ws/residentialsAccessHistory.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        console.log("Enviando solicitud de validación de QR...", data);

        axios.request(config)
            .then((response) => {
                console.log("Respuesta del servidor: ", JSON.stringify(response.data));
                if (response.data.Status) {
                    
                } else {
                   

                }
            })
            .catch((error) => {
                console.error("Error al validar el QR: ", error);
                Alert.alert('Error', 'Ocurrió un problema al validar el código QR', [{
                    text: 'Aceptar',
                }]);
                this.setState({ QRValido: false }); // Oculta el indicador de carga
            });

    };






    render() {

        return (
            <View style={Styles.contentWrapper}>

                {this.state.isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View style={Styles.container}>
                        <Text>Historial de accesos</Text>
                        <FlatList>
                            data={this.state.historial}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.nombre}</Text>
                                    <Text>{item.fecha}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        </FlatList>
                    </View>
                )}

            </View>
        );
    }
}

export default History;
