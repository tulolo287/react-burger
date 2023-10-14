import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{margin: '0 auto'}}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;
