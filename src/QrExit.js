import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Styles } from './Styles.js'
const axios = require('axios').default;

class QrExit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: false,
            device: null,
            showCamera: true,
            idVisita: null,
            QRValido: false,
            nombre_acceso: null,
        };
        this.cameraRef = React.createRef();
    }

    async componentDidMount() {
        // Solicitar permiso para la cámara
        const status = await Camera.requestCameraPermission();

        console.log("status: ", status);

        this.setState({ hasPermission: status === 'authorized' || status === 'granted' });

        // Obtener dispositivos de cámara
        const devices = await Camera.getAvailableCameraDevices();
        const backCamera = devices.find((device) => device.position === 'back');
        this.setState({ device: backCamera });
    }

    handleCodeScanned = (codes) => {
        if (codes.length > 0) {
            const codigo = codes[0];
            /*
          const scannedCodes = codes.map((code) => code.displayValue).join(', ');
    
          
          console.log("scannedCodes: ", scannedCodes);*/

            if (codigo.type == "qr" && codigo.value.length > 0) {
                this.setState({ showCamera: false, idVisita: codigo.value });

                this.ValidateQR(codigo.value);


                // Alert.alert('Código detectado', codigo.value);
            }
            // 
        }
    };


    ValidateQR = async (Codigo) => {
        this.setState({ showCamera: false});
        const QRarray = JSON.parse(Codigo);
        console.log("Validando QR...", QRarray);

        const data = JSON.stringify({
            qrCode: QRarray.number, // Envía el código QR en el cuerpo de la solicitud
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://wafleqr.site/ws/checkOutAccess.php',
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
                    Alert.alert('Salida exitosa', 'Acceso registrado correctamente', [{
                        text: 'Aceptar',
                        onPress: () => this.props.navigation.goBack(), // Navega a la pantalla anterior
                    }]);
                } else {
                    Alert.alert('Error', 'Acceso no permitido', [{
                        text: 'Aceptar',
                    }]);
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
        const { hasPermission, device, showCamera, idVisita, QRValido, nombre_acceso } = this.state;

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
                                <ActivityIndicator size="large" color="#00ff00" />
                            </View>
                    }


                </View>
            </View>
        );
    }
}

export default QrExit;
