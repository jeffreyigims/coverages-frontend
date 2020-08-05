import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { capitalize } from "../utils/Helpers";

class EditObject extends React.Component {
  handleClose = (name) => {
    this.props.switchModal(name);
  };

  map = (values, object) => {
    var new_values = {};
    for (var key in values) {
      new_values[key] = object[key];
    }
    return new_values;
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.handleClose("modal_edit")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {capitalize(this.props.name)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={this.props.formHelpers.schema}
            onSubmit={(values) => {
              this.props.updateObject(this.props.object.attributes.id, values);
              this.handleClose("modal_edit");
            }}
            initialValues={this.map(
              this.props.formHelpers.initialValues,
              this.props.object.attributes
            )}
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
                  Update {capitalize(this.props.name)}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditObject;
