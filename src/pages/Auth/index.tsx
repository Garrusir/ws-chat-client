import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native'

import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Auth: React.FC = () => {
    const [name, setName] = useState<string>('');

    const navigation = useNavigation();


    const handlePress = () => {
        if (name.length === 0) {
            return;
        }

        navigation.navigate('Chat', { name });
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.viewInputs}>
                    <TextInput
                        value={name}
                        onChangeText={(e) => setName(e)}
                        style={styles.input}
                        placeholder={'Ваше имя'}
                    />
                    <RectButton onPress={handlePress} style={styles.button}>
                        <Text style={styles.textSubmit}>Войти</Text>
                    </RectButton>
                </View>
            </View>
        </>
    )
}
export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderColor: '#707070',
        borderRadius: 7
    },
    button: {
        width: '70%',
        height: 50,
        backgroundColor: 'green',
        padding: 10,
        marginTop: 30,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewInputs: {
        width: '100%',
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    textSubmit: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'

    }
});


