import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
    // --- NUEVOS ESTILOS PARA HOME PERSONALIZADO WAFLQR ---
    // --- NUEVOS ESTILOS PARA HOME VISUAL FINAL ---

    // Estilos personalizados para el Home de Wafle QR
    topBackground: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 80,
    },
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    logoHome: {
        width: 180,
        height: 180,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    rowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    yellowButton: {
        backgroundColor: '#FFD600',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '47%',
        flexDirection: 'column',
    },
    wideButton: {
        backgroundColor: '#FFD600',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    whiteButton: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    buttonTextDark: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
    },
    blackButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    icon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },

    /////////////////////////////
    // General
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
        height: height,
    },
    buttonContainer: {
        width: '60%',
        marginHorizontal: '10%',
        marginVertical: 20,
        height: 50,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#fdcc2d',
    },
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
    absoluteFill: {
        width: '100%',
        height: '100%',
    },

    // Login
    contentWrapperLogin: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '84%',
        marginHorizontal: '8%',
        marginTop: 0,
        borderRadius: 20,
        paddingVertical: 50,
        height: 480,
    },
    viewLogin: {
        backgroundColor: '#FFF',
        width: '100%',
        position: 'absolute',
        top: 160,
        zIndex: 999,
        paddingHorizontal: 40,
        paddingTop: 20,
        borderRadius: 20,
    },
    labelTextLogin: {
        width: '85%',
        textAlign: 'left',
        color: '#333',
        marginTop: 15,
    },
    imageLogin: {
        width: '80%',
        height: 100,
        marginTop: 0,
        marginBottom: 50,
    },
    loginButton: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        width: '100%',
        fontSize: 18,
    },

    // Input Fields
    mailInput: {
        backgroundColor: '#efefef',
        height: 45,
        width: '100%',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    mailInputRed: {
        backgroundColor: '#efefef',
        height: 45,
        width: '100%',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        borderColor: '#f53c2f',
        borderWidth: 2,
    },
    pickerInput: {
        backgroundColor: '#efefef',
        height: 45,
        width: '100%',
        borderRadius: 5,
        marginVertical: 5,
    },
    textInput: {
        height: 40,
        borderRadius: 10,
        width: '94%',
        marginVertical: 10,
        marginHorizontal: '3%',
        padding: 10,
        backgroundColor: '#FFF',
    },
    textInputMulti: {
        height: 100,
        borderRadius: 10,
        width: '92%',
        marginHorizontal: '4%',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#FFF',
    },

    triangle: {
        width: 0,
        height: 0,
        borderTopWidth: 90,
        borderTopColor: 'transparent',
        borderBottomWidth: 270,
        borderBottomColor: 'transparent',
        borderLeftWidth: 220,
        borderLeftColor: '#FFCD28',
        marginBottom: 1,
        alignSelf: 'flex-start',
        marginTop: -100,
        marginLeft: -100,
        transform: [{ rotate: '18deg' }],
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#001997',
        marginBottom: 10,
        marginTop: -150,
    },
    underline: {
        width: '55%',
        borderBottomWidth: 2,
        borderBottomColor: '#FFCD28',
        marginBottom: 30,
    },
    input: {
        height: 40,
        width: '75%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 20,
        paddingLeft: 20,
        backgroundColor: '#EFEFEF',
    },
    labelAcceso: {
        width: '100%',
        textAlign: 'center',
        fontSize: 36,
        color: '#003366',
        fontWeight: 'bold',
    },
    labelUsuario: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
    },
    labelNombreUsuario: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    containerQR: {
        padding: '10%',
        alignContent: 'center',
        alignItems: 'center',
    },
});

export { Styles };


