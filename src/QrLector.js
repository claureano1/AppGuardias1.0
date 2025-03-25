import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Styles } from './Styles.js'
const axios = require('axios').default;

class QrLector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: false,
            device: null,
            showCamera: true,

            qrValido: false,
            nombre_acceso: null,
        };
        this.cameraRef = React.createRef();
    }

    componentDidMount() {
        this.loadCamera();
    }

    loadCamera = async () => {
                // Solicitar permiso para la cámara
                const status = await Camera.requestCameraPermission();

                console.log("status: ", status);
        
                this.setState({ hasPermission: status === 'authorized' || status === 'granted' });
        
                // Obtener dispositivos de cámara
                const devices = await Camera.getAvailableCameraDevices();
                console.log("devices: ", devices);
                const backCamera = devices.find((device) => device.position === 'back');

                console.log("backCamera: ", backCamera);
                this.setState({ device: backCamera });
    }

    handleCodeScanned = async (codes) => {
        if (codes.length > 0) {
            const codigo = codes[0];

            if (codigo.type == "qr" && codigo.value.length > 0) {
                this.setState({ showCamera: false});
                this.ValidateQR(codigo.value);
            }
         
        }
    };

    ValidateQR = async (Codigo) => {
     
        this.setState({ qrValido: true });
        const QRarray = JSON.parse(Codigo);
        console.log("Validando QR...", QRarray);

        const data = JSON.stringify({
            qrCode: QRarray.number, // Envía el código QR en el cuerpo de la solicitud
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://wafleqr.site/ws/validateQR.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        console.log("Enviando solicitud de validación de QR...");

        axios.request(config)
            .then((response) => {
                console.log("Respuesta del servidor: ", JSON.stringify(response.data));
                if (response.data.Status) {


                    // Si el QR es válido, actualiza el estado con los datos recibidos
                    this.setState({ guestName: response.data.AccessDetails.guestName, expirationDate: response.data.AccessDetails.expirationDate, qrValido: false, showInput: false });
                } else {
                    // Si el QR no es válido, muestra una alerta
                    Alert.alert('Error', response.data.Message || 'Acceso no permitido', [{
                        text: 'Aceptar',
                    }]);
                    this.setState({ qrValido: false }); // Oculta el indicador de carga
                }
            })
            .catch((error) => {
                console.error("Error al validar el QR: ", error);
                Alert.alert('Error', 'Ocurrió un problema al validar el código QR', [{
                    text: 'Aceptar',
                }]);
                this.setState({ qrValido: false }); // Oculta el indicador de carga
            });
    }

    render() {
        const { hasPermission, device, showCamera, qrValido, guestName, expirationDate } = this.state;

        if (!hasPermission) {
            return <Text>Solicitando permiso de cámara...</Text>;
        }

        if (!device) {
            return <Text>Cargando cámara...</Text>;
        }

        const codeScanner = {
            codeTypes: ['qr', 'ean-13'], // Tipos de códigos que deseas escanear
            onCodeScanned: this.handleCodeScanned,
        };

        return (
            <View style={[Styles.contentWrapper]}>
                <View style={Styles.container}>
                    {
                        showCamera ?
                            <Camera
                                style={Styles.absoluteFill}
                                device={device}
                                isActive={true}
                                ref={this.cameraRef}
                                codeScanner={codeScanner} // API imperativa para el escaneo
                            />
                            :
                            <View>
                                {qrValido ? (
                                    <View>
                                        <ActivityIndicator size="large" color="#00ff00" />
                                    </View>
                                ) : (
                                    <View>
                                        <Text style={Styles.labelAcceso}>Acceso Valido</Text>
                                        <Text style={Styles.labelUsuario}>Invitado: </Text>
                                        <Text style={Styles.labelNombreUsuario}>{guestName}</Text>

                                        <Text style={Styles.labelUsuario}>Fecha de Expiración: </Text>
                                        <Text style={Styles.labelNombreUsuario}>{expirationDate}</Text>
                                    </View>
                                )}
                            </View>
                    }

                </View>
            </View>
        );
    }
}

export default QrLector;
