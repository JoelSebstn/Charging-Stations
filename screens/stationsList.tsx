import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { tempStationsData } from "../data/stations";
import { Styles } from "../styles/ListScreenStyles";
import firestore from '@react-native-firebase/firestore';



export function ListStations({ navigation }: any) {
    const [stationsData, setStationsData] = useState<any[]>(tempStationsData["stations"])
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    useEffect(() => {
        fetchStations();
    });
    async function fetchStations() {
        try {
            const locationCollection = await firestore().collection('locations').get();
            console.log('locationCollection: ', locationCollection);

        }
        catch (error) {
            console.log("errorCAtched:", error);
        }
    }
    return (
        <SafeAreaView >
            <View>
                <View style={Styles.flexRow}>
                    <View style={Styles.alignCentre}><Text style={Styles.textFont22}>Name</Text></View>
                    <View style={Styles.alignCentre}><Text style={Styles.textFont22}> Status</Text></View>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                    }}
                />
                <FlatList
                    // Data 
                    data={stationsData}
                    // Render Items
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsSCene', { station: item })}>
                            <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>{item.name}</Text></View>
                                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {item.status}</Text></View>
                            </View>
                        </TouchableOpacity>
                    )
                    }
                    // Element Key
                    keyExtractor={(item, index) => String(index)}
                    // Header (Title)
                    // ListHeaderComponent={this.renderHeader}
                    // Footer (Activity Indicator)
                    // ListFooterComponent={this.renderFooter}
                    // On End Reached (Takes in a function)
                    // onEndReached={this.retrieveMore}
                    // How Close To The End Of List Until Next Data Request Is Made
                    onEndReachedThreshold={0}
                // Refreshing (Set To True When End Reached)
                // refreshing={this.state.refreshing}
                /></View >
        </SafeAreaView >
    )
}