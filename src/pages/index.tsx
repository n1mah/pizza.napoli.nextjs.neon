'use client';
import { useQuery } from "react-query";
import axios from "axios";
import {useState} from "react";




type Product={
  id:number;
  name:string;
  username:string;
}
export default function  Home() {
  const [pro,setPro]=useState<any>(null);
  const [init,setInit]=useState<any>(true);
  const fetchProducts = async () => {
    const result = await axios.get("http://localhost:3000/api/products");
    setPro(result.data)
    console.log(result.data)
    console.log(result.data.rows[0].id)
  };
  if (init) {
    fetchProducts();
    setInit(false);
  }
  // let products=fetchProducts();
  (pro && console.log(pro));
  return (
    <main className='max-w-sm mx-auto bg-pink-700'>
      <h1 className='text-center font-bold text-5xl'>Pizza Napoli</h1>
      <h2 className='text-center font-bold text-3xl'>Menu</h2>
      <div className='flex flex-col'>
      {pro && pro.rows &&
          pro.rows.map((value:any,key:number)=>(
              <div key={key} className='flex flex-col bg-blue-600 w-10/12 mx-auto'>
                <h3>{value.name}</h3>
                <span>{value.price}</span>
                <div className='flex justify-center items-center'>
                  <div className='flex justify-center items-center'>
                    {/*<button className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>x</button>*/}
                    <button className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>-</button>
                    <span className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white mx-2 rounded-full'>0</span>
                    <button className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>+</button>
                  </div>
                  <h3 className='mx-2'>تعداد</h3>

                </div>
              </div>
          ))
      }

      </div>
    </main>
  )
}
