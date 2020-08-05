import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import PaginatedTable from "../../components/PaginatedTable";
import Moment from "react-moment";
import { EyeFill } from "react-bootstrap-icons";
import { brokers as formHelpers } from "../../utils/Schemas";
import { brokerForm as form } from "../../utils/Forms";
import {
  fetchBroker,
  updateBroker,
  deleteBroker,
  fetchCoverages,
} from "../../actions/Actions";

class BrokerContainer extends Component {
  state = {
    name: "broker",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchBroker(this.state.id));
    this.props.dispatch(fetchCoverages({ for_broker: this.state.id }));
  }

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/leagues/" + object.attributes.league.id}
                style={{ color: "black" }}
              >
                {object.attributes.league.name}
              </Button>
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/clubs/" + object.attributes.club.id}
                style={{ color: "black" }}
              >
                {object.attributes.club.name}
              </Button>
            </td>
            <td width="200" align="left">
              {object.attributes.group.name}
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/categories/" + object.attributes.category.id}
                style={{ color: "black" }}
              >
                {object.attributes.category.name}
              </Button>
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/sub_categories/" + object.attributes.sub_category.id}
                style={{ color: "black" }}
              >
                {object.attributes.sub_category.name}
              </Button>
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/users/" + object.attributes.user.id}
                style={{ color: "black" }}
              >
                {object.attributes.user.first_name}{" "}
                {object.attributes.user.last_name}
              </Button>
            </td>
            <td width="200" align="left">
              <Moment format="MM/DD/YYYY">
                {object.attributes.created_at}
              </Moment>
            </td>
            <td width="200" align="left">
              <Moment format="MM/DD/YYYY">
                {object.attributes.updated_at}
              </Moment>
            </td>
            <td width="200" align="left">
              {object.attributes.verified ? "true" : "false"}
            </td>
            <td width="100" align="center">
              <Button
                variant="link"
                href={"/coverages/" + object.attributes.id}
                style={{ color: "black" }}
              >
                <EyeFill />
              </Button>
            </td>
          </tr>
        );
      });
    };

    return (
      <>
        <PaginatedTable
          objects={this.props.coverages}
          showObjects={showObjects}
          tableHeaders={[
            "League",
            "Club",
            "Group",
            "Category",
            "Sub",
            "Entered By",
            "Date Created",
            "Last Updated",
            "Verified",
            "View",
          ]}
          onPageChange={(e, { activePage }) =>
            this.props.dispatch(
              fetchCoverages({ for_broker: this.state.id, page: activePage })
            )
          }
          defaultActivePage={this.props.page}
          totalPages={this.props.pages}
          status={this.props.coveragesStatus}
        />
      </>
    );
  };

  render() {
    return (
      <>
        <DetailStructure
          object={this.props.selected}
          status={this.props.status}
          name={this.state.name}
          formHelpers={formHelpers}
          form={(values, handleChange, setFieldValue, errors) =>
            form(
              values,
              handleChange,
              setFieldValue,
              errors,
              this.props.selected.attributes.company
            )
          }
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            this.props.dispatch(updateBroker({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            this.props.dispatch(deleteBroker(id));
          }}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

BrokerContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  errors: PropTypes.object,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, error, status } = state.brokers;
  const { coverages, pages, page } = state.coverages;
  const { link, redirect } = state.redirections;
  const coveragesStatus = state.coverages.status;
  return {
    selected,
    status,
    error,
    link,
    redirect,
    coverages,
    pages,
    page,
    coveragesStatus,
  };
}

export default connect(mapStateToProps)(BrokerContainer);
