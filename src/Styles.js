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
//   // General
  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    height: height,
},
// contentWrapperWhite: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: '#FFF',
// },
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
// logoHome:{
//     width: width - 50,
//     height: 300,
//     marginHorizontal: 25,
//     marginVertical: 20,
//     resizeMode: 'contain',
// },
// buttonDelete: {
//     backgroundColor: '#FF0000',
//     marginVertical: 10,
//     padding: 15,
//     width: '100%',
//     alignItems: 'center',
// },
// activityIndicator: {
//     alignSelf: 'center',
//     marginTop: '40%',
// },
// activityLoading: {
//     alignSelf: 'center',
//     marginTop: '40%',
//     position: 'absolute',
//     backgroundColor: '#000',
//     padding: 10,
//     borderRadius: 10,
//     zIndex: 999999,
// },
absoluteFill:{
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

// // Negocio
// negocioCover: {
//     width: width,
//     height: 140,
// },
// coverWrapper: {
//     height: 140,
//     width: width,
//     overflow: 'hidden',
// },
// logoWrapper: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     alignSelf: 'center',
//     overflow: 'hidden',
//     position: 'absolute',
//     top: 70,
//     zIndex: 9999,
// },
// negocioLogo: {
//     width: 150,
//     height: 150,
// },
// scrollEditInfo: {
//     paddingTop: 50,
//     paddingBottom: 20,
//     backgroundColor: '#FFF',
// },
// negocioInfo: {
//     backgroundColor: '#FFF',
//     paddingHorizontal: '3%',
//     paddingVertical: 10,
//     width: width,
//     height: '100%',
// },

// // Horario Negocios
// hourInput: {
//     backgroundColor: '#efefef',
//     height: 45,
//     width: '20%',
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 5,
//     marginHorizontal: '1%',
// },
// hourInputDisable: {
//     backgroundColor: '#efefef',
//     height: 45,
//     width: '20%',
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 5,
//     marginHorizontal: '1%',
//     opacity: 0.2,
// },
// horaTitle: {
//     height: 35,
//     width: '20%',
//     textAlign: 'center',
//     backgroundColor: '#efefef',
//     padding: 10,
//     marginBottom: 10,
// },
// dayTitle: {
//     height: 45,
//     width: '20%',
//     paddingHorizontal: '2%',
//     paddingVertical: 10,
// },
// hourCheck: {
//     height: 45,
//     width: '20%',
//     paddingHorizontal: '7%',
//     paddingVertical: 10,
// },

// // Product Detail
// changeImageButton: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     padding: 15,
//     backgroundColor: '#000',
//     borderTopRightRadius: 15,
//     zIndex: 999,
//     top: 240,
// },
// addItemButtonWrapper: {
//     paddingHorizontal: '3%',
//     width: '100%',
//     height: 100,
// },
// buttonsWrapper: {
//     width: '90%',
//     marginTop: '5%',
//     marginHorizontal: '5%',
// },
// buttonsWrapperRow: {
//     width: '100%',
//     height: '20%',
//     flexDirection: 'row',
// },
// buttonsWrapperAdicionales: {
//     width: '100%',
//     height: 50,
//     flexDirection: 'row',
// },
// homeOptionButton: {
//     width: '48%',
//     marginHorizontal: '1%',
//     backgroundColor: '#ff7404',
//     borderRadius: 10,
//     paddingVertical: 10,
//     alignItems: 'center',
// },
// homeVelozButton: {
//     backgroundColor: '#ffc619',
//     marginVertical: 20,
//     padding: 10,
//     width: '100%',
//     alignItems: 'center',
//     borderRadius: 10,
// },
// labelPedidos: {
//     width: '100%',
//     padding: 10,
//     fontSize: 18,
//     backgroundColor: '#FFF',
//     fontWeight: 'bold',
//     color: '#555',
// },
// pedidosWrapper: {
//     width: '100%',
//     maxHeight: '60%',
//     marginBottom: 20,
// },

// // Anuncio
// anuncioImageContainer: {
//     width: '80%',
//     margin: '10%',
//     height: '70%',
//     backgroundColor: '#FFF',
//     borderColor: '#000',
//     borderRadius: 10,
//     borderWidth: 1,
//     overflow: 'hidden',
// },
// anuncioImage: {
//     width: '100%',
//     height: '80%',
//     resizeMode: 'contain',
// },
// newNotiTitle: {
//     width: '100%',
//     fontSize: 18,
//     color: '#FF9933',
//     fontWeight: 'bold',
//     padding: 5,
// },
// newNotiSubTitle: {
//     width: '100%',
//     fontSize: 14,
//     color: '#333',
//     fontWeight: 'bold',
//     padding: 5,
// },

// // Cart
// cartTextInput: {
//     backgroundColor: '#FFF',
//     borderColor: '#CCC',
//     borderWidth: 1,
//     height: 45,
//     width: '90%',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     marginHorizontal: '5%',
// },
// cartTextInputRed: {
//     backgroundColor: '#FFF',
//     borderColor: '#CF0B00',
//     borderWidth: 1,
//     height: 45,
//     width: '90%',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     marginHorizontal: '5%',
// },
// cartTextInputDiscount: {
//     backgroundColor: '#FFF',
//     borderColor: '#CCC',
//     borderWidth: 1,
//     height: 45,
//     width: '60%',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     marginHorizontal: '5%',
// },
// cartLabelTextDiscount: {
//     fontSize: 24,
//     padding: 5,
//     fontWeight: 'bold',
// },
// cartLabelText: {
//     width: '90%',
//     textAlign: 'left',
//     color: '#333',
//     marginVertical: 5,
//     marginHorizontal: '5%',
// },

// // Product
// productImage: {
//     width: width,
//     height: 300,
// },
// filaDetail: {
//     height: 300,
// },
// homeAddButton: {
//     width: '90%',
//     marginHorizontal: '5%',
//     marginVertical: '2%',
//     backgroundColor: '#FD8800',
//     borderRadius: 10,
//     alignItems: 'center',
//     height: '8%',
//     flexDirection: 'row',
//     shadowColor: '#000',
//     shadowOffset: {
//         width: 0,
//         height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
// },
// homeAddButtonText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//     width: '100%',
//     textAlign: 'center',
// },
// homeIconPlus: {
//     padding: 5,
// },
// homeIconsWrapper: {
//     width: '100%',
//     height: '70%',
//     backgroundColor: '#FFF',
// },
// homeIconContainer: {
//     width: '27.3%',
//     marginHorizontal: '3%',
//     marginVertical: '3%',
//     alignItems: 'center',
// },
// homeIcon: {
//     color: '#FFF',
// },
// homeIconBack: {
//     width: '100%',
//     height: '80%',
//     backgroundColor: '#007BC5',
//     alignItems: 'center',
//     borderRadius: 1000,
//     justifyContent: 'center',
// },
// homeIconText: {
//     margin: 10,
//     fontSize: 12,
//     fontWeight: 'bold',
//     textAlign: 'center',
// },

// // Order
// orderInfoWrapper: {
//     backgroundColor: '#e6e6e6',
//     borderRadius: 10,
//     marginVertical: 10,
//     padding: 15,
// },
// orderInfo: {
//     flexDirection: 'row',
//     height: 20,
//     marginVertical: 3,
// },
// orderInfoTitle: {
//     width: '60%',
// },
// orderInfoDetailLabel: {
//     fontWeight: 'bold',
//     width: '40%',
//     textAlign: 'right',
// },
// orderInfoDetailLabelTotal: {
//     fontWeight: 'bold',
//     width: '40%',
//     textAlign: 'right',
//     color: '#b30000',
// },
// orderInfoNumber: {
//     width: '35%',
//     marginRight: '5%',
//     fontWeight: 'bold',
// },
// orderInfoLabel: {
//     color: '#333',
//     width: '60%',
//     textAlign: 'right',
// },
// orderInfoTotal: {
//     width: '35%',
//     marginRight: '5%',
//     fontWeight: 'bold',
//     color: '#FF0000',
// },

// // Miscellaneous
// developedBy: {
//     position: 'absolute',
//     bottom: 50,
//     textAlign: 'center',
//     color: '#333',
//     width: '100%',
// },
// logoYojoa: {
//     width: 300,
//     height: 121,
//     alignSelf: 'center',
// },
// filaLogo: {
//     width: '100%',
//     alignContent: 'center',
//     marginVertical: 20,
// },
// itemContainer: {
//     width: '90%',
// },
// map: {
//     height: 400,
//     width: '100%',
// },
// dateSelectorButton: {
//     width: '96%',
//     marginHorizontal: '2%',
//     marginVertical: 10,
//     borderWidth: 2,
//     borderColor: '#CCC',
//     borderRadius: 10,
//     flexDirection: 'row',
//     padding: 10,
// },
// dateSelectorButtonSelected: {
//     width: '96%',
//     marginHorizontal: '2%',
//     marginVertical: 10,
//     borderWidth: 2,
//     borderColor: '#006699',
//     borderRadius: 10,
//     flexDirection: 'row',
//     padding: 10,
// },
// btnRechazar: {
//     backgroundColor: '#CCC',
//     color: '#FFCC00',
//     borderRadius: 10,
//     width: '44%',
//     padding: 10,
//     marginHorizontal: '3%',
// },
// btnAceptar: {
//     backgroundColor: '#FF9933',
//     color: '#FFF',
//     borderRadius: 10,
//     width: '94%',
//     padding: 10,
//     marginHorizontal: '3%',
// },
// newOrderTitle: {
//     width: '100%',
//     fontSize: 22,
//     color: '#FF9933',
//     textAlign: 'center',
//     fontWeight: 'bold',
// },
// newOrderSubTitle: {
//     width: '100%',
//     fontSize: 18,
//     color: '#333',
//     textAlign: 'center',
//     fontWeight: 'bold',
// },
// wrapperActivo: {
//     flexDirection: 'row',
//     padding: 10,
//     alignItems: 'center',
// },
// textActivo: {
//     color: '#ffffff',
//     width: '100%',
//     textAlign: 'center',
//     fontWeight: 'bold',
// },
// labelMapIndication: {
//     fontSize: 12,
//     color: '#a3a3a3',
// },
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
    marginTop: 0,
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
// menuButton: {
//     backgroundColor: '#FFAE00',
//     width: '85%',
//     paddingVertical: 15,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 4,
// },
// buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
// },
// card: {
//     width: '90%',
//     marginHorizontal: '5%',
//     borderRadius: 20,
//     paddingVertical: 20,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
// },
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

// item: {
//     backgroundColor: '#ccc',
//     padding: 10,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     flexDirection: 'column',
//     borderRadius: 10,
// },

// textwrapper: {
//     flexDirection: 'row',
// },

// textlabel: {
//     fontWeight: 'bold',
//     width: '40%',
// },
   
});

export { Styles };


