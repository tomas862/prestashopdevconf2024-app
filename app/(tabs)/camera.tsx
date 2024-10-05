import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { CameraCapturedPicture, CameraView } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Camera() {
    const [ cameraPosition, setCameraPosition ] = useState<'back' | 'front'>('back')
    const [ photos, setPhotos ] = useState<CameraCapturedPicture[]>([])
    const [barcode, setBarcode] = useState<string | undefined>()
    const cameraRef = useRef<CameraView>(null)

    const onClose = () => {
      setBarcode(undefined)
      setPhotos([])
    }

    const rotateScreen = () => {
      setCameraPosition(cameraPosition === 'back' ? 'front' : 'back')
    }

    const takePicture = async () => {
      console.log(cameraRef)
      if (!cameraRef.current) {
        return
      }

      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        console.info('Photo taken', photo)
        setPhotos((prevPhotos) => [...prevPhotos, photo])
      }
    };

    return <View style={styles.container}>
            <CameraView ref={cameraRef} facing={cameraPosition} style={styles.camera} barcodeScannerSettings={{
                barcodeTypes: [
                    'aztec',
                    'ean13',
                    'ean8',
                    'qr',
                    'pdf417',
                    'upc_e',
                    'datamatrix',
                    'code39',
                    'code93',
                    'itf14',
                    'codabar',
                    'code128',
                    'upc_a',
                ],
            }} onBarcodeScanned={(result) => {
              if (result.data) {
                setBarcode(result.data)
              }
            }} autofocus="on">
                <View style={styles.actions}>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoButton} onPress={takePicture}>
                        <Ionicons name="camera" size={24} color="#007AFF" />
                        {photos.length > 0 && (
                          <View style={styles.badge}>
                              <Text style={styles.badgeText}>{photos.length}</Text>
                          </View>)
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rotateScreenButton} onPress={rotateScreen}>
                        <Ionicons name="camera-reverse" size={24} color="orange" />
                    </TouchableOpacity>
                  </View>

                  {barcode && <ThemedText style={{ fontWeight: 'bold' }}>{barcode}</ThemedText>}
                </View>
            </CameraView>
        </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    photoButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#007AFF',
    },
    rotateScreenButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: 'orange',
    },
    actions: {
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      alignContent: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    closeButton: {
      borderWidth: 2,
      width: 50,
      height: 50,
      borderRadius: 25,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between'
    },
    badge: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
  });
