import React from "react";
import { Spinner, Row } from "react-bootstrap";
import * as moment from "moment";
import Moment from "react-moment";

// Returns a capitalized string for use in page titles
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Used in determining if a button should be displayed to delete a specific object
export function canDelete(object) {
  switch (object.type) {
    case "sport":
      return object.attributes.leagues.length === 0 ? true : false;
    case "league":
      return object.attributes.clubs.length === 0 ? true : false;
    case "club":
      return object.attributes.coverages_count === 0 ? true : false;
    case "company":
      return object.attributes.brokers.length === 0 ? true : false;
    case "broker":
      return object.attributes.coverages.length === 0 ? true : false;
    case "carrier":
      return object.attributes.coverages.length === 0 ? true : false;
    case "category":
      return object.attributes.sub_categories.length === 0 ? true : false;
    case "sub_category":
      return object.attributes.coverages.length === 0 ? true : false;
    case "group":
      return object.attributes.club_groups.length === 0 ? true : false;
    case "user_table":
      return false;
    case "user":
      return false;
    default:
      return true;
  }
}

// Takes a group of statuses and returns a successful status if all of the statuses are marked successfull
export function groupStatus(statuses) {
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
}

// Generates either a different display based on the status
export function statusDisplay(status, success) {
  switch (status) {
    case "loading":
      return (
        <Row className="row justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      );
    case "failed":
      return "The data could not be displayed at this time.";
    case "succeeded":
      return success;
    default:
      return;
  }
}

// Used in modal components
export function switchModal(name) {
  const modal = name;
  this.setState((prevState) => ({
    [modal]: !prevState[modal],
  }));
}

// Maps list of keys to the values of an object
export function map(name, values, object, additional) {
  var new_values = {};
  for (var key in values) {
    new_values[key] = object[key];
  }
  switch (name) {
    case "club":
      new_values["league_index"] = additional.leagues.findIndex(
        (league) => league.attributes.id === object.league_id
      );
      break;
    case "league":
      new_values["sport_index"] = additional.sports.findIndex(
        (sport) => sport.attributes.id === object.sport_id
      );
      break;
    default:
      break;
  }
  return new_values;
}

// Returns date formatted or null
export function formatDate(date) {
  return date == null || date === "Invalid date"
    ? null
    : moment(date).format("YYYY-MM-DD");
}

// For displaying dates in tables of coverages
export function displayDate(date, format) {
  return date === null ? "N/A" : <Moment format={format}>{date}</Moment>;
}

// For unique identification with pending coverages
export function getRandom() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
