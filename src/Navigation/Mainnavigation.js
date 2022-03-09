import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Screens
import Home from "../Screens/Home";
import Categories from "../Screens/Categories";
import Favorites from "../Screens/Favorites";
import { Colors } from "../Utils/Colors";
import { Icon } from 'react-native-elements'

const Tab = createMaterialBottomTabNavigator();

function MainNavigation() {
  const userData = useSelector((state) => state.imageData.data);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad', height: 60, justifyContent: 'center', alignItems: 'center' }}
      >
        <Tab.Screen name="Home" component={Home}  
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <Icon name="home"
                type="foundation"
                size={20}
                color={focused ? '#ffffff' : '#3e2465'} />
            ),
          }}
        />
        <Tab.Screen name="Categories" component={Categories}
          options={{
            tabBarLabel: 'Categories',
            tabBarIcon: ({ focused }) => (
              <Icon name="category"
                type="material"
                size={20}
                color={focused ? '#ffffff' : '#3e2465'} />
            ),
          }}
        />
        <Tab.Screen name="Favorites" component={Favorites}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ focused }) => (
              <Icon name="favorite"
                type="material"
                size={20}
                color={focused ? '#ffffff' : '#3e2465'} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
