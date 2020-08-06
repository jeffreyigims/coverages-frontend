import React from "react";
import PropTypes from "prop-types";
import { Form, Col, Row, Card, Spinner, Button } from "react-bootstrap";
import { Formik } from "formik";
// import DatePicker from "react-datepicker";
import { objectOptionsID } from "../../utils/Forms";

export default class CoverageDetails extends React.Component {
  initialValues = (coverage) => {
    var values = {};
    values["notes"] = coverage.notes;
    values["start_date"] = Date.parse(coverage.start_date) || new Date();
    values["end_date"] = Date.parse(coverage.end_date) || new Date();
    values["has_coverage_line"] = coverage.has_coverage_line;
    values["verified"] = coverage.verified;
    values["carriers"] = coverage.coverage_carriers.map(
      (coverage_carrier) => coverage_carrier.data.attributes.carrier_id
    );
    values["brokers"] = coverage.coverage_brokers.map(
      (coverage_brokers) => coverage_brokers.data.attributes.broker_id
    );
    return values;
  };

  render() {
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            Coverage Details
          </Card.Title>
          <Card.Body>
            <Row className="row justify-content-center">
              {this.props.status === "loading" && (
                <Spinner animation="border" variant="primary" />
              )}
            </Row>
            {this.props.status === "succeeded" && (
              <Formik
                validationSchema={this.props.formHelpers.schema}
                onSubmit={this.props.submit}
                initialValues={this.initialValues(this.props.object.attributes)}
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
                          value={this.props.object.attributes.club.name}
                          disabled
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Group:</Form.Label>
                        <Form.Control
                          type="text"
                          name="group"
                          value={this.props.object.attributes.group.name}
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
                          value={this.props.object.attributes.category.name}
                          disabled
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Sub Category:</Form.Label>
                        <Form.Control
                          type="text"
                          name="sub_category"
                          value={this.props.object.attributes.sub_category.name}
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
                          {objectOptionsID(this.props.carriers)}
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
                          {objectOptionsID(this.props.brokers)}
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
                        {/* <DatePicker
                          name="start_date"
                          selected={values.start_date}
                          onChange={(val) => setFieldValue("start_date", val)}
                        /> */}
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>{"Ending Date:"}</Form.Label>
                        {/* <DatePicker
                          name="end_date"
                          selected={values.end_date}
                          onChange={(val) => setFieldValue("end_date", val)}
                        /> */}
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
                    {dirty == true ? (
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

CoverageDetails.propTypes = {};
