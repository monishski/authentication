import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SignUp() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{"width": "100%", "height": "100vh"}}>
      <div className="shadow-sm p-4 mb-5 rounded-3 bg-white" style={{"width": "25%"}}>
        <h4>Sign up to <i className="text-success">deliciously</i> today</h4>
        <p>Join a growing community of food lovers</p>
        <Form method="POST" action="/api/auth/signup" autoComplete="off">
        
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password"/>
          </Form.Group>

          <div className="d-flex mt-3">
            <Button className="flex-grow-1" variant="outline-success">Join</Button>{' '}
          </div>

        </Form>


      </div>

    </div>
  )
}
