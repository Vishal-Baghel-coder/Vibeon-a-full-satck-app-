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
            <Ionicons name="home" size={30} color={focused ? '#3a56d6' : '#bcd3f7'} />
        </View>
    );
}
function ReelTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View>
            <Ionicons name="play" size={30} color={focused ? '#3a56d6' : '#bcd3f7'} />
        </View>
    );
}
function ProfileTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View>
            <Ionicons name="person-outline" size={30} color={focused ? '#3a56d6' : '#bcd3f7'} />
        </View>
    );
}
function SearchTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View>
            <Ionicons name="search" size={30} color={focused ? '#3a56d6' : '#bcd3f7'} />
        </View>
    );
}
function CreateTabBarIcon({ focused }: { focused: boolean }) {
    return (
        <View style={{ backgroundColor: focused ? '#3a56d6' : 'gray', borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="add" size={28} color="white" />
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
                    backgroundColor: 'rgba(125, 161, 227, 0.9)',
                    position: 'absolute',
                    height: 70,
                    elevation: 0,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                tabBarActiveTintColor: '#3a56d6',
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
                }}
            />
        </Tab.Navigator >
    );
}
