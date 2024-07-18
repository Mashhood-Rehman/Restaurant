import React from "react";
import HashLoader from "react-spinners/HashLoader";
const PreLoader = ({ loading, setLoading }) => {
  if (loading) {
    return (
      <div>
        {" "}
        <HashLoader
          color={"#010907"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  } else {
    return null;
  }
};

export default PreLoader;
