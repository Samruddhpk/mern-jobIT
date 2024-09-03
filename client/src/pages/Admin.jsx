import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { StatItem } from "../components";


export const loader = async () => {
    try {
        const response = await customFetch.get("/users/admin/app-stats");
        return response.data;
    } catch (error) {
        toast.error("You are not authorized to access this page.");
        return redirect("/dashboard");
    }
};

const Admin = () => {
    const { users, jobs } = useLoaderData();
    return (
        <Wrapper>
            <StatItem title="current users" count={users} color='#e9b949' bcg="#fcefc7" icon={<FaSuitcaseRolling />} />
            <StatItem title="total jobs" count={jobs} bcg='#e0e8f9' color="#647acb" icon={<FaCalendarCheck />} />
        </Wrapper>
    );
};
export default Admin;