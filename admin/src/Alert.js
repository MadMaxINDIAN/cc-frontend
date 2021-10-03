import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import AlertComponent from "./components/Alert";

const Alert = (props) => {
  const [alertObject, setAlertObject] = useState({ status: false, msg: '', key: '' });
  useEffect(() => {
    if (props.errors.unauthorized) {
      setAlertObject({
        status: true,
        msg: props.errors.unauthorized,
        key: Math.random(),
        type: 'error'
      });
    }
    if (props.auth.alert.key) {
      setAlertObject({
        ...props.auth.alert,
        status: true
      });
    }
  }, [props.errors, props.auth]);

    const updateAlertState = () => {
    setAlertObject({
      status: false,
      msg: ''
    });
  };
    return (
        <div>
        {alertObject.status && (
        <AlertComponent
          message={alertObject.msg}
          key={alertObject.key}
          update={updateAlertState}
          type={alertObject.type}
        />
      )}
        </div>
    )
}

Alert.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProops = (state) => {
  const props = {
    errors: state.errors,
    auth: state.auth
  };
  return props;
};

export default connect(mapStateToProops, {})(Alert);
