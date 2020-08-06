import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import { EyeFill } from "react-bootstrap-icons";
import PaginatedTable from "../../components/PaginatedTable";
import { carriers as formHelpers } from "../../utils/Schemas";
import { carrierForm as form } from "../../utils/Forms";
import {
  fetchCarrier,
  updateCarrier,
  deleteCarrier,
  fetchCoverages,
} from "../../actions/Actions";

class CarrierContainer extends Component {
  state = {
    name: "carrier",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchCarrier(this.state.id));
    this.props.dispatch(fetchCoverages({ for_carrier: this.state.id }));
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
          status={this.props.status}
          onPageChange={(e, { activePage }) =>
            this.props.dispatch(
              fetchCoverages({ for_carrier: this.state.id, page: activePage })
            )
          }
          defaultActivePage={this.props.page}
          totalPages={this.props.pages}
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
          form={form}
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            this.props.dispatch(updateCarrier({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            this.props.dispatch(deleteCarrier(id));
          }}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

CarrierContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  errors: PropTypes.object,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, status, error } = state.carriers;
  const { coverages, pages, page } = state.coverages;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect, coverages, pages, page };
}

export default connect(mapStateToProps)(CarrierContainer);
