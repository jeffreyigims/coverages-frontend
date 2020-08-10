import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { capitalize } from "../utils/Helpers";
import { map } from "../utils/Helpers";

export default class EditObject extends React.Component {
  render() {
    const {
      show,
      switchModal,
      updateObject,
      name,
      object,
      formHelpers,
      form,
    } = this.props;
    return (
      <Modal show={show} onHide={switchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {capitalize(name)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={formHelpers.schema}
            onSubmit={(values) => {
              updateObject(object.attributes.id, values);
              switchModal("modal_edit");
            }}
            initialValues={map(formHelpers.initialValues, object.attributes)}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {form(values, handleChange, setFieldValue, errors)}
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-theme float-right"
                >
                  Update {capitalize(name)}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}
