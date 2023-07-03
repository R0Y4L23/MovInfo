import React,{useState,useContext} from 'react'
import { StyleSheet,TextInput,ImageBackground,Text } from 'react-native';
import Button from "../components/Button.js"
import {Context} from "../hooks/Context.js"
import { MaterialCommunityIcons} from '@expo/vector-icons';
const Home = ({history}) => {
    const [value,setValue,fav,setFav]=useContext(Context)
    const [text, onChangeText] = useState(value);
    const goToSearch=()=>{
        if(text!="")
        {
            setValue(text)
            history.push("/Search")
        }
    }
    return (
            <ImageBackground source={require("../assets/home_s_back.jpg")} style={styles.image}>
               <MaterialCommunityIcons name="movie-filter-outline" size={250} color="#FFD700" />
               <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Enter Name of the Movie" placeholderTextColor="brown"/>
               <Button onPress={goToSearch} title="Go to Search" color="#841584" height={40} width={125} textColor="red" top={9}/>
            </ImageBackground>
    )
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      borderWidth: 1,
      color:"brown",
      borderColor:"#FFD700",
      width:300,
      borderRadius:25,
      paddingLeft:20,
      backgroundColor:"#FFD700",
      marginBottom:"9%"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems:"center",
        paddingBottom:"30%"
      },
})
export default Home
