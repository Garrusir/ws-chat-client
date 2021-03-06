import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from '../pages/Auth';
import Chat from '../pages/Chat';

const Stack = createStackNavigator();

const Router: React.FC = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Auth'>

                <Stack.Screen options={{
                    title: 'Авторизация'
                }} name='Auth' component={Auth} />

                <Stack.Screen options={{
                    title: 'Чат'
                }} name='Chat' component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Router;
