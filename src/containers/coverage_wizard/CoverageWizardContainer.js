import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button, Form, Col, Row, Card, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import {
  objectOptionsID,
  objectOptions,
  objectDataOptions,
  objectGroupOptions,
} from "../../utils/Forms";
import { coverage_wizard as formHelpers } from "../../utils/Schemas";
// import { clubForm as form } from "../../utils/Forms";
import {
  fetchSports,
  fetchLeagues,
  fetchClubs,
  fetchCategories,
  fetchCarriers,
  fetchBrokers,
} from "../../actions/Actions";

class CoverageWizardContainer extends Component {
  state = {
    // tableHeaders: ["Name", "Code", "League", "Groups"],
    // name: "club",
    // plural: "clubs",
  };

  componentDidMount() {
    this.props.dispatch(fetchSports());
    // this.props.dispatch(fetchLeagues());
    this.props.dispatch(fetchClubs());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchCarriers());
    this.props.dispatch(fetchBrokers());
  }

  status = (statuses) => {
    const status = "succeeded";
    for (var key in statuses) {
      if (statuses[key] === "failed") {
        return "failed";
      } else if (statuses[key] === "loading") {
        return "loading";
      } else if (statuses[key] === "idle") {
        return "idle";
      }
    }
    return status;
  };

  clubOptions = (league) => {
    const league_id = league?.data.attributes.id;
    let clubs = this.props.clubs.filter(
      (club) => club.attributes.league_id === league_id
    );
    return objectOptions(clubs);
  };

  render() {
    const status = this.status(this.props.status);
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>Add Coverages</Card.Title>
          <Card.Body>
            <Row className="row justify-content-center">
              {status === "loading" && (
                <Spinner animation="border" variant="primary" />
              )}
            </Row>
            {status === "succeeded" && (
              <Formik
                validationSchema={formHelpers.schema}
                onSubmit={console.log("Submit")}
                initialValues={formHelpers.initialValues}
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
                        <Form.Label>Sport:</Form.Label>
                        <Form.Control
                          as="select"
                          name="sport_index"
                          value={values.sport_index}
                          onChange={handleChange}
                        >
                          {objectOptions(this.props.sports)}
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>League:</Form.Label>
                        <Form.Control
                          as="select"
                          name="league_index"
                          value={values.league_index}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue("club_index", 0);
                          }}
                        >
                          {objectDataOptions(
                            this.props.sports[values.sport_index].attributes
                              .leagues
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Club:</Form.Label>
                        <Form.Control
                          as="select"
                          name="club_index"
                          value={values.club_index}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue("group_index", 0);
                          }}
                        >
                          {this.clubOptions(
                            this.props.sports[values.sport_index].attributes
                              .leagues[values.league_index]
                          )}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Group:</Form.Label>
                        <Form.Control
                          as="select"
                          name="group_index"
                          value={values.group_index}
                          onChange={handleChange}
                        >
                          {objectGroupOptions(
                            this.props.clubs[values.club_index].attributes
                              .club_groups
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Category:</Form.Label>
                        <Form.Control
                          as="select"
                          name="category_index"
                          value={values.category_index}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue("sub_category_index", 0);
                          }}
                        >
                          {objectOptions(this.props.categories)}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Sub Category:</Form.Label>
                        <Form.Control
                          as="select"
                          name="sub_category_index"
                          value={values.sub_category_index}
                          onChange={handleChange}
                        >
                          {objectDataOptions(
                            this.props.categories[values.category_index]
                              .attributes.sub_categories
                          )}
                        </Form.Control>
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
                    <Button
                      type="submit"
                      className="btn btn-theme float-right"
                      variant="primary"
                      style={{ marginRight: "10px" }}
                    >
                      Add Coverage
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            Prepared Coverages
          </Card.Title>
          <Card.Body></Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </>
    );
  }
}

CoverageWizardContainer.propTypes = {};

function mapStateToProps(state) {
  const { sports } = state.sports;
  const sportsStatus = state.sports.status;
  const { clubs } = state.clubs;
  const clubsStatus = state.clubs.status;
  const { categories } = state.categories;
  const categoriesStatus = state.categories.status;
  const { carriers } = state.carriers;
  const carriersStatus = state.carriers.status;
  const { brokers } = state.brokers;
  const brokersStatus = state.brokers.status;
  return {
    status: {
      sportsStatus,
      clubsStatus,
      categoriesStatus,
      carriersStatus,
      brokersStatus,
    },
    sports,
    clubs,
    categories,
    carriers,
    brokers,
  };
}

export default connect(mapStateToProps)(CoverageWizardContainer);
