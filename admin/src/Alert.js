import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetAlert } from "./actions/authActions";
import AlertComponent from "./components/Alert";

const Alert = (props) => {
  const [alertObject, setAlertObject] = useState({ status: false, msg: '', key: '' });
  useEffect(() => {
    if (props.auth.alert.key) {
      setAlertObject({
        ...props.auth.alert,
        status: true
      });
    }
  }, [props.auth]);

    const updateAlertState = () => {
    setAlertObject({
      status: false,
      msg: ''
    });
    props.resetAlert();
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
  resetAlert: PropTypes.func.isRequired,
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

export default connect(mapStateToProops, {resetAlert})(Alert);
