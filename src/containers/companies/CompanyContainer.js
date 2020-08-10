import React, { Component } from "react";
import { connect } from "react-redux";
import CompanyDetails from "./CompanyDetails";
import PropTypes from "prop-types";
import {
  fetchCompany,
  updateCompany,
  deleteCompany,
  postBroker,
} from "../../actions/Actions";

class CompanyContainer extends Component {
  state = {
    name: "company",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchCompany(this.state.id));
  }

  postSubBroker = (values) => {
    const new_object = {
      name: values.name,
      company_id: this.props.selected.attributes.id,
    };
    this.props.dispatch(postBroker(new_object));
  };

  render() {
    const { dispatch } = this.props;
    return (
      <>
        <CompanyDetails
          {...this.props}
          name={this.state.name}
          postBroker={(values) => this.postSubBroker(values)}
          updateObject={(id, values) => {
            dispatch(updateCompany({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            dispatch(deleteCompany(id));
          }}
        />
      </>
    );
  }
}

CompanyContainer.propTypes = {
  selected: PropTypes.object.isRequired,
  secondary: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { selected, status, secondary } = state.companies;
  const redirections = state.redirections;
  return { selected, status, redirections, secondary };
}

export default connect(mapStateToProps)(CompanyContainer);
