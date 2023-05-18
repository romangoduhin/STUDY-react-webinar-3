import React from "react";
import PropTypes from "prop-types";

function Price({amount, currency}) {
  return (
    <span>{amount} {currency}</span>
  );
}

Price.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default React.memo(Price);
