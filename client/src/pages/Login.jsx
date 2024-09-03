import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";


export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post("/auth/login", data);
        toast.success("Welcome, Logged In Successfully.");
        return redirect("/dashboard");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const Login = () => {

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    return (
        <Wrapper>
            <Form className="form" method="post">
                <Logo />
                <h4>Login</h4>
                <FormRow type="email" name="email" defaultValue="john@gmail.com" />
                <FormRow type="password" name="password" defaultValue="secret123" />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? "logging in..." : "login"}
                </button>
                <button type="button" className="btn btn-block">explore the app</button>
                <p>Not a member yet?  <Link to="/register">Register</Link> </p>

            </Form>
        </Wrapper>
    );
};
export default Login;