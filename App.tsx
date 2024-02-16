import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { ListStations } from "./screens/stationsList";
import { DetailsScene } from "./screens/detailsScene";

const Stack = createNativeStackNavigator();

function App() {
  return (
    // <Text>asd</Text>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListStations">
        <Stack.Screen name="ListStations" component={ListStations} options={{ headerShown: false }} />
        <Stack.Screen name="DetailsSCene" component={DetailsScene} options={{ title: 'Station Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
