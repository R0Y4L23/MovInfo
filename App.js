import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home.js"
import Search from "./screens/Search.js"
import Fav from "./screens/Favourite.js"
import Result from "./screens/Result.js"
import { NativeRouter, Switch, Route } from "react-router-native";
import {ContextProvider} from "./hooks/Context.js"
export default function App() {
  return (
    <View style={styles.droidSafeArea}>
      <ContextProvider>
      <NativeRouter>
        <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/Search" component={Search} />
         <Route exact path="/Search/Fav" component={Fav} />
         <Route exact path="/Search/Result" component={Result} />
        </Switch>
      </NativeRouter>
      </ContextProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
}
});
