import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { capitalize } from "../../utils/Helpers";
import { formFor } from "../../utils/Forms";
import { schemaFor } from "../../utils/Schemas";

export default class Filter extends React.Component {
  render() {
    const { show, switchModal, filter, plural, additional } = this.props;
    const { schema, initialValues } = schemaFor("filter");
    return (
      <Modal show={show} onHide={switchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Filter {capitalize(plural)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              filter(values);
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
                  "filter",
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
                  Filter {capitalize(plural)}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

Filter.propTypes = {
  show: PropTypes.bool.isRequired,
  filter: PropTypes.func.isRequired,
  switchModal: PropTypes.func.isRequired,
  plural: PropTypes.string.isRequired,
  additional: PropTypes.object.isRequired,
};
