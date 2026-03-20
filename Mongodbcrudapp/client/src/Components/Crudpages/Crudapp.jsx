import React from 'react'
import '../../Crud.css';
import { useState,useEffect } from 'react';
import axios from "axios";
function Crudapp() {
  const [cruddata,setCurddata] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:9090/cdata")
    .then((res)=>res.json())
    .then((d)=>{
      console.log(d);
      setCurddata(d);
    })
    .catch((e)=>{
      console.log(e);
    });
  },[])


  return (
    <div>
      <h2>Curd Datas</h2>
      <ul>
        {
          cruddata.map((cdatas)=>
            <li key={cdatas._id} className='LISTS'> {cdatas.username} </li>
         )
        }
      </ul>
    </div>
  )
}

export default Crudapp