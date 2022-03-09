/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import MainNavigation from "./src/Navigation/Mainnavigation";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/Redux/RootReducer";

const App = () => {
  const store = createStore(rootReducer)

  return (
    // <View style={{ height: "100%" }}
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <MainNavigation />
        </Provider>
      </SafeAreaView>
  );
  //}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  }
});

export default App;
