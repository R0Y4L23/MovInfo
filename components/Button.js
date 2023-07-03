import React from 'react'
import {Text, TouchableOpacity} from "react-native";
const Button = ({onPress,height,width,title,color,textColor,top}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{height:height,width:width,backgroundColor:color,borderRadius:25}}>
            <Text style={{color:textColor,alignSelf:"center",marginTop:top}}>{title}</Text>
        </TouchableOpacity>
    )
}
export default Button
