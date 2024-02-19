import { Text, View } from "react-native";
import { Styles } from "../styles/ListScreenStyles";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';

export function DetailsScene({ route }: any) {
    const stationid = route.params["stationId"];
    const [stationDetails, setStationDetails] = useState<any>();
    useEffect(() => {
        fetchStations();
    }, []);
    async function fetchStations() {
        try {
            await firestore().collection('locations').doc(stationid)
                .get().then(async documentSnapshot => {
                    setStationDetails(documentSnapshot.data());
                });
        }
        catch (error) {
            console.log("errorCAtched:", error);
        }
    }
    return (
        stationDetails && <View style={Styles.detailsSceneView} >
            <View >
                <Text style={Styles.nameStyle}>{stationDetails!['name'] ?? ''}</Text>
                <Text style={Styles.addressStyle}>{stationDetails["addressDetail"]["address"]},{stationDetails["addressDetail"]["city"]}</Text>
            </View>
            <View
                style={Styles.margin40}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Opening Hours:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {stationDetails["openingHours"]}</Text></View>
            </View >
            <View
                style={Styles.margin20}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Operator:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {stationDetails["operator"]}</Text></View>
            </View >
            <View
                style={Styles.margin20}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Parking Access:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>{stationDetails["parkingAccess"]}</Text></View>
            </View >
            <View
                style={Styles.margin20}
            />
            <View style={Styles.flexRow}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Status:</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {stationDetails["status"]}</Text></View>
            </View >
        </View >)

}