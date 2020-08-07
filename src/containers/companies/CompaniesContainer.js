import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { companies as formHelpers } from "../../utils/Schemas";
import { companyForm as form } from "../../utils/Forms";
import { fetchCompanies, postCompany } from "../../actions/Actions";

class CompaniesContainer extends Component {
  state = {
    tableHeaders: ["Name", "Brokers"],
    name: "company",
    plural: "companies",
  };

  componentDidMount() {
    this.props.dispatch(fetchCompanies());
  }

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/companies/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.brokers.length}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <ListStructure
          objects={this.props.companies}
          status={this.props.status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          formHelpers={formHelpers}
          form={form}
          postObject={(values) => this.props.dispatch(postCompany(values))}
        />
      </>
    );
  }
}

CompaniesContainer.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  const { companies, status, error } = state.companies;
  return { companies, status, error };
}

export default connect(mapStateToProps)(CompaniesContainer);
