import classNames from "classnames";
import PropTypes from "prop-types";
import "./style.scss";

const Toggle = ({ state = 0 }) => {
  const circleClasses = classNames("circle", {
    snake: state > 0,
    tail: state == 1,
    //head: state == 3,
    //cherry: state == 6,
  });

  return (
    <div className="toggle">
      <div className={circleClasses}></div>
    </div>
  );
};
Toggle.propTypes = {
  state: PropTypes.number,
};
export default Toggle;
