import React,{useContext} from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View,Image} from 'react-native';
import {Context} from "../hooks/Context.js"
import Button from "../components/Button.js"
import { Dimensions } from 'react-native';
import {FontAwesome,MaterialIcons,Ionicons, Fontisto,Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const Favourite = ({history}) => {
    const [value,setValue,fav,setFav]=useContext(Context)
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
          // saving error
        }
      }
    const remove=(id)=>{
        let a=fav
        let b=[]
        for(let i=0;i<fav.length;i++)
        {
            if(a[i].id!=id)
            {
                b.push(a[i])
            }
        }
        setFav(b)
        storeData(JSON.stringify(b))
    }
    return (
        <View style={{flex:1,backgroundColor:'#e1dddd'}}>
            <Text style={{fontSize:30,textAlign:"center"}}>Favourites Screen</Text>
            {fav.length==0&&<Text style={{fontSize:50,marginLeft:"6%",marginTop:"15%",textAlign:"center"}}>No Favourites <Entypo name="emoji-sad" size={75} color="black" /></Text>}
            <View style={{height:"86%"}}>
            <ScrollView>
            {fav.length!=0&&fav.map((item,idx)=>{return (
            <View key={idx} style={{marginTop:40,backgroundColor:"white",height:200,flexDirection:"row",padding:10,marginLeft:"4%",marginRight:'4%'}}>
            <View>
              <Image source={item.img!="N/A"?{uri:`${item.img}`}:require("../assets/not_ava.jpg")} style={styles.tinyLogo}/>
            </View>
            <View style={{justifyContent:"space-around",alignItems:"center",marginLeft:"5%",backgroundColor:"white",height:150}}>
             <Text style={{fontSize:20,textAlign:"center",maxWidth:160}}>{item.name}</Text>
             <View style={{flexDirection:"row"}}>
               <Button onPress={()=>{remove(item.id)}} title={<FontAwesome name="remove" size={35} color="grey" />} color="white" height={50} width={50} textColor="red" top={6}/>
               <Button onPress={()=>{history.push("/Search/Result",{"idd":item.id})}} title={<Ionicons name="information-circle-outline" size={35} color="grey" />} color="white" height={50} width={50} textColor="red" top={6}/>
             </View>
            </View>
         </View>)})}
            </ScrollView>
            </View>
            <View style={styles.footer}>
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",borderRightColor:"grey"}}>
                        <Pressable onPress={()=>{history.push("/Search")}} style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}}><FontAwesome name="search" size={27} color="black" /></Pressable>
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Pressable style={{backgroundColor:"grey",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}}><MaterialIcons name="favorite" size={27} color="black" /></Pressable>
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
        // marginTop:"10%",
         width: 145,
         height: "120%",
         bottom:30
        // marginLeft:5
       },
})
export default Favourite
