import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { tempStationsData } from "../data/stations";
import { Styles } from "../styles/ListScreenStyles";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



export function ListStations({ navigation }: any) {
    const [stationsData, setStationsData] = useState<any[]>()
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    useEffect(() => {
        fetchStations();
    }, []);
    async function fetchStations() {
        try {
            await auth()
                .signInAnonymously()
                .then(() => {
                    console.log('User signed in anonymously');
                })
                .catch(error => {
                    if (error.code === 'auth/operation-not-allowed') {
                        console.log('Enable anonymous in your firebase console.');
                    }

                    console.error(error);
                });
            await firestore().collection('locations')
                .orderBy('id').limit(10).get().then(querySnapshot => {
                    setStationsData(querySnapshot.docs);
                    setLastVisible(querySnapshot.docs[querySnapshot.size - 1].data().id);
                });
        }
        catch (error) {
            console.log("error:", error);
        }
    }
    async function fetchMore() {
        try {
            setIsRefreshing(true);
            await firestore().collection('locations')
                .orderBy('id').limit(10).startAfter(lastVisible).get().then(querySnapshot => {
                    let newList = stationsData?.concat(querySnapshot.docs);
                    setStationsData(newList);
                    setLastVisible(newList?.[newList?.length - 1].data().id);
                });
            setIsRefreshing(false);
        } catch (error) {

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
                    style={Styles.horizontalLine}
                />
                <FlatList
                    // Data 
                    data={stationsData}
                    // Render Items
                    renderItem={({ item }) => (
                        <RenderItem item={item} />
                    )
                    }
                    // Element Key
                    keyExtractor={(item, index) => String(index)}
                    // Header (Title)
                    // ListHeaderComponent={this.renderHeader}
                    // Footer (Activity Indicator)
                    ListFooterComponent={renderFooter}
                    // On End Reached (Takes in a function)
                    onEndReached={fetchMore}
                    // How Close To The End Of List Until Next Data Request Is Made
                    onEndReachedThreshold={0}
                // Refreshing (Set To True When End Reached)
                // refreshing={this.state.refreshing}
                /></View >
        </SafeAreaView >
    )
    function RenderItem(item: any) {
        let data = item["item"].data();
        return (<TouchableOpacity onPress={() => navigation.navigate('DetailsSCene', { station: item })}>
            <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}>{data.name}</Text></View>
                <View style={Styles.alignCentre}><Text style={Styles.textFont22}> {data.status}</Text></View>
            </View>
        </TouchableOpacity>)

    }// Render Footer
    function renderFooter() {
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
}