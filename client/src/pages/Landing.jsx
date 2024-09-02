import Wrapper from "../assets/wrappers/LandingPage";
import mainImg from "../assets/images/main-alternative.svg";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                {/* TODO: Change logo later*/}
                <Logo />
            </nav>

            <div className="container page">
                {/*  info */}
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>Streamline your job search with a powerful tool designed to keep you organized and focused on what matters.</p>
                    <Link to="/register" className="btn register-link">Register</Link>
                    <Link to="/login" className="btn">Login / Demo User</Link>
                </div>

                <img src={mainImg} alt="job hunt" className="img main-img" />
            </div>

        </Wrapper>
    );
};
export default Landing;