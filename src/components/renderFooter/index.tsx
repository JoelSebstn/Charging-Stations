import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";


export function renderFooter(isLoading: any) {

    // Check If Loading
    if (isLoading) {
        return (
            <ActivityIndicator />
        )
    }
    else {
        return null;
    }

};