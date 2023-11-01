import React from 'react'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Logo from "../components/Logo"
import { FormRow, SubmitBtn } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import customFetch from "../utils/customFetch.js"
import { toast } from 'react-toastify'


export const action = async ({ request }) => {
   const formData = await request.formData()
   const data = Object.fromEntries(formData)

   try {
      await customFetch.post('/auth/register', data)
      toast.success('Registration successful')
      return redirect('/login')
   } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg)
      return error
   }
}

const Register = () => {
   return (
      <Wrapper>
         <Form method='post' className="form">
            <Logo />
            <h4>Register</h4>
            <FormRow type="text" name="name" defaultValue="john" />
            <FormRow type="text" name="lastName" labelText="last name" defaultValue="smith" />
            <FormRow type="text" name="location" defaultValue="earth" />
            <FormRow type="email" name="email" defaultValue="john@test.com" />
            <FormRow type="password" name="password" defaultValue="Password123" />
            <SubmitBtn />
            <p>Already a member?<Link to="/login" className="member-btn">Login</Link></p>
         </Form>
      </Wrapper>
   )
}

export default Register