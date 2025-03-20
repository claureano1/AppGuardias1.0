/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, Alert, ActivityIndicator, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Styles } from './Styles.js';
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

            if (parsed?.idSecurity && parsed?.idResidential) {
                this.getHistory(parsed.idSecurity, parsed.idResidential);
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


        axios.post('https://wafleqr.site/ws/getHistory.php', {
            idSecurity: idSecurity,
            idResidential: idResidential,
            FechaDesde: FechaDesde,
            FechaHasta: FechaHasta,
        })
            .then((response) => {
                console.log('response: ', response.data);

                this.setState({ historial: response.data, isLoading: false });
            })
            .catch((error) => {
                console.log('error: ', error);
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
