import { View, Text } from "react-native";
import { Styles } from "./styles";

export function DetailsRow({ rowName, data }: any) {
    return (<View style={[Styles.flexRow, Styles.margin20]}>
        <View style={Styles.alignCentre}><Text style={Styles.textFont22}>{rowName}:</Text></View>
        <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {data}</Text></View>
    </View >)
}