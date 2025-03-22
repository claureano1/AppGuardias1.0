import * as React from 'react';
import { Image, View, Text, TouchableOpacity, FlatList, ImageBackground, Linking, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios').default;

import { Styles } from './Styles.js'





export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			UserData: null,
			Orders: null,
			VelozCerrado: 0,
			ShowNewActivity: false,

		};
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.getUserData();
		});

		// Configura el botón de logout en el header
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={this.signOut} style={{ marginRight: 15 }}>
					<Text style={{ color: 'black', fontWeight: 'bold' }}>Logout</Text>
				</TouchableOpacity>
			),
		});
	}


	signOut = async () => {
		AsyncStorage.clear();
		this.props.navigation.navigate('LoginScreen');
	}


	async removeItemValue(key) {
		try {
			await AsyncStorage.removeItem(key);
			return true;
		}
		catch (exception) {
			return false;
		}
	}



	componentWillUnmount() {
		this._unsubscribe();
	}




	getUserData = async () => {
		try {
			let user = await AsyncStorage.getItem('userData');
			let parsed = JSON.parse(user);

			console.log('usuario:::::::: ', parsed)

			if (parsed.id != null) {
				this.setState({
					UserData: parsed
				});
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	render() {
		if (this.state.UserData == null) {
			return (
				<ActivityIndicator size="large" color="#000" style={Styles.ActivityIndicator} />
			);
		}

		return (
			<View style={[Styles.contentWrapper]}>

				<View style logowrapper><Image
					source={require('./assets/icon.png')}
					style={Styles.logoHome}>
				</Image></View>
				<View style={Styles.card}>
					<TouchableOpacity
						style={Styles.menuButton}
						onPress={() => this.props.navigation.navigate('QrLector')}
					>
						<Text style={Styles.buttonText}>Scanear QR</Text>
					</TouchableOpacity>

					{/* Botón: Ingresar QR Manual */}
					<TouchableOpacity
						style={Styles.menuButton}
						onPress={() => this.props.navigation.navigate('QrManual')}
					>
						<Text style={Styles.buttonText}>Ingresar QR Manual</Text>
					</TouchableOpacity>



					{/* Botón: Marcar Salida */}
					<TouchableOpacity
						style={Styles.menuButton}
						onPress={() => this.props.navigation.navigate('QrExit')}
					>
						<Text style={Styles.buttonText}>Marcar Salida</Text>
					</TouchableOpacity>





					{/* Botón: Registro de Visitas */}
					<TouchableOpacity
						style={Styles.menuButton}
						onPress={() => this.props.navigation.navigate('History')}
					>
						<Text style={Styles.buttonText}>Registro de Visitas</Text>
					</TouchableOpacity>

					{/* Botón: Todos los Usuarios */}
					<TouchableOpacity
						style={Styles.menuButton}
						onPress={() => this.props.navigation.navigate('AllUsers')}
					>
						<Text style={Styles.buttonText}>Todos los Usuarios</Text>
					</TouchableOpacity>
				</View>

			</View>
		);
	}
}
