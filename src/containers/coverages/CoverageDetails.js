import React from "react";
import PropTypes from "prop-types";
import { Form, Col, Row, Card, Button } from "react-bootstrap";
import { Formik } from "formik";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { objectOptionsID } from "../../utils/Forms";
import { schemaFor } from "../../utils/Schemas";
import { Redirect } from "react-router-dom";
import { formatDate, statusDisplay } from "../../utils/Helpers";

export default class CoverageDetails extends React.Component {
  initialValues = (coverage) => {
    return coverage == null
      ? null
      : {
          notes: coverage.notes,
          start_date: formatDate(coverage.start_date),
          end_date: formatDate(coverage.end_date),
          has_coverage_line: coverage.has_coverage_line,
          verified: coverage.verified,
          carriers: coverage.coverage_carriers.map(
            (coverage_carrier) => coverage_carrier.data.attributes.carrier_id
          ),
          brokers: coverage.coverage_brokers.map(
            (coverage_brokers) => coverage_brokers.data.attributes.broker_id
          ),
        };
  };

  render() {
    const {
      redirections,
      status,
      selected,
      brokers,
      carriers,
      submit,
      deleteObject,
    } = this.props;
    const { schema } = schemaFor("coverage");
    return (
      <>
        {redirections.redirect === true && <Redirect to={redirections.link} />}
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            Coverage Details
          </Card.Title>
          <Card.Body>
            {statusDisplay(
              status,
              <Formik
                validationSchema={schema}
                onSubmit={submit}
                initialValues={this.initialValues(selected?.attributes)}
                enableReinitialize={true}
              >
                {({
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  values,
                  dirty,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Club:</Form.Label>
                        <Form.Control
                          type="text"
                          name="club"
                          value={selected?.attributes.club.name}
                          disabled
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Group:</Form.Label>
                        <Form.Control
                          type="text"
                          name="group"
                          value={selected?.attributes.group.name}
                          disabled
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Category:</Form.Label>
                        <Form.Control
                          type="text"
                          name="category"
                          value={selected?.attributes.category.name}
                          disabled
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Sub Category:</Form.Label>
                        <Form.Control
                          type="text"
                          name="sub_category"
                          value={selected?.attributes.sub_category.name}
                          disabled
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Carriers:</Form.Label>
                        <Form.Control
                          as="select"
                          multiple
                          name="carriers"
                          value={values.carriers}
                          onChange={(event) =>
                            setFieldValue(
                              "carriers",
                              Array.from(
                                event.target.selectedOptions,
                                (option) => Number(option.value)
                              )
                            )
                          }
                        >
                          {objectOptionsID(carriers)}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Brokers:</Form.Label>
                        <Form.Control
                          as="select"
                          multiple
                          name="brokers"
                          value={values.brokers}
                          onChange={(event) =>
                            setFieldValue(
                              "brokers",
                              Array.from(
                                event.target.selectedOptions,
                                (option) => Number(option.value)
                              )
                            )
                          }
                        >
                          {objectOptionsID(brokers)}
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    <Form.Group>
                      <Form.Label>Notes:</Form.Label>
                      <Form.Control
                        type="text"
                        name="notes"
                        value={values.notes}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>{"Start Date:"}</Form.Label>
                        <DatePickerInput
                          name="start_date"
                          value={values.start_date}
                          onChange={(val) =>
                            setFieldValue("start_date", formatDate(val))
                          }
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>{"End Date:"}</Form.Label>
                        <DatePickerInput
                          name="end_date"
                          value={values.end_date}
                          onChange={(val) =>
                            setFieldValue("end_date", formatDate(val))
                          }
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Check
                          type="checkbox"
                          name="has_coverage_line"
                          label={"Has Coverage Line"}
                          checked={values.has_coverage_line}
                          value={values.has_coverage_line}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Check
                          type="checkbox"
                          name="verified"
                          label={"Verified"}
                          checked={values.verified}
                          value={values.verified}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Button
                      className="btn btn-theme float-right"
                      variant="danger"
                      onClick={() => deleteObject(selected?.attributes.id)}
                    >
                      Delete Coverage
                    </Button>
                    {dirty === true ? (
                      <Button
                        type="submit"
                        className="btn btn-theme float-right"
                        variant="primary"
                        style={{ marginRight: "10px" }}
                      >
                        Update Coverage
                      </Button>
                    ) : (
                      ""
                    )}
                  </Form>
                )}
              </Formik>
            )}
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </>
    );
  }
}

CoverageDetails.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  carriers: PropTypes.arrayOf(PropTypes.object).isRequired,
  brokers: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirections: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  deleteObject: PropTypes.func.isRequired,
};
