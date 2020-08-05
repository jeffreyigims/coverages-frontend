import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import { companies as formHelpers } from "../../utils/Schemas";
import { companyForm as form } from "../../utils/Forms";
import {
  fetchCompany,
  updateCompany,
  deleteCompany,
} from "../../actions/Actions";

class CompanyContainer extends Component {
  state = {
    name: "company",
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch(fetchCompany(id));
  }

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/brokers/" + object.data.attributes.id}
                style={{ color: "black" }}
              >
                {object.data.attributes.name}
              </Button>
            </td>
            <td width="200" align="left">
              {object.data.attributes.associated_coverages}
            </td>
          </tr>
        );
      });
    };

    return (
      <GeneralTable
        objects={object.attributes.brokers}
        showObjects={showObjects}
        tableHeaders={["Name", "Associated"]}
      />
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
            this.props.dispatch(updateCompany({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            this.props.dispatch(deleteCompany(id));
          }}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

CompanyContainer.propTypes = {
  selected: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, status, error } = state.companies;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect };
}

export default connect(mapStateToProps)(CompanyContainer);
