/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, Alert, ActivityIndicator, TextInput, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';

class History extends Component {
    constructor(props) {
        super(props);

        const defaultStartDate = new Date();
        defaultStartDate.setDate(defaultStartDate.getDate() - 7);

        this.state = {
            historial: [], // Lista completa del historial
            filteredHistorial: [], // Lista filtrada para mostrar
            isLoading: false,
            searchQuery: '', // Término de búsqueda
            entryDate: defaultStartDate,
            exitDate: new Date(),
            showDatePicker: false,
        };
    }

    componentDidMount() {
        this.loadUserData();
    }

    // Carga los datos del usuario desde AsyncStorage
    loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const parsedUserData = JSON.parse(userData);

            if (parsedUserData?.id && parsedUserData?.idResidential) {
                this.fetchHistory(parsedUserData.id, parsedUserData.idResidential);
            } else {
                console.log('idSecurity o idResidential no existen en userData');
            }
        } catch (error) {
            this.logError('Error al cargar los datos del usuario:', error);
        }
    };

    // Obtiene el historial desde el servidor
    fetchHistory = async (idSecurity, idResidential) => {
        this.setState({ isLoading: true });

        const { entryDate, exitDate } = this.state;

        const requestData = this.createHistoryRequestData(idSecurity, idResidential, entryDate, exitDate);

        const config = this.createAxiosConfig(requestData);

        try {
            const response = await axios.request(config);
            this.handleHistoryResponse(response);
        } catch (error) {
            this.handleHistoryError(error);
        }
    };

    // Crea los datos para la solicitud del historial
    createHistoryRequestData = (idSecurity, idResidential, startDate, endDate) => {
        return JSON.stringify({
            idSecurity,
            idResidential,
            startDate,
            endDate,
        });
    };

    // Crea la configuración para la solicitud Axios
    createAxiosConfig = (data) => {
        return {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://wafleqr.site/ws/residentialsAccessHistory.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };
    };

    // Maneja la respuesta del servidor al obtener el historial
    handleHistoryResponse = (response) => {
        if (response.data.Status) {
            const historial = response.data.AccessHistory || [];
            this.setState({
                historial,
                filteredHistorial: historial,
                isLoading: false,
            });
        } else {
            this.showAlert('Error', 'No se pudo obtener el historial de visitas');
            this.setState({ isLoading: false });
        }
    };

    // Maneja errores al obtener el historial
    handleHistoryError = (error) => {
        this.logError('Error al obtener el historial:', error);
        this.showAlert('Error', 'Ocurrió un problema al obtener el historial de visitas');
        this.setState({ isLoading: false });
    };

    // Filtra el historial en función del término de búsqueda
    handleSearch = (text) => {
        const { historial } = this.state;

        const filteredHistorial = historial.filter((item) => {
            const guestName = item.guestName.toLowerCase();
            return guestName.includes(text.toLowerCase());
        });

        this.setState({ searchQuery: text, filteredHistorial });
    };

    // Maneja la selección de una fecha en el DatePicker
    handleDateSelection = (date) => {
        console.log('Fecha seleccionada:', date);
        this.setState({ entryDate: date, showDatePicker: false });
    };

    // Maneja la cancelación del DatePicker
    handleDatePickerCancel = () => {
        console.log('Selección de fecha cancelada');
        this.setState({ showDatePicker: false });
    };

    // Muestra una alerta con un mensaje
    showAlert = (title, message) => {
        Alert.alert(title, message, [{ text: 'Aceptar' }]);
    };

    // Registra errores en la consola
    logError = (message, error) => {
        console.error(message, error);
    };

    render() {
        const { filteredHistorial, isLoading, searchQuery, showDatePicker, entryDate } = this.state;

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
                    onChangeText={this.handleSearch}
                />

                {/* Selector de fecha */}
                <DatePicker
                    modal
                    open={showDatePicker}
                    date={entryDate}
                    mode="date"
                    onConfirm={this.handleDateSelection}
                    onCancel={this.handleDatePickerCancel}
                />

                {/* Lista del historial */}
                <FlatList
                    data={filteredHistorial}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>Nombre: {item.guestName}</Text>
                            <Text>Fecha de entrada: {item.entryDate}</Text>
                            <Text>Fecha de salida: {item.exitDate}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
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