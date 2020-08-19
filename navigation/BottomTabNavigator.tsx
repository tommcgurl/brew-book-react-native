import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AllBrewsScreen from "../screens/AllBrewsScreen";
import AddBrewScreen from "../screens/AddBrewScreen";
import BreweriesScreen from "../screens/BreweriesScreen";
import StylesScreen from "../screens/StylesScreen";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabThreeParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tabIconSelected,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        style: {
          backgroundColor: Colors[colorScheme].brandOrange,
        },
      }}
    >
      <BottomTab.Screen
        name="Brews"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="beer" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Breweries"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="factory" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Styles"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="invert-colors" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add Brew"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-circle" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="AllBrewsScreen"
        component={AllBrewsScreen}
        options={{
          headerTitle: "My Brews",
          headerStyle: {
            backgroundColor: "#FAD571",
          },
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="AddBrewScreen"
        component={AddBrewScreen}
        options={{
          headerTitle: "Add Brew",
          headerStyle: {
            backgroundColor: "#FAD571",
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="BreweriesScreen"
        component={BreweriesScreen}
        options={{
          headerTitle: "My Breweries",
          headerStyle: {
            backgroundColor: "#FAD571",
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabThreeParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="StylesScreen"
        component={StylesScreen}
        options={{
          headerTitle: "My Styles",
          headerStyle: {
            backgroundColor: "#FAD571",
          },
        }}
      />
    </TabFourStack.Navigator>
  );
}
