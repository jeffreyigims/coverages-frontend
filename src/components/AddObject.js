import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { capitalize } from "../utils/Helpers";
import { formFor } from "../utils/Forms";
import { schemaFor } from "../utils/Schemas";

export default class NewObject extends React.Component {
  render() {
    const { show, switchModal, postObject, name, additional } = this.props;
    const { schema, initialValues } = schemaFor(name);
    return (
      <Modal show={show} onHide={switchModal}>
        <Modal.Header closeButton>
          <Modal.Title>New {capitalize(name)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              postObject(values);
              switchModal();
            }}
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {formFor(
                  name,
                  values,
                  handleChange,
                  setFieldValue,
                  errors,
                  additional
                )}
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Create {capitalize(name)}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

NewObject.propTypes = {
  name: PropTypes.string.isRequired,
  postObject: PropTypes.func.isRequired,
  switchModal: PropTypes.func.isRequired,
};
