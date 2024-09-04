import { Link, Form, redirect, useNavigation, useNavigate } from "react-router-dom";
import { FormRow, Logo, SubmitBtn } from "../components";
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
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const loginDemoUser = async () => {
        const data = {
            email: 'test@test.com',
            password: 'secret123',
        };
        try {
            await customFetch.post('/auth/login', data);
            toast.success('Take a test drive');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    return (
        <Wrapper>
            <Form className="form" method="post">
                <Logo />
                <h4>Login</h4>
                <FormRow type="email" name="email" defaultValue="Sam@gmail.com" />
                <FormRow type="password" name="password" defaultValue="secret123" />
                <SubmitBtn />
                <button type="button" className="btn btn-block" onClick={loginDemoUser}>explore the app</button>
                <p>Not a member yet?  <Link to="/register">Register</Link> </p>

            </Form>
        </Wrapper>
    );
};

export default Login;