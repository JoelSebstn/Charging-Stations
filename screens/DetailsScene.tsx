import { Text, View } from "react-native";
import { Styles } from "../styles/ListScreenStyles";
import { useEffect } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function DetailsScene({ route }: any) {
    const station = route.params["station"]["item"].data();
    useEffect(() => {
        fetchStations();
    }, []);
    async function fetchStations() {
        try {
            await firestore().collection('locations').doc(station.id)
                .get().then(documentSnapshot => {
                    console.log('documentSnapshot: ', documentSnapshot.data());
                });
        }
        catch (error) {
            console.log("errorCAtched:", error);
        }
    }
    return (
        <View style={Styles.detailsSceneView}>
            <View >
                <Text style={Styles.nameStyle}>{station["name"]}</Text>
                <Text style={Styles.addressStyle}>{station["addressDetail"]["address"]},{station["addressDetail"]["city"]}</Text>
            </View>
            <View
                style={Styles.margin40}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Opening Hours:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {station["openingHours"]}</Text></View>
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
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>{station["parkingAccess"]}</Text></View>
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