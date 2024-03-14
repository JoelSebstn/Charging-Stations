import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { Styles } from "./styles";
import { DetailsRow } from "../../components/detailsRow";
import { fetchStationDetails } from "../../utilities/firebaseServices";

export function DetailsScene({ route }: any) {
    const stationId = route.params["stationId"];
    const [stationDetails, setStationDetails] = useState<any>();
    useEffect(() => {
        fetchStations();
    }, []);
    function fetchStations() {
        try {
            fetchStationDetails(stationId, setStationDetails);
        }
        catch (error) {
            console.log("error:", error);
        }
    }
    return (
        stationDetails && <View style={Styles.detailsSceneView} >
            <View style={Styles.margin40} >
                <Text style={Styles.nameStyle}>{stationDetails!['name'] ?? ''}</Text>
                <Text style={Styles.addressStyle}>{stationDetails["addressDetail"]["address"]},{stationDetails["addressDetail"]["city"]}</Text>
            </View>
            <DetailsRow rowName={'Opening Hours'} data={stationDetails["openingHours"]} />
            <DetailsRow rowName={'Operator'} data={stationDetails["operator"]} />
            <DetailsRow rowName={'Parking Access'} data={stationDetails["parkingAccess"]} />
            <DetailsRow rowName={'Status'} data={stationDetails["status"]} />
        </View >
    )

}