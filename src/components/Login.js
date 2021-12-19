import React, { useState } from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import {
  Col, Form, Row, FloatingLabel,
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import sendRequest from '../httpClient'
import { setLogged } from '../store/userSlice'
import Loader from './Loader'
import { useNavigate } from 'react-router';

const Login = () => {
    let changed = false
    const [isLoading, setLoading] = useState(false) 
    let navigate = useNavigate();

    const dispatch = useDispatch()

    const validate = ({
        email,
        password,
    }) => {
        const errors = {}
        changed = true
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
        return errors
    }

    const handleOnSubmit = async (values, { resetForm }) => {
        try {
        const data = {
            email: values.email,
        }
        const password = { password: values.password }
        setLoading(true)
        const userData = await sendRequest('post', '/users/login', {
            ...data,
            ...password,
        })
        dispatch(setLogged(userData.data))
        localStorage.setItem('user-data', JSON.stringify({ 
            token: userData.data.token, 
            name: userData.data.name,
            user_id: userData.data.id }))
        navigate('/')
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
        <Formik
            initialValues={{
            email: '',
            password: '',
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
                <h1 className="text-center mb-4">Login</h1>
                <Form noValidate onSubmit={handleSubmit}>

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

                    {Object.keys(errors).length === 0 && changed === true ? (
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    ) : (
                    <button type="submit" className="btn btn-primary" disabled>
                        { isLoading ? <Loader visible={isLoading} width={20} height={20} className="" /> : 'Login' }
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

export default Login
