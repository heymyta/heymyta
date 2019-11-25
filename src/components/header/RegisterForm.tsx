import React, { useState } from 'react';
// import { Overlay } from 'react-bootstrap';

// export const registerForm = (
//   <Card>yada</Card>
// );

const REGISTER_ENDPOINT = `${process.env.REACT_APP_SERVER_API_ENDPOINT}/api/teacher/register`
 
function RegisterForm() {

  // function handleSubmit(event: Event) {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   event.preventDefault();
  //   fetch(REGISTER_ENDPOINT, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify({'username': email, 'password': password})
  //   })
  //   .then((result) => result)
  // }

  return (
    <div>yada</div>
  );
}

export default RegisterForm;