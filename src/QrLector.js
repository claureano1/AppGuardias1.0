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
        const { navigation } = this.props;
        this.setState({ QRValido: true });

        console.log("Validando QR...", Codigo);

        const axios = require('axios');
        let data = JSON.stringify({
            "qrCode": Codigo.number,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://wafleqr.site/ws/validateQR.php',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.Status) {
                    this.setState({ nombre_acceso: response.data.nombre_acceso, QRValido: true });
                } else {
                    Alert.alert('Error', 'Acceso no permitido', [{
                        text: 'Aceptar'
                    }]);
                }
            })
            .catch((error) => {
                console.log(error);
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
                                {
                                    QRValido ?
                                        <View>
                                            <ActivityIndicator size="large" color="#00ff00" />
                                        </View>
                                        :
                                        <View>
                                            <Text style={Styles.LabelAcceso}>Acceso Valido</Text>
                                            <Text style={Styles.LabelUsuario}>usuario: </Text>
                                            <Text style={Styles.LabelNombreUsuario}>{nombre_acceso}</Text>
                                        </View>
                                }
                            </View>
                    }

                </View>
            </View>
        );
    }
}

export default QrLector;
