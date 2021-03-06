import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    FlatList

} from 'react-native';
import api, { URL } from '../../service/api';
import io from 'socket.io-client';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler'
interface Msm {
    name: string;
    message: string;
}



const Chat: React.FC<any> = ({ navigation, route }) => {
    const { name } = route.params;
    const socket = io(URL);
    const [messages, setMessages] = useState<Msm[]>([]);

    const [inputMessage, setInputMessage] = useState<string>('');


    const loadMessages = () => {
        api.get('/messages/index').then(res => {
            setMessages(res.data.value);
            console.log('/messages/index', res.data.value);
        })
    }
    const onSocket = () => {
        socket.on('message', (res: Msm) => {
            setMessages(messages => [...messages, res]);
            console.log('onSocket', res);
        })
    }

    const onSubmit = () => {
        if (inputMessage.length === 0) {
            return;
        }
        const Data = {
            name: name,
            message: inputMessage
        }
        api.post('/messages/create', Data).then(() => {
            setInputMessage('');
        })
    }

    useEffect(() => {
        loadMessages();
        onSocket();
    }, []);

    const RenderItem = (item: Msm, index: number) => {
        if (item.name === name) {
            return (
                <>
                    <View style={styles.containerViewMessageEU}>
                        <Text style={styles.containerViewMessageEUText} >{item.message}</Text>
                    </View>
                </>
            )
        }
        return (
            <>
                <View style={styles.containerViewMessage}>
                    <Text style={styles.containerViewMessageText} >{item.name}: {item.message}</Text>
                </View>
            </>
        )
    }


    return (
        <>
            <View style={styles.container}>

                <FlatList
                    style={{ flex: 1}}
                    data={messages}
                    renderItem={({ item, index }) => RenderItem(item, index)}
                    keyExtractor={(item: Msm, index: number) => String(index)}
                />

            </View>
            <View style={styles.inputViewMessage}>
                <TextInput
                    style={styles.input}
                    value={inputMessage}
                    onChangeText={(e) => setInputMessage(e)}
                    placeholder={'Введите сообщение...'}
                />
                <RectButton onPress={onSubmit} style={styles.submit}>
                    <Ionicons name="send" size={32} color="white" />
                </RectButton>
            </View>
        </>
    )
}
export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputViewMessage: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    input: {
        width: '80%',
        height: '80%',
        borderWidth: 1,
        borderColor: '#707070',
        padding: 10
    },
    submit: {
        width: '20%',
        height: '80%',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textSubmit: {
        color: 'white',
        fontSize: 20
    },
    containerViewMessage: {
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        flexDirection: 'row'
    },
    containerViewMessageEU:{
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 5,
        flexDirection: 'row'
    },

    containerViewMessageEUText: {
        backgroundColor: 'green',
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: 'white'
    },
    containerViewMessageText: {
        backgroundColor: 'darkseagreen',
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: 'white'
    }
});
