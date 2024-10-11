import { useMutation } from "@tanstack/react-query";
import { CameraCapturedPicture } from "expo-camera";
import Constants from "expo-constants";
import { Alert } from "react-native";


interface Props {
  barcode: string;
  photos: CameraCapturedPicture[];
}

const getUrl = () => {
  const devUrl= Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8001') ?? null

  if (devUrl) {
    return `http://${devUrl}/admin-api/`
  }

  return process.env.EXPO_PUBLIC_API_URI
}

export function useCreateProduct() {


  return useMutation<{ access_token: string }, unknown, Props>({
    mutationFn: async (props: Props) => {
      Alert.alert(`${getUrl()}access_token`)
      const accessTokenResponse = await fetch(`${getUrl()}access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'grant_type': 'client_credentials',
          'client_id': process.env.EXPO_PUBLIC_API_CLIENT_ID,
          'client_secret': process.env.EXPO_PUBLIC_API_CLIENT_SECRET,
          'scope': ['product_read']
        }),
      })

      const data = await accessTokenResponse.json()
      return data
    }
  })
}
