import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const {name, email, password, password2} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, message, isError, isSuccess, isLoading } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate("/")
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, message, navigate, user])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error("Passwords must match")
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Your primary details</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange} placeholder="Your name" required />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange} placeholder="Your email" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} placeholder="Your password" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password2" name="password2" value={password2} onChange={onChange} placeholder="Confirm your password" required />
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              Register account
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register