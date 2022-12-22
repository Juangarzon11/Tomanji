import { Text, View, StyleSheet } from "react-native"

function EventPlayer({ player, index }) {
    return(
        <>
            <View style={styles.playerContainer}>
                <Text style={styles.name}>{index+1}.  {player.name}</Text>
            </View>
            <View style={styles.separator} />
        </>
    )
}

const styles = StyleSheet.create({
    playerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
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

export default EventPlayer