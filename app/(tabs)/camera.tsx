import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { CameraCapturedPicture, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Camera() {
    const [ photos, setPhotos ] = useState<CameraCapturedPicture[]>([])
    const [barcode, setBarcode] = useState<string | undefined>()
    const cameraRef = useRef<CameraView>(null)

    const onClose = () => {
      setBarcode(undefined)
      setPhotos([])
    }

    const takePicture = async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setPhotos([...photos, photo])
        }
      }
    };

    return <View style={styles.container}>
            <CameraView ref={cameraRef} facing="back" style={styles.camera} barcodeScannerSettings={{
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
                {barcode && <View style={styles.actions}>
                  <View style={styles.buttonsContainer}>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '40%' }}>
                      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                          <Ionicons name="close" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '60%' }}>
                      <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <ThemedText />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <ThemedText style={{ fontWeight: 'bold' }}>{barcode}</ThemedText>
                </View>}
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
    button: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#007AFF',
    },
    actions: {
      padding: 10,
      marginBottom: 10, 
      borderRadius: 8,
      alignContent: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center' // Horizontally align content
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
    }
  });