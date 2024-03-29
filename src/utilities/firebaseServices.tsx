
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export async function anonymousAuthentication() {
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
}
// export async function fetchStationsFromFirebase() {
export const fetchStationsFromFirebase = async (setStationsData: any, setLastVisible: any) => {
    firestore().collection('locations')
        .orderBy('id').limit(10).onSnapshot(
            querySnapshot => {
                const data: any = [];
                querySnapshot.forEach(doc => {
                    data.push(doc.data());
                });
                setStationsData(data);
                setLastVisible(querySnapshot.docs[querySnapshot.size - 1].data().id);
            }
        );
    console.log('point3');
}
export async function fetchMoreStationsFromFirebase(setIsLoading: any, setStationsData: any, setLastVisible: any, lastVisible: any, stationsData: any) {
    setIsLoading(true);
    firestore().collection('locations')
        .orderBy('id').limit(10).startAfter(lastVisible).onSnapshot(
            querySnapshot => {
                const data: any = [];
                querySnapshot.forEach(doc => {
                    data.push(doc.data());
                });
                const newList = stationsData?.concat(data);
                setStationsData(newList);
                setLastVisible(newList?.[newList?.length - 1].id);
            }
        );
    setIsLoading(false);
}
export async function fetchStationDetails(stationId: any, setStationDetails: any) {
    firestore().collection('locations').doc(stationId)
        .onSnapshot(documentSnapshot => {
            setStationDetails(documentSnapshot.data());
        });
}