import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AllResidents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], // Lista completa de usuarios
            filteredUsers: [], // Lista filtrada para mostrar
            isLoading: true,
            searchQuery: '', // Término de búsqueda
            residentList: null, // Lista de residentes
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        this.getUserData();

    }

    getUserData = async () => {
        try {
            let user = await AsyncStorage.getItem('userData');
            let parsed = JSON.parse(user);



            if (parsed.id != null) {
                console.log('usuario', parsed)
                this.setState({
                    UserData: parsed
                }, () => {
                    this.getResidents();
                });

            }
        }
        catch (error) {
            console.log(error);
        }
    }

    getResidents = async () => {
        const UserData = this.state.UserData;
        console.log('userData: ', UserData);
        const data = JSON.stringify({
            number: UserData.id, // ID del usuario de seguridad
            idResidential: UserData.idResidential // ID de la residencia
        });

        const config = {
            method: 'post',
            url: 'https://wafleqr.site/ws/getResidentsList.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                this.setState({
                    users: response.data,
                    residentList: response.data.Residents,// Inicialmente, la lista filtrada es igual a la lista completa
                    isLoading: false,
                });
                this.arrayholder = response.data.Residents;
            })
            .catch((error) => {
                console.error(error);
                this.setState({ isLoading: false });
            });
    }
    handleSearch = (text) => {
        const { residentList } = this.state;
        if (text === '') {
            this.setState({ searchQuery: text, residentList: this.arrayholder });
            return;

        } else { // Filtrar la lista de residentes en función del término de búsqueda
            const filteredResidents = residentList.filter((resident) => {
                const Name = `${resident.name}`.toLowerCase();
                const DNI = `${resident.DNI}`.toLowerCase();  // Combina el nombre completo
                return Name.includes(text.toLowerCase()) || DNI.includes(text.toLowerCase());
               
            });

            // Actualizar el estado con los resultados filtrados
            this.setState({ searchQuery: text, residentList: filteredResidents });
        }


    };

    render() {
        const { filteredUsers, isLoading, searchQuery } = this.state;

        if (isLoading || this.state.UserData == null) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        return (
            <View style={styles.container}>
                {/* Campo de búsqueda */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar residente por nombre o DNI..."
                    value={searchQuery}
                    onChangeText={this.handleSearch}
                />

                {/* Lista de residentes */}
                <FlatList
                    data={this.state.residentList}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>Nombre: {item.name} </Text>
                            <Text>Email: {item.email}</Text>
                            <Text>DNI: {item.DNI}</Text>
                            <Text>Teléfono: {item.userEmail}</Text>
                            <Text>Casa: {item.idHouse}</Text>
                            <Text>Propietario: {item.isOwner ? 'Sí' : 'No'}</Text>
                        </View>
                    )}
                // keyExtractor={(item) => item.number.toString()}
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

export default AllResidents;