import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, Typography, Spacing } from '../theme';
import HomeScreen     from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import BookScreen     from '../screens/BookScreen';
import BarbersScreen  from '../screens/BarbersScreen';
import GalleryScreen  from '../screens/GalleryScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();
const isWeb = Platform.OS === 'web';

const TABS = [
  { name: 'Home',     icon: '⌂', label: 'Home'    },
  { name: 'Services', icon: '✦', label: 'Services' },
  { name: 'Book',     icon: '◎', label: 'Book',  accent: true },
  { name: 'Gallery',  icon: '▣', label: 'Gallery'  },
  { name: 'Barbers',  icon: '◈', label: 'Team'     },
];

function CustomTabBar({ state, navigation }: any) {
  return (
    <View style={styles.tabBarOuter}>
      <View style={styles.tabBar}>
        <View style={styles.tabGoldLine} />
        {state.routes.map((route: any, idx: number) => {
          const isFocused = state.index === idx;
          const tab = TABS[idx];
          const isAccent = tab?.accent;
          return (
            <TouchableOpacity key={route.key} onPress={() => { if (!isFocused) navigation.navigate(route.name); }} activeOpacity={0.7}
              style={[styles.tabItem, isAccent && styles.tabItemAccent]}>
              {isFocused && !isAccent && <View style={styles.tabActiveIndicator} />}
              <Text style={[styles.tabIcon, isFocused && styles.tabIconActive, isAccent && styles.tabIconAccent, isFocused && isAccent && styles.tabIconAccentActive]}>{tab?.icon}</Text>
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive, isAccent && styles.tabLabelAccent]}>{tab?.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function AppHeader({ navigation }: any) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTopLine} />
      <View style={styles.headerSide} />
      <TouchableOpacity style={styles.headerCenter} onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
        <Text style={styles.headerLogo}>OBSIDIAN</Text>
        <Text style={styles.headerSub}>BARBERSHOP · ATL</Text>
      </TouchableOpacity>
      <View style={styles.headerSide} />
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ navigation }) => ({ header: () => <AppHeader navigation={navigation} /> })}>
      <Tab.Screen name="Home"     component={HomeScreen}     />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Book"     component={BookScreen}     />
      <Tab.Screen name="Gallery"  component={GalleryScreen}  />
      <Tab.Screen name="Barbers"  component={BarbersScreen}  />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header:        { backgroundColor: Colors.charcoal, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: Platform.OS === 'ios' ? 52 : Platform.OS === 'android' ? 36 : 16, paddingBottom: 14, paddingHorizontal: Spacing.lg, position: 'relative' },
  headerTopLine: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: Colors.gold },
  headerSide:    { width: 44 },
  headerCenter:  { alignItems: 'center' },
  headerLogo:    { fontFamily: Typography.fontDisplayB, fontSize: 17, letterSpacing: 7, color: Colors.ivory },
  headerSub:     { fontFamily: Typography.fontMono, fontSize: 8, letterSpacing: 5, color: Colors.gold, marginTop: 3 },
  tabBarOuter:   { backgroundColor: Colors.charcoal, alignItems: 'stretch' },
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.charcoal,
    paddingBottom: Platform.OS === 'ios' ? 26 : 8, paddingTop: 8,
    maxWidth: isWeb ? 640 : undefined, alignSelf: isWeb ? 'center' : undefined,
    width: isWeb ? '100%' : undefined, position: 'relative',
  },
  tabGoldLine:         { position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: Colors.borderGold },
  tabItem:             { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4, position: 'relative' },
  tabItemAccent:       { borderTopWidth: 2, borderTopColor: Colors.gold, marginTop: -2 },
  tabActiveIndicator:  { position: 'absolute', top: -1, width: 28, height: 2, backgroundColor: Colors.gold },
  tabIcon:             { fontSize: 15, color: Colors.textDim, marginBottom: 3 },
  tabIconActive:       { color: Colors.gold },
  tabIconAccent:       { fontSize: 17, color: Colors.goldMid },
  tabIconAccentActive: { color: Colors.gold },
  tabLabel:            { fontFamily: Typography.fontMono, fontSize: 8, letterSpacing: 1, color: Colors.textDim },
  tabLabelActive:      { color: Colors.gold },
  tabLabelAccent:      { color: Colors.goldMid },
});
