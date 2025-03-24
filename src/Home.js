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

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			UserData: null,
		};
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.getUserData();
		});

		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={this.signOut()} style={{ marginRight: 15 }}>
					<Text style={{ color: 'black', fontWeight: 'bold' }}>Logout</Text>
				</TouchableOpacity>
			),
		});
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	signOut = async () => {
		console.log('Sesion cerrada'); 
/* 		AsyncStorage.clear();
		
		this.props.navigation.navigate('LoginScreen'); */
	};

	getUserData = async () => {
		try {
			let user = await AsyncStorage.getItem('userData');
			let parsed = JSON.parse(user);
			if (parsed.id != null) {
				this.setState({ UserData: parsed });
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		if (this.state.UserData == null) {
			return (
				<ActivityIndicator
					size="large"
					color="#000"
					style={Styles.activityIndicator}
				/>
			);
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

				<View style={Styles.card}>
					<View style={Styles.rowButtons}>
						<TouchableOpacity
							style={Styles.yellowButton}
							onPress={() => this.props.navigation.navigate('QrLector')}
						>
							<Image
								source={require('./assets/ScanearQR.png')}
								style={Styles.icon}
							/>
							<Text style={Styles.buttonTextDark}>Scanear QR</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={Styles.yellowButton}
							onPress={() => this.props.navigation.navigate('QrManual')}
						>
							<Image
								source={require('./assets/IngresarQRManual.png')}
								style={Styles.icon}
							/>
							<Text style={Styles.buttonTextDark}>Ingresar QR</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style={Styles.wideButton}
						onPress={() => this.props.navigation.navigate('QrExit')}
					>
						<Text style={Styles.blackButtonText}>Marcar salida</Text>
						<Image
							source={require('./assets/marcarSalida.png')}
							style={Styles.icon}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={Styles.whiteButton}
						onPress={() => this.props.navigation.navigate('History')}
					>
						<Text style={Styles.blackButtonText}>Registro de visitas</Text>
						<Image
							source={require('./assets/registroVisitas.png')}
							style={Styles.icon}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={Styles.whiteButton}
						onPress={() => this.props.navigation.navigate('AllResidents')}
					>
						<Text style={Styles.blackButtonText}>Todos los residentes</Text>
						<Image
							source={require('./assets/todosResidentes.png')}
							style={Styles.icon}
						/>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}
