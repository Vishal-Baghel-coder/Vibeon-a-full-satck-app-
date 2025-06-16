import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/MainScreens/home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import Reel from '../screens/MainScreens/Reel';
import Search from '../screens/MainScreens/Search';
import Profile from '../screens/MainScreens/Profile';
import Create_Content from '../screens/MainScreens/Create_Content';

function HomeTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View>
            <Ionicons name="home" size={30} color={focused ? '#9DB2BF' : '#526D82'} />
        </View>
    );
}
function ReelTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View>
            <Ionicons name="play" size={30} color={focused ? '#9DB2BF' : '#526D82'} />
        </View>
    );
}
function ProfileTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View>
            <Ionicons name="person-outline" size={30} color={focused ? '#9DB2BF' : '#526D82'} />
        </View>
    );
}
function SearchTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View>
            <Ionicons name="search" size={30} color={focused ? '#9DB2BF' : '#526D82'} />
        </View>
    );
}
function CreateTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View style={{ backgroundColor: focused ? '#9DB2BF' : '#526D82', borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="add" size={28} color={focused ? '#526D82' : '#9DB2BF'} />
        </View>
    );
}

export default function TabNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#27374D',
                    position: 'absolute',
                    height: 60,
                    elevation: 0,
                },
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#526D82',
                tabBarInactiveTintColor: 'gray',
                tabBarItemStyle: {
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                },
            }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarIcon: HomeTabBarIcon,
                }}
            />
            <Tab.Screen
                name="Reel"
                component={Reel}
                options={{
                    tabBarIcon: ReelTabBarIcon,
                }}
            />
            <Tab.Screen
                name="Create_Content"
                component={Create_Content}
                options={{
                    tabBarIcon: CreateTabBarIcon,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: SearchTabBarIcon,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ProfileTabBarIcon,
                    tabBarStyle: { display: 'none' },
                }}
            />
        </Tab.Navigator>
    );
}
