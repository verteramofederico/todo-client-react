import React, { useEffect, useState } from 'react'
import Header from './Header'
import Register from './Register'
import Login from './Login'
import Todo from './Todo'
import { Routes, Route } from "react-router-dom"
import { selectUser, setLogged } from '../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(selectUser)
  useEffect(() => {
    (async () => {
      const userData = JSON.parse(localStorage.getItem('user-data'))
      if (!isAuthenticated && userData) {
        try {
          dispatch(setLogged(userData))
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    })()
  }, [isAuthenticated, dispatch])
  if (isLoading) return <Loader visible />
  return (
    <>
    <Header/>  
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="todo" element={<Todo />} />
    </Routes>
    </>
  );
}

export default App;
