import axios from 'axios'
import React, { useState ,useEffect} from 'react'

export default function Samplecrudmongo() {
    const mySec = {
       padding: "75px 60px",
        backgroundColor: "aliceblue",
        color: "#000",
        display: "flex",           
        justifyContent: "center",
        alignItems: "center"
    }

    const mysecmongocrud ={
        padding: "20px",
        margin: "10px",
        backgroundColor: "#e0dede",
        borderRadius: "5px"
    }

    const myform={
        padding: "20px",
        margin: "10px 5px",
        backgroundColor: "#fff",
        borderRadius: "5px"
    }

    const myinputs={
        padding: "10px",
        margin: "5px 0",
        textAlign:"left"
    }
    const myinput={
        padding: '8px 5px',
        outline: "none",
        border: "1px solid black",
        borderRadius: "2px",
        width:"100%"
    }
    const myinputerror={
        color:"red",
        fontSize:"13px",
        padding:"5px 0"
    }
    const  mybtn={
        padding: "10px 30px",
        margin:"5px 0",
        border:"none",
        borderRadius: "5px",
        backgroundColor:"aliceblue",
        fontWeight:"700"
    }

    const mytable ={
        padding:"20px 10px",
        margin:"10px 5px",
        backgroundColor:"aliceblue"
    }

    const myeditbtn ={
        backgroundColor: "skyblue",
        border: "none",
        borderRadius: "2px",
        padding:"5px",
        margin:"3px",
        color: "#fff"
    }
    const mydeletebtn ={
        backgroundColor: "red",
        border: "none",
        borderRadius: "2px",
        padding:"5px",
        margin:"3px",
        color: "#fff"
    }


    const [loginData, setLogindata] = useState({lname:"",lemail:"",lmobile:""});
    const [err,setErr] =useState("");

    const handleChange =(ldata)=>{
        setLogindata({
                ...loginData,
            [ldata.target.name]:ldata.target.value
            })
    };

    async function handleSubmit(ldata){
        ldata.preventDefault();

        if(!loginData.lname||!loginData.lemail||!loginData.lmobile){
            setErr("Please fill the Correct data");
            return;
        }
        try{
            await axios.post("http://localhost:4000/adduser",loginData);
            alert("Data saved in Db...");
            console.log(loginData);
            setLogindata({lname:"",lemail:"",lmobile:""});
            setErr("")
        }
        catch(err){
            if(err){
            console.error(err);
            alert("Data not sended in db")}
        }

    }

    const [glogindata,setGlogindata] = useState([]);

    const getLogindata =async()=>{
        try{
            const gdata = await axios.get("http://localhost:4000/glogindata")
            setGlogindata(gdata.data);
            console.log(gdata.data);
        }
        catch(err){
            if(err){
                console.error(err);
                console.log("Data not Foud in db")
            }
        }
    };

    useEffect(()=>{
       setTimeout(()=>{
             getLogindata();
       },4000)
    },[])





  return (
    <section style={mySec}>
        <div className="mongocrud" style={mysecmongocrud}>
            <h2>Mongo Db Crud App</h2>
            <form style={myform} onSubmit={handleSubmit}>
                <div style={myinputs}>
                    <label htmlFor="login">Login User Name</label>
                    <input type="text" style={myinput} name="lname"  placeholder='Enter your login Name' value={loginData.lname} onChange={handleChange} />
                    {err && <p style={myinputerror}> {err}</p>}
                </div>
                <div style={myinputs}>
                    <label htmlFor="login">Login User Email</label>
                    <input type="email" style={myinput} name="lemail"  placeholder='Enter your login Email' value={loginData.lemail} onChange={handleChange} />
                    {err && <p style={myinputerror}> {err}</p>}
                </div>
                <div style={myinputs}>
                    <label htmlFor="login">Login User Mobile</label>
                    <input type="tel" style={myinput} name="lmobile"  placeholder='Enter your login  Mobile' value={loginData.lmobile} onChange={handleChange} />
                    {err && <p style={myinputerror}> {err}</p>}
                </div>
                <div style={myinputs}>
                    <button type='submit' style={mybtn}>Add Login User</button>
                </div>
            </form>


            <div className="monggdata" style={mytable}>
                    <table>
                        <thead>
                            <tr>
                                <th>user Number</th>
                                <th>user Name</th>
                                <th>user Email</th>
                                <th>user Mobile</th>
                                <th colSpan={2}>user Action</th>
                             </tr>
                        </thead>
                        <tbody>
                            {glogindata.length > 0 ? (
                                 glogindata.map((gdata,index)=> {return(
                                    <tr key={gdata._id}>
                                        <td> {index + 1} </td>
                                        <td> {gdata.lname} </td>
                                        <td> {gdata.lemail} </td>
                                        <td> {gdata.lmobile} </td>
                                        <td ><button style={myeditbtn }>  Edit User  </button></td>
                                        <td > <button style={mydeletebtn}> Delete User</button> </td>
                                    </tr>
                                 )})
                               ) : (
                                <tr> <td colSpan={6}> Data not found</td> </tr>
                               )}
                        </tbody>
                        
                    </table>
            </div>

        </div>
    </section>
  )
}
