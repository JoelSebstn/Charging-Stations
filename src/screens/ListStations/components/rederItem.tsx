import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import { Styles } from "../style";

export function RenderItem(item: any) {
    const data = item["item"];
    const stationId = data.id;
    const navigation: any = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetailsSCene', { stationId: stationId })}>
            <View style={Styles.rowMargin12}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>{data.name}</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {data.status}</Text></View>
            </View>
        </TouchableOpacity>
    )

}