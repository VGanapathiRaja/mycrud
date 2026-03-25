import { useState, useEffect } from "react";
import axios from "axios";

const Crudform1 = () => {

    const myContainer = {
        padding: "20px",
        borderRadius: "5px",
    };

    const myfeilds = {
        padding: "10px 30px",
        margin: "5px",
        textAlign: "left"
    };

    const myinput = {
        padding: "10px",
        width: "100%",
        marginLeft: "-15px",
        outline: "none"
    };

    const mybtn = {
        width: "100%",
        padding: "10px",
        margin: "5px 5px"
    };

    // ✅ FORM STATE
    const [cdata, setCdata] = useState({
        uname: "",
        uemail: "",
        umobile: ""
    });

    // ✅ EDIT STATE
    const [edit, setEdit] = useState(null);

    // ✅ TABLE DATA
    const [userdata, setUserdata] = useState([]);

    // 🔥 HANDLE INPUT
    const handleChange = (e) => {
        setCdata({
            ...cdata,
            [e.target.name]: e.target.value
        });
    };

    // 🔥 ADD + UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cdata.uname || !cdata.uemail || !cdata.umobile) {
            return alert("Please fill all fields");
        }

        try {
            if (edit) {
                // UPDATE
                await axios.put(`http://localhost:5000/updateuserdata/${edit}`, cdata);
                alert("User Updated");
            } else {
                // CREATE
                await axios.post("http://localhost:5000/adduser", cdata);
                alert("User Added");
            }

            // RESET FORM
            setCdata({ uname: "", uemail: "", umobile: "" });
            setEdit(null);

            // REFRESH DATA
            fetchUserdata();

        } catch (err) {
            console.log(err);
        }
    };

    // 🔥 FETCH USERS
    const fetchUserdata = async () => {
        try {
            const res = await axios.get("http://localhost:5000/getusers");
            setUserdata(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserdata();
    }, []);

    // 🔥 EDIT USER (PREFILL)
    const handleEdit = (user) => {
        setCdata({
            uname: user.uname,
            uemail: user.uemail,
            umobile: user.umobile
        });
        setEdit(user._id);
    };

    // 🔥 DELETE USER
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await axios.delete(`http://localhost:5000/deleteuser/${id}`);

            // update UI instantly
            setUserdata(userdata.filter((u) => u._id !== id));

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container" style={myContainer}>

            {/* FORM */}
            <div className="myform">
                <h2>CRUD Form</h2>

                <form onSubmit={handleSubmit}>

                    <div style={myfeilds}>
                        <input
                            type="text"
                            name="uname"
                            placeholder="Enter your Name"
                            style={myinput}
                            value={cdata.uname}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={myfeilds}>
                        <input
                            type="email"
                            name="uemail"
                            placeholder="Enter your Email"
                            style={myinput}
                            value={cdata.uemail}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={myfeilds}>
                        <input
                            type="tel"
                            name="umobile"
                            placeholder="Enter your Mobile"
                            style={myinput}
                            value={cdata.umobile}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={myfeilds}>
                        <button type="submit" style={mybtn}>
                            {edit ? "Update User" : "Add User"}
                        </button>
                    </div>

                </form>
            </div>

            {/* TABLE */}
            <div style={{ marginTop: "30px" }}>
                <h2>User Data</h2>

                <table border="1" width="100%" cellPadding="10">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userdata.length > 0 ? (
                            userdata.map((u, index) => (
                                <tr key={u._id}>
                                    <td>{index + 1}</td>
                                    <td>{u.uname}</td>
                                    <td>{u.uemail}</td>
                                    <td>{u.umobile}</td>

                                    <td>
                                        <button onClick={() => handleEdit(u)}>
                                            Edit
                                        </button>
                                    </td>

                                    <td>
                                        <button onClick={() => handleDelete(u._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No Data Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Crudform1;