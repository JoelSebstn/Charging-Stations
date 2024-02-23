import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "./style";
import { useNavigation } from "@react-navigation/native";

export function HeaderRow() {
    return (<><View style={Styles.flexRow}>
        <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Name</Text></View>
        <View style={Styles.alignCentre}><Text style={Styles.textFont22}> Status</Text></View>
    </View>
        <View
            style={Styles.horizontalLine}
        /></>
    )
}
export function RenderItem(item: any) {
    const data = item["item"].data();
    const stationId = item["item"].data().id;
    const navigation: any = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetailsSCene', { stationId: stationId })}>
            <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>{data.name}</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {data.status}</Text></View>
            </View>
        </TouchableOpacity>
    )

}
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