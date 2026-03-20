import React, { useState } from 'react';
import '../../Crud.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
export default function Crudform() {
  const [validated, setValidated] = useState(false);
  const [userdata, setUserdata] = useState({
    username: "",
    useremail: "",
    usermobile: "",
    userpassword:""
  });

  const handleChange = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value     
    });
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();    

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;           
    }
    try{
        await axios.post("http://localhost:9090/cruddata",userdata)
        alert("Data Sended successfully..!😊😊👌");
    }
    catch(err){
        if(err) throw err ;
        console.log("data not sent backend ",err)
    }
    // IF VALID
    setValidated(true);
    alert("Form Submitted Successfully!");
    console.log("DATA =>", userdata);
    setUserdata({username: "",useremail: "",usermobile: "",userpassword:""})
  };

  return (
    <section>
      <Container>
        <Row>
          <Col md={12}>
            <div className="crudform">
              <h1 className='fs-3 text-center p-2 m-2'>Crud Application</h1>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className='justify-content-center'>

                  {/* NAME */}
                  <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter your name"
                      name="username"
                      value={userdata.username}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* MOBILE */}
                  <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>User Mobile</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      placeholder="Enter mobile number"
                      name="usermobile"
                      value={userdata.usermobile}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter mobile number.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* EMAIL */}
                  <Form.Group as={Col} md="3" controlId="validationEmail">
                    <Form.Label>User Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text>@</InputGroup.Text>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        name="useremail"
                        value={userdata.useremail}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* EMAIL */}
                  <Form.Group as={Col} md="3" controlId="validationEmail">
                    <Form.Label>User Password</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text>@</InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Enter Password"
                        name="userpassword"
                        value={userdata.userpassword}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid password.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  {/* BUTTON */}
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Col md={3}></Col>
                  <Form.Group as={Col} md="3" className="d-flex justify-content-end align-items-center mt-4">
                    <Button type="submit">Add Data</Button>
                  </Form.Group>
                </Row>
              </Form>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
