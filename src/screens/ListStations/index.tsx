import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { Styles } from "./style";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { HeaderRow, RenderItem, renderFooter } from "./components";

export function ListStations({ }, { navigation }: any) {
    const [stationsData, setStationsData] = useState<any[]>()
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(
        () => {
            fetchStations();
        },
        []
    );
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
            firestore().collection('locations')
                .orderBy('id').limit(10).onSnapshot(
                    querySnapshot => {
                        setStationsData(querySnapshot.docs);
                        setLastVisible(querySnapshot.docs[querySnapshot.size - 1].data().id);
                    },
                );
        }
        catch (error) {
            console.log("error:", error);
        }
    }
    async function fetchMore() {
        try {
            setIsLoading(true);
            firestore().collection('locations')
                .orderBy('id').limit(10).startAfter(lastVisible).onSnapshot(
                    querySnapshot => {
                        console.log('list Updated ');
                        let newList = stationsData?.concat(querySnapshot.docs);
                        setStationsData(newList);
                        setLastVisible(newList?.[newList?.length - 1].data().id);
                    }
                );
            setIsLoading(false);
        } catch (error) {
            console.log("error:", error);
        }
    }
    return (
        <SafeAreaView >
            <View>
                <HeaderRow />
                <FlatList
                    data={stationsData}
                    renderItem={({ item }) => (
                        <RenderItem item={item} navigation={navigation} />
                    )
                    }
                    keyExtractor={(item, index) => String(index)}
                    ListFooterComponent={renderFooter(isLoading)}
                    onEndReached={fetchMore}
                    onEndReachedThreshold={3}
                /></View >
        </SafeAreaView >
    )
}