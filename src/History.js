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

        var FechaDesde = new Date();
        FechaDesde.setDate(FechaDesde.getDate() - 7);

        var FechaHasta = new Date();
        const data = JSON.stringify({ //const data es un objeto que se envía al servidor
            idSecurity: idSecurity,
            idResidential: idResidential,
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

        axios.request(config)
            .then((response) => {
                console.log("Respuesta completa del servidor: ", response.data);

                if (response.data.Status) {
                    // Ajusta esto según la estructura real de la respuesta
                    const historial = response.data.AccessHistory; // Cambia 'history' según la estructura real
                    console.log("Historial recibido: ", historial);

                    this.setState({ historial: historial, isLoading: false }, () => {
                        console.log("Estado actualizado con historial: ", this.state.historial);
                    });
                } else {
                    Alert.alert('Error', 'No se pudo obtener el historial de visitas');
                    this.setState({ isLoading: false });
                }
            })
            .catch((error) => {
                console.error("Error al obtener el historial: ", error);
                Alert.alert('Error', 'Ocurrió un problema al obtener el historial de visitas', [{
                    text: 'Aceptar',
                }]);
                this.setState({ isLoading: false });
            });
    };

    render() {
        return (
            <View style={Styles.contentWrapper}>
               

                {this.state.isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View style={Styles.container}>
                        
                        <FlatList
                            data={this.state.historial}
                            renderItem={({ item }) => (
                                <View style={Styles.item}>
                                    <View style={Styles.textwrapper}><Text style={Styles.textlabel}>Nombre:</Text><Text>{item.guestName}</Text></View>
                                    <View style={Styles.textwrapper}><Text style={Styles.textlabel}>Fecha de entrada:</Text><Text>{item.entryDate}</Text></View>
                                    <View style={Styles.textwrapper}><Text style={Styles.textlabel}>Fecha de salida:</Text><Text>{item.exitDate}</Text></View>
                                        

                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
            </View>
        );
    }
}

export default History;


//hacer un boton que se llame marcar salida a base de la clase QR lector. 
// y solo cambiar el endpoint para cuando el user salga de la residencia se tiene que actulizar 
// lafecha de salida y marcar el QR inactivo en caso de alcanzar el limite de tiempo usado

// crear otro boton de marcar salida y ese boton escanerar el boto qr y hara la llamda al enpoit de salida
// en el registro de visita, marcar que visitas estan activas y que visitas ya salieron de la residencia

//hacer opcion de todos los usuarios de la residencia.