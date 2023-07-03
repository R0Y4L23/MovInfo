import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View,ActivityIndicator,Image, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { FontAwesome,MaterialIcons,AntDesign } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const axios = require('axios');
const Result = ({history,location}) => {
    const [imdb,setImdb]=useState(location.state.idd)
    const [mdata,setMdata]=useState({"Title":"test","Released":"test","Plot":"test","Rated": "test",
    "Runtime": "test",
    "Genre": "test",
    "Director": "test",
    "Writer": "test",
    "Actors": "test",
    "Language": "test",
    "Country": "test",
    "Poster": "test",
    "imdbRating": "test",
    "BoxOffice": "test"})
    const [starR,setStarR]=useState([1,1,1,1,1])
    async function getUser() {
        try {
          const response = await axios.get(`http://www.omdbapi.com/?apikey=5c4b9c43&i=${imdb}`);
          //console.log(response);
          setMdata(response.data)
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(()=>{
          getUser()
      },[imdb])
    return (
        <View style={{flex:1,backgroundColor:'#e1dddd'}}>
            
            {mdata.Title=="test"&&<ActivityIndicator size="large" color="red" />}
            {mdata.Title!="test"&&(<View style={{left:"10%",top:'5%',width:"85%",height:"87%"}}>
                <ScrollView>
                <Image source={mdata.Poster!="N/A"?{uri:`${mdata.Poster}`}:require("../assets/not_ava.jpg")} style={styles.tinyLogo}/>
                <View style={{flexDirection:"row",marginTop:20}}>
                <Text style={{fontSize:22,flex:3}}>{mdata.Title}({mdata.Released})</Text>
                <Text style={{flex:1,backgroundColor:"orange",color:"white",borderRadius:25,height:"30%",textAlign:"center",marginTop:"10%",marginBottom:"5%"}}>{mdata.Runtime}</Text>
                </View>
                <Text style={{marginTop:10,color:"grey"}}>{mdata.Genre}{"\n"}Rating : {mdata.Rated}</Text>
                <View style={{flexDirection:"row",marginTop:10}}>

                    {starR.map((n,i)=>{return (i<=(Math.floor((parseInt(mdata.imdbRating)/2))-1)? <AntDesign name="star" size={35} color="orange" key={i} />: <AntDesign name="staro" size={35} color="orange" key={i}/>)})}      
                <Text style={{fontSize:35,color:"orange",marginLeft:20,bottom:8}}>{mdata.imdbRating}</Text>
                <Text style={{color:"grey",marginTop:10}}>/10</Text>
                </View>
                <Text style={{color:"grey",marginTop:10,fontSize:15,marginBottom:10}}>{mdata.Plot}</Text>
               
                <Text>Director : {mdata.Director}</Text>
                <Text>Actors : {mdata.Actors}</Text>
                <Text>Box Office : {mdata.BoxOffice}</Text>
                </ScrollView>
            </View>)}
            <View style={styles.footer}>
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",borderRightColor:"grey"}}>
                        <Pressable style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}} onPress={()=>{history.push("/Search")}}><FontAwesome name="search" size={27} color="black" /></Pressable>
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
  footer:{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height:50,
      width:windowWidth,
      backgroundColor:"#222222"
  },
  tinyLogo: {
     width: 145,
     height: 185
   },
})
export default Result
