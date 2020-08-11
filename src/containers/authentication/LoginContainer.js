import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { formFor } from "../../utils/Forms";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { schemaFor } from "../../utils/Schemas";
import { login } from "../../actions/Actions";
import { Card, Form, Button } from "react-bootstrap";

class LoginContainer extends React.Component {
  componentDidMount() {}

  login = (values) => {
    const auth = {
      username: values.username,
      password: values.password,
    };
    this.props.dispatch(login(auth));
  };

  render() {
    const { schema, initialValues } = schemaFor("login");
    const { redirections } = this.props;
    return (
      <>
        {redirections.redirect === true && <Redirect to={redirections.link} />}
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>Login</Card.Title>
          <Card.Body>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => this.login(values)}
              initialValues={initialValues}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({
                handleSubmit,
                values,
                handleChange,
                setFieldValue,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  {formFor(
                    "login",
                    values,
                    handleChange,
                    setFieldValue,
                    errors,
                    {}
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn btn-theme float-right"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </>
    );
  }
}

LoginContainer.propTypes = {
  redirections: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const redirections = state.redirections;
  return {
    redirections,
  };
}

export default connect(mapStateToProps)(LoginContainer);
