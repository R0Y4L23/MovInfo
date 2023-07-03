import React,{useState,createContext, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Context=createContext();
export const ContextProvider = (props) => {
    const [search,setSearch]=useState("")
    const [fav,setFav]=useState([]) 
const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        setFav(JSON.parse(value))
      }
      else
      {
        setFav([])
      }
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(()=>{
    getData()
  },[fav])
  
  
    return (
        <Context.Provider value={[search,setSearch,fav,setFav]}>
            {props.children}
        </Context.Provider>
    )
}

