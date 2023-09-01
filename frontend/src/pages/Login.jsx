import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import { FaSignInAlt } from "react-icons/fa"
import Spinner from "../components/Spinner"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const {email, password } = formData
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

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Your details</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange} placeholder="Your email" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} placeholder="Your password" required />
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              Proceed to support desk
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login