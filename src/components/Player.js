import { Text, View, StyleSheet, Pressable } from "react-native"
import { useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import { StoreContext } from "../store/StoreProvider"
import { types } from "../store/StoreReducer"

function Player({ player, index }) {
    const navigation = useNavigation()

    const [store, dispatch] = useContext(StoreContext)

    const onDelete = (player) => {
        dispatch({
            type: types.deletePlayer,
            payload: player
        })
    }

    return(
        <View style={styles.player} >
            <Text >{index + 1}.</Text>
            <Pressable style={styles.playerName} onPress={() => navigation.navigate('Edit', { player: { index, name: player.name, avatar: player.avatar} })} >
                <Text style={styles.name}>{player.avatar}{player.name}</Text>
            </Pressable>
            <Pressable onPress={() => onDelete(index)}>
                <Text>X</Text>
            </Pressable>
        </View>   
    )
}

const styles = StyleSheet.create({
    player: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 13,
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
    },
    playerName: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'flex-start',
    },
})

export default Player