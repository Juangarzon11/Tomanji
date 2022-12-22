import { Button, Text, View, StyleSheet, Pressable, ScrollView, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useContext } from "react"
import { StoreContext } from "../store/StoreProvider"
import Player from "../components/Player"

function Home() {
    const navigation = useNavigation()

    const [store, dispatch] = useContext(StoreContext)

    if(store.length === 0){
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Jugadores</Text>
                <View style={styles.listContainer}>
                    <View  style={styles.playersContainer} >
                        <Text>No hay jugadores aún</Text>
                        <Button title="+ Agregar Jugador" onPress={() => navigation.navigate('Add')} />
                    </View>
    
                    <Pressable style={styles.historialButton} onPress={() => navigation.navigate('Historial')}>
                        <Text style={styles.buttonText} >⨀ Historial Jugadores</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.confirmButton} disabled>
                    <Text style={styles.buttonText} >CONFIRMAR</Text>
                </Pressable>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Jugadores</Text>
                <View style={styles.playerListContainer}>
                    <ScrollView style={styles.namesContainer}>
                        {store.map((player, index) => {
                            return(
                                <Player key={player.createdAt} player={player} index={index} />
                            )
                        })}
                    </ScrollView>
                    <View style={styles.addPlayers}>
                        <Button title="+ Agregar Jugador" onPress={() => navigation.navigate('Add')} />
                    </View>
                </View>
                <Pressable style={styles.confirmButton} onPress={() => navigation.navigate('AddEvent')}>
                    <Text style={styles.buttonText} >CONFIRMAR</Text>
                </Pressable>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f454e',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 15,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    listContainer: {
        flex: 0.7,
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    },
    playerListContainer: {
        flex: 0.7,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    namesContainer: {
        width: '100%',
    },
    addPlayers: {
        position: 'absolute',
        bottom: 0,
        padding: 8,
        backgroundColor: '#FFF',
        width: '100%'
    },
    playersContainer: {
        flex: 1,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historialButton: {
        backgroundColor: '#FD7D39',
        width: '95%',
        height : 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButton: {
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

export default Home