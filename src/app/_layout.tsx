import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { router, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import ModalHeaderText from '../components/ModalHeaderText';
import Colors from '../constants/Colors';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
// cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try{
      return SecureStore.getItemAsync(key);
    } catch (err) {
      // console.error(err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try{
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return;
    }
  }
}


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('@/assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('@/assets/fonts/Montserrat-Bold.ttf')
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
  <RootLayoutNav />
  </ClerkProvider>);
}

function RootLayoutNav() {
  const router = useRouter();
  const {isLoaded, isSignedIn} = useAuth()

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push('/(modals)/login');
  //   }
  // }, [isLoaded]);
  return (  
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: 'modal',
          title: 'Log in or sign up',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => router.back()}>
          //     <Ionicons name="close-outline" size={28} />
          //   </TouchableOpacity>
          // ),
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="listing/[id]" options={{headerTitle:'', headerTransparent: true}}/>
      <Stack.Screen name='(modals)/booking' options={{
        presentation: 'transparentModal',
        animation: 'fade',
        headerTransparent: true,
        headerTitle: () => <ModalHeaderText/>,
         headerLeft: () => (
            <TouchableOpacity 
            style={{
              backgroundColor: '#fff',
              borderColor: Colors.grey,
              borderRadius: 20,
              borderWidth: 1,
              padding: 4
            }}
            onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
      }}/>
      </Stack>
  );
}
