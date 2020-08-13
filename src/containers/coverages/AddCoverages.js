import React, { Component } from "react";
import { connect } from "react-redux";
import GeneralTable from "../../components/GeneralTable";
import {
  groupStatus,
  displayDate,
  formatDate,
  getRandom,
} from "../../utils/Helpers";
import PropTypes from "prop-types";
import { Button, Form, Row, Card, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { TrashFill } from "react-bootstrap-icons";
import { formFor } from "../../utils/Forms";
import { schemaFor } from "../../utils/Schemas";
import {
  fetchSports,
  fetchClubs,
  fetchCategories,
  fetchCarriers,
  fetchBrokers,
  postCoverageAssociations,
  postCoveragePending,
  deleteCoveragePending,
} from "../../actions/Actions";

class CoverageWizardContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSports());
    this.props.dispatch(fetchClubs());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchCarriers());
    this.props.dispatch(fetchBrokers());
  }

  handleCreate = (values) => {
    let coverage = {
      id: getRandom(),
      sport: this.props.sports[values.sport_index].attributes,
      league: this.props.sports[values.sport_index].attributes.leagues[
        values.league_index
      ].data.attributes,
      club: this.props.clubs[values.club_index].attributes,
      club_group: this.props.clubs[values.club_index].attributes.club_groups[
        values.group_index
      ].data.attributes,
      category: this.props.categories[values.category_index].attributes,
      sub_category: this.props.categories[values.category_index].attributes
        .sub_categories[values.sub_category_index].data.attributes,
      carriers: values.carriers,
      brokers: values.brokers,
      notes: values.notes,
      start_date: formatDate(values.start_date),
      end_date: formatDate(values.end_date),
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    this.props.dispatch(postCoveragePending(coverage));
  };

  handleSubmit = () => {
    this.props.pending.map((coverage) => {
      const new_object = {
        club_group_id: coverage.club_group.id,
        sub_category_id: coverage.sub_category.id,
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
        postCoverageAssociations(new_object, carriers, brokers, coverage.id)
      );
      return coverage;
    });
  };

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            {object.league.name}
          </td>
          <td width="200" align="left">
            {object.club.name}
          </td>
          <td width="200" align="left">
            {object.club_group.group?.name}
          </td>
          <td width="200" align="left">
            {object.category.name}
          </td>
          <td width="200" align="left">
            {object.sub_category.name}
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
          <td width="200" align="left">
            {displayDate(object.start_date, "MMMM Do YYYY")}
          </td>
          <td width="200" align="left">
            {displayDate(object.end_date, "MMMM Do YYYY")}
          </td>
          <td width="200" align="left">
            {object.verified ? "true" : "false"}
          </td>
          <td width="100" align="center">
            <Button
              variant="link"
              onClick={() => {
                this.props.dispatch(deleteCoveragePending(object.id));
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
    const { schema, initialValues } = schemaFor("coverage_wizard");
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
                validationSchema={schema}
                onSubmit={this.handleCreate}
                initialValues={initialValues}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  values,
                  dirty,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    {formFor(
                      "coverage_wizard",
                      values,
                      handleChange,
                      setFieldValue,
                      errors,
                      this.props
                    )}
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
              objects={this.props.pending}
              status={"succeeded"}
            />
          </Card.Body>
          <Card.Footer>
            {this.props.pending.length > 0 && (
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
  sports: PropTypes.arrayOf(PropTypes.object).isRequired,
  clubs: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  carriers: PropTypes.arrayOf(PropTypes.object).isRequired,
  brokers: PropTypes.arrayOf(PropTypes.object).isRequired,
  pending: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  const { pending } = state.coverages;
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
    pending,
  };
}

export default connect(mapStateToProps)(CoverageWizardContainer);
