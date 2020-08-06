import React, { Component } from "react";
import { connect } from "react-redux";
import GeneralTable from "../../components/GeneralTable";
import { groupStatus } from "../../utils/Helpers";
import PropTypes from "prop-types";
import { Button, Form, Col, Row, Card, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { TrashFill } from "react-bootstrap-icons";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import Moment from "react-moment";
import {
  objectOptions,
  objectDataOptions,
  objectGroupOptions,
} from "../../utils/Forms";
import { coverage_wizard as formHelpers } from "../../utils/Schemas";
import {
  fetchSports,
  fetchClubs,
  fetchCategories,
  fetchCarriers,
  fetchBrokers,
  postCoverageAssociations,
} from "../../actions/Actions";

class CoverageWizardContainer extends Component {
  state = {
    coverages: [],
  };

  componentDidMount() {
    this.props.dispatch(fetchSports());
    this.props.dispatch(fetchClubs());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchCarriers());
    this.props.dispatch(fetchBrokers());
  }

  clubOptions = (league) => {
    const league_id = league?.data.attributes.id;
    let clubs = this.props.clubs.filter(
      (club) => club.attributes.league_id === league_id
    );
    return objectOptions(clubs);
  };

  handleCreate = (values) => {
    let coverage = {
      sport: this.props.sports[values.sport_index],
      league: this.props.sports[values.sport_index].attributes.leagues[
        values.league_index
      ].data,
      club: this.props.clubs[values.club_index],
      club_group: this.props.clubs[values.club_index].attributes.club_groups[
        values.group_index
      ].data,
      category: this.props.categories[values.category_index],
      sub_category: this.props.categories[values.category_index].attributes
        .sub_categories[values.sub_category_index].data,
      carriers: values.carriers,
      brokers: values.brokers,
      notes: values.notes,
      start_date: values.start_date,
      end_date: values.end_date,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    this.setState({ coverages: this.state.coverages.concat(coverage) });
  };

  handleSubmit = () => {
    this.state.coverages.map((coverage) => {
      const new_object = {
        club_group_id: coverage.club_group.attributes.id,
        sub_category_id: coverage.sub_category.attributes.id,
        notes: coverage.notes,
        start_date: coverage.start_date,
        end_date: coverage.end_date,
        has_coverage_line: coverage.has_coverage_line,
        verified: coverage.verified,
      };
      let carriers = coverage.carriers.map(
        (carrier_index) => this.props.carriers[carrier_index].attributes.id
      );
      let brokers = coverage.brokers.map(
        (broker_index) => this.props.brokers[broker_index].attributes.id
      );
      this.props.dispatch(
        postCoverageAssociations(new_object, carriers, brokers)
      );
      return coverage;
    });
    this.setState({
      coverages: [],
    });
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            {object.league.attributes.name}
          </td>
          <td width="200" align="left">
            {object.club.attributes.name}
          </td>
          <td width="200" align="left">
            {object.club_group.attributes.group.name}
          </td>
          <td width="200" align="left">
            {object.category.attributes.name}
          </td>
          <td width="200" align="left">
            {object.sub_category.attributes.name}
          </td>
          <td width="200" align="left">
            {object.carriers.length > 1
              ? "Multiple"
              : this.props.carriers[object.carriers[0]]?.attributes.name ||
                "Unknown"}
          </td>
          <td width="200" align="left">
            {object.brokers.length > 1
              ? "Multiple"
              : this.props.brokers[object.brokers[0]]?.attributes.company
                  .name || "Unknown"}{" "}
          </td>
          {object.start_date === null ? (
            <td width="200" align="left">
              {"N/A"}{" "}
            </td>
          ) : (
            <td width="200" align="left">
              <Moment format="MMMM Do YYYY">{object.start_date}</Moment>
            </td>
          )}
          {object.end_date === null ? (
            <td width="200" align="left">
              {"N/A"}{" "}
            </td>
          ) : (
            <td width="200" align="left">
              <Moment format="MMMM Do YYYY">{object.end_date}</Moment>
            </td>
          )}
          <td width="200" align="left">
            {object.verified ? "true" : "false"}
          </td>
          <td width="100" align="center">
            <Button
              variant="link"
              onClick={() => {
                this.setState({
                  coverages: this.state.coverages.filter(
                    (coverage, i) => i !== index
                  ),
                });
              }}
              style={{ color: "black" }}
            >
              <TrashFill />
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const status = groupStatus(this.props.status);
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
                onSubmit={(values) => this.handleCreate(values)}
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
                          {objectOptions(this.props.carriers)}
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
                          {objectOptions(this.props.brokers)}
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
                            setFieldValue(
                              "start_date",
                              val === "Invalid date" ? null : val
                            )
                          }
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>{"Ending Date:"}</Form.Label>
                        <DatePickerInput
                          name="end_date"
                          value={values.end_date}
                          onChange={(val) =>
                            setFieldValue(
                              "end_date",
                              val === "Invalid date" ? null : val
                            )
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
          <Card.Body>
            <GeneralTable
              tableHeaders={[
                "League",
                "Club",
                "Group",
                "Category",
                "Sub",
                "Carrier",
                "Broker",
                "Start",
                "End",
                "Verified",
                "Remove",
              ]}
              showObjects={this.showObjects}
              objects={this.state.coverages}
              status={"succeeded"}
            />
          </Card.Body>
          <Card.Footer>
            {this.state.coverages.length > 0 && (
              <Button
                variant="primary"
                onClick={this.handleSubmit}
                className="btn btn-theme float-right"
              >
                Submit Coverages
              </Button>
            )}
          </Card.Footer>
        </Card>
      </>
    );
  }
}

CoverageWizardContainer.propTypes = {
  carriers: PropTypes.object.isRequired,
  brokers: PropTypes.object.isRequired,
};

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
