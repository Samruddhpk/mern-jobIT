import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_SORT_BY, JOB_STATUS } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
    const { searchValues } = useAllJobsContext();
    const { search, jobStatus, jobType, sort } = searchValues;

    const debounce = (onChange) => {
        let timeout;
        return (e) => {
            const form = e.currentTarget.form;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                onChange(form);
            }, 2000);
        };
    };

    const submit = useSubmit();
    return (
        <Wrapper>
            <Form className="form">
                <h5 className="form-title">search form</h5>
                <div className="form-center">
                    <FormRow type="search" name="search" defaultValue="a" onChange={debounce((form) => {
                        submit(form);
                    })} />

                    <FormRowSelect labelText="job status" name="jobStatus" list={["all", ...Object.values(JOB_STATUS)]} defaultValue="all" onChange={((e) => { submit(e.currentTarget.form); })} />

                    <FormRowSelect labelText="job type" name="jobType" list={["all", ...Object.values(JOB_TYPE)]} onChange={((e) => { submit(e.currentTarget.form); })} />

                    <FormRowSelect name="sort" defaultValue="newest" list={[...Object.values(JOB_SORT_BY)]} onChange={((e) => { submit(e.currentTarget.form); })} />

                    <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
                        Reset Search Values
                    </Link>
                    {/* Temp */}
                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};
export default SearchContainer;