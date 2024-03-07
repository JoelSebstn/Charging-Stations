import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native"
import { HeaderRow } from "../../components/headerRow/headerRow";
import { RenderItem } from "../../components/renderItem";
import { renderFooter } from "../../components/renderFooter";
import { anonymousAuthentication, fetchMoreStationsFromFirebase, fetchStationsFromFirebase } from "../../utilities/firebaseServices";

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
            await anonymousAuthentication();
            fetchStationsFromFirebase(setStationsData, setLastVisible)
        }
        catch (error) {
            console.log("error:", error);
        }
    }
    async function fetchMore() {
        try {
            fetchMoreStationsFromFirebase(setIsLoading, setStationsData, setLastVisible, lastVisible, stationsData)
        } catch (error) {
            console.log("error:", error);
        }
    }
    return (
        <SafeAreaView >
            <HeaderRow />
            <FlatList
                data={stationsData}
                renderItem={({ item }) => (
                    <RenderItem item={item.data()} navigation={navigation} />)
                }
                keyExtractor={(item, index) => String(index)}
                ListFooterComponent={renderFooter(isLoading)}
                onEndReached={fetchMore}
                onEndReachedThreshold={3}
            />
        </SafeAreaView >
    )
}