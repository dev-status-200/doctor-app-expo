import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';
import IntroSlider from './Components/Shared/IntroSlider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import Login from './Screens/Login';
import OtpScreen from './Components/Layouts/OtpScreen';
import ChoosePlan from './Screens/ChoosePlan';
import Dashboard from './Components/Layouts/Dashboard';
import Profile from './Components/Layouts/Profile/index';
import SignUp from './Screens/SignUp';
import ChangeImage from './Screens/ChangeImage';
import Map from './Screens/Map';
import DoctorProfile from './Screens/DoctorProfile';
import AllAppointments from './Screens/AllAppointments';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [hide, setHide] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    'Proxim': require('./assets/fonts/FontsFree-Net-ProximaNova-Regular.ttf'),
    'ProximaBold': require('./assets/fonts/FontsFree-Net-Proxima-Nova-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const HomeScreen = ({navigation}) => {
    return(
      <View style={styles.container}>
        {!hide && <IntroSlider setHide={setHide} />}
        {hide && <Login navigation={navigation} /> }
      </View>
    )
  }

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={[styles.container, {backgroundColor: "white"}]}>
    <StripeProvider publishableKey="pk_test_51O2Aj9Fpishfs76QRtWA5nW1r6zkdh3yEXdDMtDx6hSiehXQlqLV5kLJd55SEYOTnzJv6Be9kRMMpfFxnU4RxuGi00LLrv4W1W">
      <StatusBar barStyle={'dark-content'} backgroundColor={"white"} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="ChoosePlan" component={ChoosePlan} />
          <Stack.Screen name="ChangeImage" component={ChangeImage} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
          <Stack.Screen name="AllAppointments" component={AllAppointments} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
    </SafeAreaView>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});