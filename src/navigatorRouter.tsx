import { NavigationContainer } from "@react-navigation/native"
import { DetailsScene } from "./screens/DetailsScene"
import { ListStations } from "./screens/ListStations"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export function NavigatorRouter() {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName="ListStations">
            <Stack.Screen name="ListStations" component={ListStations} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsSCene" component={DetailsScene} options={{ title: 'Station Details' }} />
        </Stack.Navigator>
    </NavigationContainer>
}