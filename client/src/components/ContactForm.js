import React from 'react';
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

function ContactForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
    async function sendMessage() {
      // Sending data to db/API
      const sendBody = {
        name: data.name,
        email: data.email,
        content: data.content
      };

      try {
        const res = await fetch('/api/message/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendBody)
        });
        console.log(res);

        const button = document.getElementById('submit');
        button.value = '✓';
        button.disabled = true;
        button.cursor = 'default';
      } catch (err) {
        console.log(err);
        return;
      }
    }

    sendMessage()
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        type='text'
        name='name'
        ref={register({ required: 'Name Required!' })}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <label>Email</label>
      <input
        type='text'
        name='email'
        ref={register({ required: 'Email Required!' })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <label>Message</label>
      <textarea
        type='text'
        name='content'
        ref={register({ required: 'Enter a message!' })}
      />
      {errors.content && <p>{errors.content.message}</p>}
      <Submit id='submit' type='submit' value='SUBMIT' />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  max-width: 500px;

  p {
    color: red;
  }

  input {
    margin-bottom: 10px;
  }

  textarea {
    height: 100px;
  }
`;

const Submit = styled.input`
  margin: 10px 0;
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 25px;
  font-size: 20px;
  height: 33px;
  cursor: pointer;
  transition: all 300ms;

  :hover, :focus{
    background: #fff;
    color: #000;
    outline: 0;
  }
`;

export default ContactForm;
