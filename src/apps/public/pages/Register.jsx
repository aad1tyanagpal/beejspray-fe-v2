import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/auth/authSlice";

function Register() {

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: "Badal",
      email: "badal@gmail.com",
      password: "123456"
    };

    dispatch(registerUser(formData));
  };

  return (
    <div>
      <button onClick={handleSubmit}>Register</button>

      {loading && <p>Registering...</p>}
      {success && <p>Registered Successfully</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
