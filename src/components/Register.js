import React, { useState } from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import {
  Col, Form, Row, FloatingLabel,
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import { setLogged } from '../store/userSlice'
import Loader from './Loader'
import './Register.css'
import WelcomeAlert from './WelcomeAlert'

const Register = () => {
    let changed = false
    const [isLoading, setLoading] = useState(false) 

    const dispatch = useDispatch()

    const validate = ({
        name,
        email,
        password,
        confirmPassword,
    }) => {
        const errors = {}
        changed = true
        if (!name) {
        errors.name = 'Enter your name'
        } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(name)) {
        errors.name = 'Name must contain only letters, at least 3'
        }
        if (!email) {
        errors.email = 'Enter your email'
        } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
        ) {
        errors.email = 'You must enter valid email'
        }
        if (!password) {
        errors.password = 'Enter password'
        }
        if (
        !/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-|[\]]{6,50}$/.test(password)
        ) {
        errors.password = 'Password must contain only alphanumeric characters and at least 6'
        }
        if (!confirmPassword) errors.confirmPassword = 'Please confirm your password'
        if (confirmPassword !== password) errors.confirmPassword = 'Passwords must be equal'
        return errors
    }

    const handleOnSubmit = async (values, { resetForm }) => {
        try {
        const data = {
            name: values.name,
            email: values.email,
        }
        const password = { password: values.password }
        setLoading(true)
        console.log(data, password)
        const userData = {data, password}
        /* const userData = await sendRequest(httpActionEnum.POST, '/users', {
            ...data,
            ...password,
        }) */
        dispatch(setLogged(userData.data.body))
        localStorage.setItem('user-data', JSON.stringify({ token: userData.data.body.token }))
        } catch (e) {
        const text = 'Error, please try again'
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text,
        })
        } finally {
        setLoading(false)
        }
        resetForm()
    }

  return (
    <>
        <WelcomeAlert/>

        <Formik
            initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            }}
            validate={validate}
            onSubmit={handleOnSubmit}>
            {({
            handleSubmit,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            }) => (
            <Row className="m-0 justify-content-center min-vh-100 align-content-center">
                <Col sm="6" md="4" lg="3" className="p-4 p-md-0">
                <h1 className="text-center mb-4">Register</h1>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="validationFormik01">
                    <FloatingLabel label="Nombre" className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.name}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="validationFormik01">
                    <FloatingLabel label="email" className="mb-3">
                        <Form.Control
                        type="email"
                        placeholder="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.email}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="validationFormik01">
                    <FloatingLabel label="Password" className="mb-3">
                        <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.password}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="validationFormik01">
                    <FloatingLabel label="Confirm Password" className="mb-3">
                        <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                        }
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Form.Group>

                    {Object.keys(errors).length === 0 && changed === true ? (
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    ) : (
                    <button type="submit" className="btn btn-primary" disabled>
                        { isLoading ? <Loader visible={isLoading} width={20} height={20} className="" /> : 'Registrarse' }
                    </button>
                    )}
                </Form>
                </Col>
            </Row>
        )}
        </Formik>
        </>
    )
}

export default Register
