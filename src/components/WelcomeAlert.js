import Alert from 'react-bootstrap/Alert'
import React from 'react'

function welcomeAlert() {
  return (
    <>
    <Alert className="welcomeAlert" variant="success">
        <Alert.Heading>Welcome!</Alert.Heading>
        <p>
        You must be logged in to manage your To-Do list. Please log your account or create a new one
        </p>
    </Alert>
    </>
    )
}

export default welcomeAlert;