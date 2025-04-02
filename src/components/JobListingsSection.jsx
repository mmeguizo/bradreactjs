/*eslint no-unused-vars: "off"*/
import { use, useEffect, useState } from "react";
import JobCard from "./JobCard";
import Spinner from "./Spinner";

const JobListingsSection = ({ isHome = false }) => {
  // const recentPostedJobs = isHome ? jobs.slice(0, 3) : jobs;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentPostedJobs, setRecentPostedJobs] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const url = isHome ? "/jobs?_sort=id,-createdAt&_limit=3" : "/jobs";

    const fetchJobs = async () => {
      try {
        const results = await fetch(`/api${url}`);
        const data = await results.json();
        if (isMounted) {
          setJobs(data);
          setRecentPostedJobs(data.slice(0, 3));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Posted Jobs" : "All Jobs"}
          </h2>

          {loading ? (
            <div className="grid">
              <Spinner loading={loading} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job, index) => {
                return (
                  <JobCard
                    key={job.id || index}
                    id={job.id}
                    type={job.type}
                    title={job.title}
                    description={job.description}
                    salary={job.salary}
                    location={job.location}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobListingsSection;
