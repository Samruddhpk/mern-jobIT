import { Link } from "react-router-dom";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

const Login = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Login</h4>
                <FormRow type="email" name="email" defaultValue="john@gmail.com" />
                <FormRow type="password" name="password" defaultValue="secret" />
                <button type="button" className="btn btn-block">submit</button>
                <button type="button" className="btn btn-block">explore the app</button>
                <p>Not a member yet?  <Link to="/register">Register</Link> </p>

            </form>
        </Wrapper>
    );
};
export default Login;