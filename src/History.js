/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, Alert, ActivityIndicator, TextInput, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'

const axios = require('axios').default;

class History extends Component {
    
    constructor(props) {
        super(props);
    const FechaDesde = new Date();
    FechaDesde.setDate(FechaDesde.getDate() - 7);

        this.state = {
            historial: [], // Lista completa del historial
            filteredHistorial: [], // Lista filtrada para mostrar
            isLoading: false,
            searchQuery: '', // Término de búsqueda
            guestName: null,
            entryDate: FechaDesde,
            exitDate: new Date(),
        };
        this.arrayholder = [];
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

        const FechaDesde = this.state.entryDate;
        const FechaHasta = this.state.exitDate;

        const data = JSON.stringify({
            idSecurity: idSecurity,
            idResidential: idResidential,
            startDate: FechaDesde,
            endDate: FechaHasta,
            showDatePicker: false,
        });
        
        console.log(data);

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
                    const historial = response.data.AccessHistory; // Ajusta según la estructura real
                    this.setState({
                        historial: historial,
                        filteredHistorial: historial, // Inicializa la lista filtrada
                        isLoading: false,
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

    handleSearch = (text) => {
        const { historial } = this.state;

        // Filtrar el historial en función del término de búsqueda
        const filteredHistorial = historial.filter((item) => {
            const guestName = item.guestName.toLowerCase(); // Nombre del visitante
            return guestName.includes(text.toLowerCase()); // Verifica si coincide con el término de búsqueda
        });

        // Actualizar el estado con los resultados filtrados
        this.setState({ searchQuery: text, filteredHistorial });
    };

    render() {
        const { filteredHistorial, isLoading, searchQuery } = this.state;

        if (isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        return (
            <View style={styles.container}>
                {/* Campo de búsqueda */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar en historial..."
                    value={searchQuery}
                    onChangeText={this.handleSearch} // Llama a la función handleSearch
                />

                {/* <Button title="Open" onPress={() => this.setState({showDatePicker : true})} /> */}
                <DatePicker
                    modal
                    open={this.state.showDatePicker}
                    date={this.state.entryDate}
                    mode="date"
                    onConfirm={(date) => {
                      console.log('Fecha de entrada: ', date);
                      this.setState({entryDate : date, showDatePicker : false})

                    }}
                    onCancel={() => {
                        console.log('Cancelado');
                        this.setState({showDatePicker : false})
                    }}
                />

                {/* Lista del historial */}
                <FlatList
                    data={filteredHistorial} // Usa la lista filtrada
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>Nombre: {item.guestName}</Text>
                            <Text>Fecha de entrada: {item.entryDate}</Text>
                            <Text>Fecha de salida: {item.exitDate}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()} // Usa el índice como clave
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    item: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default History;