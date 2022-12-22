import { useNavigation } from "@react-navigation/native"
import { useContext, useState } from "react"
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native"
import { StoreContext } from "../store/StoreProvider"
import { database } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { types } from "../store/StoreReducer"

function AddEvent() {
    const navigation = useNavigation()

    const [store, dispatch] = useContext(StoreContext)

    const [event, setEvent] = useState({
        name: '',
        players: {...store},
        createdAt: new Date()
    })
    const [error, setError] = useState(false)

    const onChange = (text) => {
        setError('')
        setEvent({...event, name: text})
    }

    const onConfirm = async () => {

        if(event.name === '') {
            setError('🚨Ingresa un nombre')
            return
        }

        await addDoc(collection(database, 'teams'), event)
            .then(() => dispatch({
                type: types.deleteAll
            }))
            .then(() => navigation.goBack())
    }

    return(
        <View style={styles.container} >
            <Text style={styles.title} >Nombre Evento</Text>
            <Text style={styles.subtitle} >Guarda el nombre del evento para el futuro.</Text>

            {!error ? '' : <Text style={{color: 'red'}} >{error}</Text>}

            <View style={styles.nameContainer}>
                <TextInput
                    style={styles.inputContainer}
                    placeholder='Nombre del equipo'
                    value={event.name}
                    onChangeText={onChange}
                />
            </View>

            <Pressable style={styles.confirmButton} onPress={onConfirm} >
                <Text style={styles.buttonText} >A Jugar!</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
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
    nameContainer: {
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center'
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

export default AddEvent