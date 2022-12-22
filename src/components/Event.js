import { View, Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

function Event({ event }) {
    const navigation = useNavigation()

    let date = new Date(event.createdAt.seconds*1000).toJSON()
    date = new Date(date)

    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    switch (month) {
        case 0:
            month = 'Enero'
            break
        case 1:
            month = 'Febrero'
            break
        case 2:
            month = 'Marzo'
            break
        case 3:
            month = 'Abril'
            break
        case 4:
            month = 'Mayo'
            break
        case 5:
            month = 'Junio'
            break
        case 6:
            month = 'Julio'
            break
        case 7:
            month = 'Agosto'
            break
        case 8:
            month = 'Septiembre'
            break
        case 9:
            month = 'Octubre'
            break
        case 10:
            month = 'Noviembre'
            break
        case 11:
            month = 'Diciembre'
            break
    }

    const fullDate = day+' '+month+' '+year

    return(
        <>
            <View style={styles.eventContainer}>
                <View>
                    <Text style={styles.name}>{event.name}</Text>
                    <Text style={styles.date}>{fullDate}</Text>
                </View>
                <Pressable style={styles.button} onPress={() => navigation.navigate('EventPlayers', { players: {...event.players}, event: event.name, date: fullDate })}>
                    <Text style={styles.buttonText}>Ver</Text>
                </Pressable>
            </View>
            <View style={styles.separator} />
        </>
    )
}


const styles = StyleSheet.create({
    eventContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: 'white',
    },
    date: {
        color: 'white',
    },
    button: {
        backgroundColor: '#FFF',
        width: '25%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#38B3E0'
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#FFF',
        marginBottom: 8,
    }
})


export default Event