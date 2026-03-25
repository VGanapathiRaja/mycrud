import { useState,useEffect } from "react";
import axios from 'axios'
const Crudform = () => {
    const myContainer = {
        // backgroundColor: "#f4f4f4",
        color: "#000",
        padding: "20px",
        borderRadius: "5px",
    };

    const myfeilds = {
        backgroundColor: "#dbdbdb05",
        padding: "10px 30px",
        margin:"5px",
        textAlign: "left"
    }

    const myinput ={
        padding: "10px",
        width: "100%",
        marginLeft:"-15px",
        outline:"none"
    }
    const mybtn ={
        width: "100%",
        padding:"10px",
        margin:"5px 5px"
    }


    const [cdata,setCdata] = useState({uname:"",uemail:"",umobile:""});

     const [edit,setEdit] = useState(null);

    function handleChange(pd){
        setCdata({...cdata, [pd.target.name]:pd.target.value});
    };
    
    const handleSubmit = async (pd) =>{
        pd.preventDefault();
        try{
            await axios.post("http://localhost:5000/adduser",cdata)
            alert("Data sended db");
        }
        catch(err){
            console.log("Data not sended",err);
            alert("Data not not going backend and database ")
        }


        if(!cdata.uname || !cdata.uemail || !cdata.umobile){
        alert("please Fill user Datas...");
        }
        else{
            console.log(cdata);
            alert("Data printed in Console");
            setCdata({uname:"",uemail:"",umobile:""})
        }

        if(edit){
            await axios.put(`http://localhost:5000/updateuserdata/${edit}`,cdata)
        }
        else{
            setCdata({uname:"",uemail:"",umobile:""})
            setEdit(null);
            fetchUserdata();
        }

    };

    const handleEditudata =(udata)=>{
        setCdata({
            uname: udata.uname,
            uemail: udata.uemail,
            umobile: udata.umobile
        });
        setEdit(udata._id);
    }




    const [getData, setUserdata] = useState([]);
    
    // useEffect(()=>{
    //     fetch("http://localhost:5000/getusers")
    //     .then((res)=>res.json())
    //     .then((d)=>{
    //         console.log(d); 
    //         setUserdata(d);
    //     })
    //     .catch((err)=>{console.log("data not getting",err)})
    // },[])
    

    const fetchUserdata = async() =>{
        // try{
        //     fetch("http://localhost:5000/getusers",getData)
        //     .then((res)=>res.json())
        //     .then((d)=>{
        //         console.log(d); 
        //         setUserdata(d);
        //     })
        //     .catch((err)=>{console.log("data not getting",err)})
        // }
        // catch(err){
        //     if(err){
        //         console.log("Data not getting backend",err);
        //     }
        // }

        // or 

        try{
            await axios.get("http://localhost:5000/getusers")
            .then((res)=>{
                console.log(res.data);
                setUserdata(res.data)
            })
        }
        catch(err){
              if(err){
                console.log("Data not getting backend",err);
            }
        }
    };

    useEffect(()=>{
        fetchUserdata();
    },[])

   
    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");

    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:5000/deleteuser/${id}`);
        setUserdata(userdata.filter((u) => u._id !== id));
    } catch (err) {
        console.log(err);
    }
};
    

    return (
        <div className="container" style={myContainer}>
                <div className="myform">
                     <h2>CRUD Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="inputs" style={myfeilds}>
                            <input type="text" name="uname"  style={myinput}  placeholder="Enter your Name" onChange={handleChange} value={cdata.uname}/>
                        </div>
                        <div className="inputs" style={myfeilds}>
                            <input type="email" name="uemail"  style={myinput} placeholder="Enter your Email"  onChange={handleChange} value={cdata.uemail}/>
                        </div>
                        <div className="inputs" style={myfeilds}>
                            <input type="tel" name="umobile"  style={myinput} placeholder="Enter your Mobile"  onChange={handleChange} value={cdata.umobile}/>
                        </div>
                        <div className="inputs" style={myfeilds}>
                            <button type="submit" style={mybtn} > {edit ? "Add user": "Edit User"} </button>
                        </div>
                    </form>   
                 </div>

                    

                <div className="formdata" style={myContainer}>
                        <h2>User data from BAckend or database</h2>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>U.No</th>
                                    <th>U.Name</th>
                                    <th>U.Email</th>
                                    <th>U.Mobile</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {getData.map((u, index) => (
                                    <tr key={u._id}>
                                        <td>{index + 1}</td>
                                        <td>{u.uname}</td>
                                        <td>{u.uemail}</td>
                                        <td>{u.umobile}</td>

                                        <td>
                                            <button onClick={() => handleEditudata(u)}>Edit</button>
                                        </td>

                                        <td>
                                            <button onClick={() => handleDelete(u._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
        </div>
    );
};

export default Crudform;