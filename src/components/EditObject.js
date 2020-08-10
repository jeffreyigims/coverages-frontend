import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { capitalize, map } from "../utils/Helpers";
import { formFor } from "../utils/Forms";
import { schemaFor } from "../utils/Schemas";

export default class AddObject extends React.Component {
  render() {
    const {
      show,
      switchModal,
      updateObject,
      name,
      selected,
      additional,
    } = this.props;
    const { schema, initialValues } = schemaFor(name);
    return (
      <Modal show={show} onHide={switchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {capitalize(name)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              updateObject(selected.attributes.id, values);
              switchModal("modal_edit");
            }}
            initialValues={map(initialValues, selected.attributes)}
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
