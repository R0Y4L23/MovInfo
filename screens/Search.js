import React,{useState,useContext, useEffect} from 'react'
import { Pressable, StyleSheet, Text, View,TextInput ,ActivityIndicator, ScrollView,Image} from 'react-native';
import {Context} from "../hooks/Context.js"
import Button from "../components/Button.js"
import { Dimensions } from 'react-native';
import {FontAwesome,MaterialIcons,Ionicons, Fontisto,Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const axios = require('axios');
const Search = ({history}) => {
    const [value,setValue,fav,setFav]=useContext(Context)
    const [toSearch,setToSearch]=useState(value)
    const [searchArr,setSearchArr]=useState({"Search":[{"Title":"test","Year":"test","imdbID":"test","Poster":"test"}],"Response":"test"})
    async function getUser() {
        try {
          const response = await axios.get(`http://www.omdbapi.com/?apikey=5c4b9c43&s=${value}`);
          setSearchArr(response.data)
        } catch (error) {
          console.error(error);
        }
      }
    const add=()=>{
        if(toSearch!="")
        {
            setValue(toSearch)
            setToSearch("")
        }
    }
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
          // saving error
        }
      }
    const addFav=(n,id,p)=>{
        let arr=fav;
        let f=0
        for(let i=0;i<fav.length;i++)
        {
            if(arr[i].id==id)
            {
                f=1;
                break;
            }
        }
        if(f==0)
        {
            arr.push({"name":n,"id":id,"img":p})
            setFav(arr)
            storeData(JSON.stringify(arr))
        }
    }
    useEffect(()=>{
        getUser()
    },[value])
    return (  
        <View style={{flex:1,backgroundColor:'#e1dddd'}}>
            <View style={styles.input}>
            <TextInput style={{fontSize:18,color:"grey"}} onChangeText={setToSearch} value={toSearch} placeholder="Enter Name of the Movie" placeholderTextColor="brown"/>
            <Pressable onPress={add} style={{marginTop:'1%'}}><FontAwesome name="search" size={40} color="black" /></Pressable>
            </View>
            {/*<Button onPress={add} title="Search" color="#841584" height={40} width={125} textColor="red" top={9}/>*/}
            {searchArr.Response=="test"&& <ActivityIndicator size="large" color="red" />}
            <View style={{height:"83%"}}>
            <ScrollView>
            {(searchArr.Response=="True")&&searchArr.Search.map((item,idx)=>{return (
               <View key={idx} style={{marginTop:40,backgroundColor:"white",height:200,flexDirection:"row",padding:10,marginLeft:"4%",marginRight:'4%'}}>
                   <View>
                     <Image source={item.Poster!="N/A"?{uri:`${item.Poster}`}:require("../assets/not_ava.jpg")} style={styles.tinyLogo}/>
                   </View>
                   <View style={{justifyContent:"space-around",alignItems:"center",marginLeft:"5%",backgroundColor:"white",height:150}}>
                    <Text style={{fontSize:20,textAlign:"center",maxWidth:160}}>{item.Title}</Text>
                    <Text style={{backgroundColor:"orange",color:"white",borderRadius:25,fontSize:15,width:150,paddingLeft:4,textAlign:"center"}}>Release Date : {item.Year}</Text>
                    <View style={{flexDirection:"row"}}>
                      <Button onPress={()=>{addFav(item.Title,item.imdbID,item.Poster)}} title={<Fontisto name="favorite" size={35} color="grey" />} color="white" height={50} width={50} textColor="red" top={6}/>
                      <Button onPress={()=>{history.push("/Search/Result",{"idd":item.imdbID})}} title={<Ionicons name="information-circle-outline" size={35} color="grey" />} color="white" height={50} width={50} textColor="red" top={6}/>
                    </View>
                   </View>
                </View>
                )})}
                {(searchArr.Response=="False")&&<Text style={{fontSize:50,marginLeft:"6%",marginTop:"15%"}}>No Search Results Available <Entypo name="emoji-sad" size={75} color="black" /></Text>}
            </ScrollView>
            </View>
            <View style={styles.footer}>
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",borderRightColor:"grey"}}>
                        <Pressable style={{backgroundColor:"grey",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}}><FontAwesome name="search" size={27} color="black" /></Pressable>
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Pressable style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}} onPress={()=>{history.push("/Search/Fav")}}><MaterialIcons name="favorite" size={27} color="black" /></Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor:"white",
     flexDirection:"row",
     justifyContent:"space-around",
     height:50,
     marginBottom:10
    },
    footer:{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height:50,
        width:windowWidth,
        backgroundColor:"#222222"
    },
    tinyLogo: {
       // marginTop:"10%",
        width: 145,
        height: "120%",
        bottom:30
       // marginLeft:5
      },
})
export default Search
