import ClipLoader from "react-spinners/ClipLoader";

const override = {
  //   display: "flex",
  //   margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <div className="flex items-center justify-center ">
      <ClipLoader
        color="#4338ca"
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </div>
  );
};
export default Spinner;
