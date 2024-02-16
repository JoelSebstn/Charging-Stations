import { Text, View } from "react-native";
import { Styles } from "../styles/ListScreenStyles";

export function DetailsScene({ route }: any) {
    const station = route.params["station"];
    return (
        <View style={Styles.detailsSceneView}>
            <View >
                <Text style={Styles.nameStyle}>{station["name"]}</Text>
                <Text style={Styles.addressStyle}>{station["address"]}</Text>
            </View>
            <View
                style={Styles.margin40}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Opening Hours:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {station["opening hours"]}</Text></View>
            </View >
            <View
                style={Styles.margin20}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Operator:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {station["operator"]}</Text></View>
            </View >
            <View
                style={Styles.margin20}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Parking Access:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>{station["parking access"] == true ? 'Yes' : 'No'}</Text></View>
            </View >
            <View
                style={Styles.margin20}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Status:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {station["status"]}</Text></View>
            </View >
        </View >)

}