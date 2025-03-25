import * as React from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './Styles.js';

import PropTypes from 'prop-types';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null, // Datos del usuario
        };
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.addFocusListener();
        this.configureHeader();
        console.log('HomeScreen mounted');
    }

    componentWillUnmount() {
        this.removeFocusListener();
    }

    // Agrega un listener para cargar los datos del usuario al enfocar la pantalla
    addFocusListener = () => {
        this.unsubscribeFocusListener = this.props.navigation.addListener('focus', this.loadUserData);
    };

    // Elimina el listener al desmontar el componente
    removeFocusListener = () => {
        if (this.unsubscribeFocusListener) {
            this.unsubscribeFocusListener();
        }
    };

    // Configura el encabezado con el botón de cierre de sesión
    configureHeader = () => {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={this.handleSignOut} style={Styles.headerButton}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Cerra Sesion</Text>
                </TouchableOpacity>
            ),
        });
    };

    // Cierra la sesión del usuario
    handleSignOut = async () => {
        try {
            console.log('Sesión cerrada');
            await AsyncStorage.clear();
            this.props.navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Carga los datos del usuario desde AsyncStorage
    loadUserData = async () => {
        try {
            const user = await AsyncStorage.getItem('userData');
            const parsedUser = JSON.parse(user);

            if (parsedUser?.id) {
                this.setState({ userData: parsedUser });
            }
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error);
        }
    };

    // Renderiza el indicador de carga si los datos del usuario no están disponibles
    renderLoadingIndicator = () => {
        return (
            <ActivityIndicator
                size="large"
                color="#000"
                style={Styles.activityIndicator}
            />
        );
    };

    // Renderiza los botones principales de la pantalla
    renderButtons = () => {
        return (
            <View style={Styles.card}>
                <View style={Styles.rowButtons}>
                    {this.renderButton('Scanear QR', 'QrLector', require('./assets/ScanearQR.png'))}
                    {this.renderButton('Ingresar QR', 'QrManual', require('./assets/IngresarQRManual.png'))}
                </View>

                {this.renderWideButton('Marcar salida', 'QrExit', require('./assets/marcarSalida.png'))}
                {this.renderWhiteButton('Registro de visitas', 'History', require('./assets/registroVisitas.png'))}
                {this.renderWhiteButton('Todos los residentes', 'AllResidents', require('./assets/todosResidentes.png'))}
            </View>
        );
    };

    // Renderiza un botón estándar
    renderButton = (label, screen, icon) => {
        return (
            <TouchableOpacity
                style={Styles.yellowButton}
                onPress={() => this.props.navigation.navigate(screen)}
            >
                <Image source={icon} style={Styles.icon} />
                <Text style={Styles.buttonTextDark}>{label}</Text>
            </TouchableOpacity>
        );
    };

    // Renderiza un botón ancho
    renderWideButton = (label, screen, icon) => {
        return (
            <TouchableOpacity
                style={Styles.wideButton}
                onPress={() => this.props.navigation.navigate(screen)}
            >
                <Text style={Styles.blackButtonText}>{label}</Text>
                <Image source={icon} style={Styles.icon} />
            </TouchableOpacity>
        );
    };

    // Renderiza un botón blanco
    renderWhiteButton = (label, screen, icon) => {
        return (
            <TouchableOpacity
                style={Styles.whiteButton}
                onPress={() => this.props.navigation.navigate(screen)}
            >
                <Text style={Styles.blackButtonText}>{label}</Text>
                <Image source={icon} style={Styles.icon} />
            </TouchableOpacity>
        );
    };

    render() {
        const { userData } = this.state;

        if (!userData) {
            return this.renderLoadingIndicator();
        }

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
                <ImageBackground
                    source={require('./assets/parteSuperior.png')}
                    style={Styles.topBackground}
                >
                    <View style={Styles.logoWrapper}>
                        <Image
                            source={require('./assets/icon.png')}
                            style={Styles.logoHome}
                            resizeMode="contain"
                        />
                    </View>
                </ImageBackground>

                {this.renderButtons()}
            </ScrollView>
        );
    }
}
