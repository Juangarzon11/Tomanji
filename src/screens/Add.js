import { Text, View, StyleSheet, TextInput, Pressable } from "react-native"
import { useContext, useState } from "react"
import EmojiPicker from "rn-emoji-keyboard"
import { useNavigation } from "@react-navigation/native"
import { StoreContext } from "../store/StoreProvider"
import { types } from "../store/StoreReducer"

function Add() {
    const navigation = useNavigation()

    const [store, dispatch] = useContext(StoreContext)

    const [isOpen, setIsOpen] = useState(false)

    const [player, setPlayer] = useState({
        name: '',
        avatar: '🤺',
        createdAt: new Date()
    })
    const [allPlayers, setAllPlayers] = useState([])
    const [error, setError] = useState('')

    const handlePick = (emojiObject) => {
        setPlayer({
            ...player,
            avatar: emojiObject.emoji
        })
    }

    const onChange = (text) => {
        setError('')
        setPlayer({...player, name: text})
    }

    const onDelete = (player) => {
        allPlayers.splice(player, 1)
        setAllPlayers([...allPlayers])
    }

    const handlePress = () => {

        if(player.name === '') {
            setError('🚨Ingresa un nombre')
            return
        }

        setAllPlayers([...allPlayers, player])
        setPlayer({
            name: '',
            avatar: '🤺',
            createdAt: new Date()
        })
    }

    const onConfirm = () => {
        
        dispatch({
            type: types.addPlayer,
            payload: allPlayers
        })
        navigation.goBack()
        /* await allPlayers.forEach(player => {
            addDoc(collection(database, 'players'), player)
        })
        navigation.goBack() */
    }

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Agrega Jugadores</Text>
            <Text style={styles.subtitle} >Escibe el nombre, elige un avatar para cada jugador y presiona el botón + para agregarlo</Text>

            <View style={styles.namesContainer} >
                {allPlayers !== [] ? allPlayers.map((player, index) => {
                    return(
                        <Pressable key={player.createdAt} style={styles.buttonNames} onPress={() => onDelete(index)} >
                            <Text style={styles.names} >{player.avatar}{player.name}</Text>
                            <Text>X</Text>
                        </Pressable>
                    )
                })
                : ''}
            </View>


            <Text style={styles.avatar} onPress={() => setIsOpen(true)} >{player.avatar}</Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />

            {!error ? '' : <Text style={{color: 'red'}} >{error}</Text>}

            <View style={styles.nameContainer}>
                <TextInput
                    style={styles.inputContainer}
                    placeholder='Escribir Nombre'
                    value={player.name}
                    onChangeText={onChange}
                />
                <Pressable style={styles.addButton} onPress={handlePress} >
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
            <Pressable style={styles.confirmButton} onPress={onConfirm} >
                <Text style={styles.buttonText} >Confirmar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        padding: 20
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        margin: 20
    },
    subtitle: {
        margin: 10,
        fontSize: 11,
        color: '#979797',
        width: '75%'
    },
    inputContainer: {
        width: '60%',
        padding: 13,
        marginVertical: 6,
        borderBottomWidth: 1,
        borderColor: '#B0B0B0'
    },
    avatar: {
        fontSize: 30,
        padding: 10,
        marginVertical: 6,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B0B0B0',
        width: 35,
        height: 35,
        borderRadius: 6,
        marginLeft: 6,
        marginTop: 10
    },
    confirmButton: {
        backgroundColor: '#84E052',
        width: '75%',
        height : 40,
        marginTop: 20,
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
    namesContainer: {
        width: '70%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        shadowColor: "#E4E4E4",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1.00,
        elevation: 1,
    },
    names: {
        fontWeight: '700',
        marginHorizontal: 3,
    },
    buttonNames: {
        flexDirection: 'row',
        backgroundColor: '#EDEDED',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 4,
        margin: 4,
        borderRadius: 6
    }
})

export default Add