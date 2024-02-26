import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../style";
import { useNavigation } from "@react-navigation/native";


export function renderFooter(isLoading: any) {
    try {
        // Check If Loading
        if (isLoading) {
            return (
                <ActivityIndicator />
            )
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
    }
};