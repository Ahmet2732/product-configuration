import axios from "axios";
import { createContext } from "react";



export let cartContext=createContext();
let userToken=localStorage.getItem("userToken")
// console.log("ahemd",userToken);
console.log("ahmed");

let headers ={
    token:userToken
    
    
}


export function addtoCart(id){
alert(userToken);
    
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        ProductId:id
    },{headers

    }).then((respose)=>respose)
    .catch((error)=>error)


}

export default function CartContextProvider(props){
    return <cartContext.Provider value={{addtoCart}}> 
        {props.children}
    </cartContext.Provider>

}