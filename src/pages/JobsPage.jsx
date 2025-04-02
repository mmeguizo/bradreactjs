import JobListingsSection from "../components/JobListingsSection";
import jobs from "../db.json";

const JobsPage = () => {
  return (
    <section className="bg-blue-50 px-4 py-6">
      <JobListingsSection jobs={jobs} isHome={false} />
    </section>
  );
};

export default JobsPage;
