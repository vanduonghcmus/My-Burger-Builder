import React from "react";

import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-errorHandler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorClear] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={errorClear}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
export default withErrorHandler;
