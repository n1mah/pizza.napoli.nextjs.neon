'use client';
import { useQuery } from "react-query";
import axios from "axios";
import {useEffect, useState} from "react";
import {json} from "stream/consumers";




type Product={
  id:number;
  name:string;
  username:string;
}
type CART={
    items:object,
    counter:number,
    total:number,
}


export default function  Home() {
  let Temp={
    items:{
      // "12":[12,"title1","200",1],
      // "10":[10,"title2","180",1]
    },
    counter:0,
    total:0,
  }
  const [pro,setPro]=useState<any>(null);
  const [init,setInit]=useState<any>(true);
  const [cartItems,setCartItems]=useState<any>(Temp);
  const [cartItemCount,setCartItemCount]=useState<any>(0);
  const [cartItemsSum,setCartItemsSum]=useState<any>(0);


    const setProductLocal=()=>{
        localStorage.setItem("cartItems",JSON.stringify(cartItems));
    }
    const getProductLocal=()=>{
        let a:any =localStorage.getItem("cartItems");
        let data:any=JSON.parse(a)
        console.log(a)
        return (data);
    }

    useEffect(()=> {
        // alert(getProductLocal())
        if (init) {
            fetchProducts();
            setInit(false);
        }

        let g=getProductLocal();
        console.dir(g)
        setCartItems(getProductLocal());
    },[]);

    useEffect(()=>{
        cartItems
    },[cartItems]);

  const plusProduct=(product:any)=>{
    // if (!cartItems.items)
      if (cartItems && cartItems.items && cartItems.items.hasOwnProperty(product.id)){
        setCartItems((prev:any)=>(
            {
              ...prev,
              items: {
                ...prev["items"],
                [product.id]:[product.id,product.name,product.price,prev["items"][product.id][3]+1],
              }
            }))
      }else {
        setCartItems((prev:any)=>(
            {
              ...prev,
              items: {
                ...prev["items"],
                [product.id]:[product.id,product.name,product.price,1],
              }
            }))
      }

    setCartItemCount((prev:any)=>{
      return prev + 1;
    })

  }

    const CountProduct=(product:any)=> {
        if (cartItems && cartItems.items && cartItems.items.hasOwnProperty(product.id))
            return cartItems.items[product.id][3];
        return 0;
    }

  const minisProduct=(product:any)=>{
      if (cartItems.items.hasOwnProperty(product.id)){
          let count = CountProduct(product);
          if (count==1){
              // alert(1);
              // alert(2);

              delete cartItems.items[product.id];
              let items=cartItems.items;
              // let items=  Object.keys(cartItems.items).filter((k:any)=>{
              //     alert(k!=product.id)
              //     return k!=product.id;
              //      // return
              // })
              // alert(items.toString())
              // cartItems.items.filter((v:any,k:any)=>{
              // })
              setCartItems((prev:any)=>(
                  {
                      ...prev,
                      items: {
                          ...items
                      }
                  }))
          }else if (count>1){
              setCartItems((prev:any)=>(
                  {
                      ...prev,
                      items: {
                          ...prev["items"],
                          [product.id]:[product.id,product.name,product.price,count-1],
                      }
                  }))
          }

      }

  }

  const showProduct=()=>{

  }


  const fetchProducts = async () => {
    const result = await axios.get("http://localhost:3000/api/products");
    setPro(result.data)
    // console.log(result.data)
    // console.log(result.data.rows[0].id)
  };

  // let products=fetchProducts();




  return (
    <main className='max-w-sm mx-auto bg-pink-700'>
      <h1 className='text-center font-bold text-5xl'>Pizza Napoli</h1>
      <h2 className='text-center font-bold text-3xl'>Menu</h2>
      <button onClick={plusProduct}>Btn</button>
      <div className='flex flex-col'>
      {pro && pro.rows &&
          pro.rows.map((value:any,key:number)=>(
              <div key={key} className='flex flex-col bg-blue-600 w-10/12 mx-auto my-5 p-1'>
                <h3>{value.name}</h3>
                <span>{value.price}</span>
                <div className='flex justify-center items-center'>
                  <div className='flex justify-center items-center'>
                    {/*<button className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>x</button>*/}
                    <button onClick={()=>{minisProduct(value)}} className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>-</button>
                    <span className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white mx-2 rounded-full'>{CountProduct(value)}</span>
                    <button onClick={()=>{plusProduct(value)}} className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>+</button>
                  </div>
                  <h3 className='mx-2'>تعداد</h3>

                </div>
              </div>
          ))
      }
          {/*{cartItems && Object.keys(cartItems.items).map((key:any)=>(*/}
          {/*        <div key={key} className='flex flex-col bg-blue-600 mt-2 py-2 w-10/12 mx-auto my-5 p-1'>*/}

          {/*          <h3>{cartItems.items[key][1]}</h3>*/}
          {/*          <h3>{cartItems.items[key][3]}</h3>*/}
          {/*          /!*<span>{value[1]}</span>*!/*/}

          {/*          /!*<span>{value[2]}</span>*!/*/}
          {/*          /!*<span>{value[3]}</span>*!/*/}
          {/*          /!*<div className='flex justify-center items-center'>*!/*/}
          {/*          /!*  <div className='flex justify-center items-center'>*!/*/}
          {/*          /!*    /!*<button className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>x</button>*!/*!/*/}
          {/*          /!*    <button onClick={()=>{minisProduct(value)}} className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>-</button>*!/*/}
          {/*          /!*    <span className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white mx-2 rounded-full'>{CountProduct(value)}</span>*!/*/}
          {/*          /!*    <button onClick={()=>{plusProduct(value)}} className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>+</button>*!/*/}
          {/*          /!*  </div>*!/*/}
          {/*          /!*  <h3 className='mx-2'>تعداد</h3>*!/*/}
          {/*          /!*</div>*!/*/}

          {/*        </div>*/}
          {/*    ))*/}
          {/*}*/}

      </div>
    </main>
  )
}
