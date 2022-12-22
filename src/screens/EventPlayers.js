import { SafeAreaView, Text, View, StyleSheet, ScrollView, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useContext } from "react"
import { StoreContext } from "../store/StoreProvider"
import { types } from "../store/StoreReducer"
import EventPlayer from "../components/EventPlayer"

function EventPlayers({ route }) {
    
    const navigation = useNavigation()
    
    const [store, dispatch] = useContext(StoreContext)

    const { event, players, date } = route.params

    const eventPlayers = Object.values(players)


    const onSelect = () => {
        dispatch({
            type: types.addPlayer,
            payload: eventPlayers
        })
        navigation.navigate('Home')
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{event}</Text>
            <View style={styles.dateContainer}>
                <Text style={styles.subtitle}>Jugadores</Text>
                <Text style={styles.dateText}>{date}</Text>
            </View>
            <View style={styles.players}>
                <ScrollView>
                    {eventPlayers.map((player, index) => (<EventPlayer key={index} player={player} index={index} />))}
                </ScrollView>
            </View>
            <Pressable style={styles.selectButton} onPress={onSelect}>
                <Text style={styles.buttonText} >SELECCIONAR</Text>
            </Pressable>
            
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
        marginBottom: 32,
    },
    dateContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },
    subtitle: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 15
    },
    dateText: {
        color: '#FFF',
    },
    players: {
        flex: 0.8,
        marginTop: 40,
        width: '80%',
    },
    selectButton: {
        backgroundColor: '#2D87A8',
        width: '75%',
        height : 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.00,
        elevation: 1,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
})

export default EventPlayers