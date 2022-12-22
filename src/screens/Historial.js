import { useEffect, useState } from "react"
import { Text, SafeAreaView, View, StyleSheet, ScrollView } from "react-native"
import { database } from '../config/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useNavigation } from "@react-navigation/native"
import Event from "../components/Event"

function Historial() {
    const navigation = useNavigation()

    const [events, setEvents] = useState([])

    useEffect(() =>{
        const collectionRef = collection(database, 'teams')
        const q = query(collectionRef, orderBy('createdAt', 'desc'))

        const teams = onSnapshot(q, querySnapshot  => {
            setEvents(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    date: doc.data().date,
                    players: doc.data().players,
                    createdAt: doc.data().createdAt
                }))
            )
        })

        return teams
    }, [])


    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>HISTORIAL</Text>
            <View style={styles.events}>
                <ScrollView>
                    {events.map(event => (<Event key={event.id} event={event} />))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f454e',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    events: {
        flex: 0.8,
        marginTop: 40,
        width: '80%',
    },
})

export default Historial