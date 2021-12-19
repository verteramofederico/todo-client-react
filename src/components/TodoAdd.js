import React, { useState } from 'react'
import { Formik } from 'formik'
import {
  Col, Form, Row, FloatingLabel,
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import sendRequest from '../httpClient'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/userSlice'
import './Todo.css'

const TodoAdd = () => {
    let changed = false
    const [isLoading, setLoading] = useState(false) 
    const user = useSelector(selectUser)

    const validate = ({
        title
    }) => {
        const errors = {}
        changed = true
        if (!title) {
            errors.title = 'Enter title'
            } 
        return errors
    }

    const handleOnSubmit = async (values, { resetForm }) => {
        try {
            let title = values.title;
            setLoading(true)
            await sendRequest('post', '/todo', 
            {
            user_id: `${user.id}`,
            title: title
            })
        } catch (e) {
        console.log(e)
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
            classname="formik"
            initialValues={{
            title: ''
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
            <Row className="justify-content-center align-content-center formik">
                <Col sm="6" md="4" lg="3" className="p-4 p-md-0">
                <h1 className="text-center mb-4">Add task</h1>
                <Form noValidate onSubmit={handleSubmit}>

                    <Form.Group controlId="validationFormik01">
                    <FloatingLabel label="title" className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.title && !!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.title}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Form.Group>

                    {Object.keys(errors).length === 0 && changed === true ? (
                    <button type="submit" className="btn btn-primary">
                        Add task
                    </button>
                    ) : (
                    <button type="submit" className="btn btn-primary" disabled>
                        { isLoading ? <Loader visible={isLoading} width={20} height={20} className="" /> : 'Add To-Do' }
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

export default TodoAdd