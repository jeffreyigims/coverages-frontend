import React, { Component } from "react";
import { connect } from "react-redux";
import CompanyDetails from "./CompanyDetails";
import PropTypes from "prop-types";
import { companies as formHelpers } from "../../utils/Schemas";
import { companyForm as form } from "../../utils/Forms";
import { brokers as formHelpersBroker } from "../../utils/Schemas";
import { brokerForm as formBroker } from "../../utils/Forms";
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
    return (
      <>
        <CompanyDetails
          object={this.props.selected}
          secondary={this.props.secondary}
          status={this.props.status}
          name={this.state.name}
          formHelpers={formHelpers}
          form={form}
          formHelpersBroker={formHelpersBroker}
          formBroker={(values, handleChange, setFieldValue, errors) =>
            formBroker(
              values,
              handleChange,
              setFieldValue,
              errors,
              this.props.selected.attributes
            )
          }
          postSub={(values) => this.postSubBroker(values)}
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
  const { selected, status, error, secondary } = state.companies;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect, secondary };
}

export default connect(mapStateToProps)(CompanyContainer);
