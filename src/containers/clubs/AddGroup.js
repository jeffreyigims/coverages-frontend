import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";

export default class AddGroup extends React.Component {
  handleClose = (name) => {
    this.props.switchModal(name);
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.handleClose("modal_groups")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Group</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={this.props.formHelpers.schema}
            onSubmit={(values) => {
              this.props.postObject(values);
              this.handleClose("modal_groups");
            }}
            initialValues={this.props.formHelpers.initialValues}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {this.props.form(values, handleChange, setFieldValue, errors)}
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Add Group
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}
