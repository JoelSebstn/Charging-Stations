import { View, Text } from "react-native";
import { Styles } from "./style";

export function HeaderRow() {
    return (
        <>
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre} testID=""><Text style={Styles.textFont22}>Name</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> Status</Text></View>
            </View>
            <View
                style={Styles.horizontalLine}
            />
        </>
    )
}