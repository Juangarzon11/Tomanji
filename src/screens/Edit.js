import { useContext, useState } from "react"
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native"
import { StoreContext } from "../store/StoreProvider"
import { types } from "../store/StoreReducer"
import EmojiPicker from "rn-emoji-keyboard"
import { useNavigation } from "@react-navigation/native"

function Edit({ route }) {
    const { name, avatar, index } = route.params.player

    const [store, dispatch] = useContext(StoreContext)
    
    const navigation = useNavigation()
    
    
    const [player, setPlayer] = useState({
        name: name,
        avatar: avatar,
    })
    const [isOpen, setIsOpen] = useState(false) 
    const [error, setError] = useState('')

    const onChange = (text) => {
        setError('')
        setPlayer({...player, name: text})
    }

    const handlePick = (emojiObject) => {
        setPlayer({
            ...player,
            avatar: emojiObject.emoji
        })
    }

    const onConfirm = () => {

        if(player.name === '') {
            setError('🚨Ingresa un nombre')
            return
        }
        
        dispatch({
            type: types.editPlayer,
            payload: { ...player, index}
        })
        navigation.goBack()
    }

    return(
        <View style={styles.container} >
            <Text style={styles.title} >Editar Nombre</Text>

            <Text style={styles.subtitle} >Elige un icono o cambia el nombre del jugador</Text>

            {!error ? '' : <Text style={{color: 'red', marginTop: 12,}} >{error}</Text>}

            <View style={styles.nameContainer}>
                <Text style={styles.avatar} onPress={() => setIsOpen(true)} >{player.avatar}</Text>
                <EmojiPicker
                    onEmojiSelected={handlePick}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                /> 
                <TextInput
                    style={styles.inputContainer}
                    placeholder='Escribir Nombre'
                    value={player.name}
                    onChangeText={onChange}
                />
            </View>

            <Pressable style={styles.confirmButton} onPress={onConfirm} >
                <Text style={styles.buttonText} >Guardar</Text>
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
    title: {
        fontSize: 20,
        fontWeight: '700',
        margin: 20
    },
    subtitle: {
        fontSize: 11,
        color: '#979797',
        width: '75%'
    },
    nameContainer: {
        width: '75%',
        alignItems: 'center'
    },
    avatar: {
        fontSize: 25,
        padding: 8,
        marginTop: 15,
    },
    inputContainer: {
        width: '100%',
        padding: 13,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#B0B0B0'
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
})

export default Edit