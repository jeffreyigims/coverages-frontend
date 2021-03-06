import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { formatDate } from "./Helpers";

export const objectOptions = (objects) => {
  return objects.map((object, index) => {
    return (
      <option key={index} value={index}>
        {object.attributes.name}
      </option>
    );
  });
};

export const objectOptionsID = (objects) => {
  return objects.map((object, index) => {
    return (
      <option key={index} value={object.attributes.id}>
        {object.attributes.name}
      </option>
    );
  });
};

export const objectGroupOptions = (objects) => {
  return objects?.map((object, index) => {
    return (
      <option key={index} value={index}>
        {object.data.attributes.group.name}
      </option>
    );
  });
};

export const objectDataOptions = (objects) => {
  return objects?.map((object, index) => {
    return (
      <option key={index} value={index}>
        {object.data.attributes.name}
      </option>
    );
  });
};

export const brokerOptions = (objects) => {
  return objects.map((object, index) => {
    return (
      <option key={index} value={index}>
        {object.attributes.name} - {object.attributes.company.name}
      </option>
    );
  });
};

export const brokerOptionsID = (objects) => {
  return objects.map((object, index) => {
    return (
      <option key={index} value={object.attributes.id}>
        {object.attributes.name} - {object.attributes.company.name}
      </option>
    );
  });
};

function clubOptions(all_clubs, league) {
  const league_id = league?.data.attributes.id;
  let clubs = all_clubs.filter(
    (club) => club.attributes.league_id === league_id
  );
  return objectOptions(clubs);
}

const orderOptions = (objects) => {
  return objects.map((object, index) => {
    return (
      <option key={index} value={index}>
        {object.Name}
      </option>
    );
  });
};

export const subOptions = (objects, index) => {
  var new_objects;
  if (index === "-1") {
    new_objects = objects
      .map((object) => object.attributes.sub_categories)
      .flat();
  } else {
    new_objects = objects[index]?.attributes.sub_categories;
  }
  return new_objects?.map((object, index) => {
    return (
      <option key={index} value={index}>
        {object.data.attributes.name}
      </option>
    );
  });
};

function sportForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <Row>
      <Form.Group as={Col}>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
}

function leagueForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Level:</Form.Label>
          <Form.Control
            type="text"
            name="level"
            value={values.level}
            onChange={handleChange}
            isInvalid={!!errors.level}
          />
          <Form.Control.Feedback type="invalid">
            {errors.level}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Sport:</Form.Label>
          <Form.Control
            as="select"
            name="sport_index"
            value={values.sport_index}
            onChange={handleChange}
            isInvalid={!!errors.sport_index}
          >
            {objectOptions(additional.sports)}
          </Form.Control>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          {errors.sport_index}
        </Form.Control.Feedback>
      </Row>
    </>
  );
}

function clubForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>{" "}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Code:</Form.Label>
          <Form.Control
            type="text"
            name="abbreviation"
            value={values.abbreviation}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>League:</Form.Label>
          <Form.Control
            as="select"
            name="league_index"
            value={values.league_index}
            onChange={handleChange}
          >
            {objectOptions(additional.leagues)}
          </Form.Control>
        </Form.Group>
      </Row>
    </>
  );
}

function companyForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

function brokerForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Company:</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={
              additional.company.attributes?.company.name ||
              additional.company.name
            }
            disabled
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

function categoryForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

function subCategoryForm(
  values,
  handleChange,
  setFieldValue,
  errors,
  additional
) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={
              additional.selected.attributes.category?.name ||
              additional.selected.attributes.name
            }
            disabled
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

function carrierForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

function roleOptions() {
  return ["admin", "contact", "employee"].map((object, index) => {
    return (
      <option key={index} value={object}>
        {object}
      </option>
    );
  });
}

function userForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            isInvalid={!!errors.first_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.first_name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            isInvalid={!!errors.last_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.last_name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Role:</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={values.role}
            onChange={handleChange}
          >
            {roleOptions()}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

export function handleCoverageLineChange(event, setFieldValue) {
  if (event.target.value === "yes") {
    setFieldValue("start_date", formatDate(new Date()));
  } else {
    setFieldValue("carriers", []);
    setFieldValue("brokers", []);
    setFieldValue("start_date", formatDate(null));
    setFieldValue("end_date", formatDate(null));
  }
}

function coverageForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
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
            {objectOptions(additional.clubs)}
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
              additional.clubs[values.club_index]?.attributes.club_groups
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
            {objectOptions(additional.categories)}
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
              additional.categories[values.category_index]?.attributes
                .sub_categories
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
                  (option) => option.value
                )
              )
            }
            disabled={values.has_coverage_line === "yes" ? false : true}
          >
            {objectOptions(additional.carriers)}
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
                  (option) => option.value
                )
              )
            }
            disabled={values.has_coverage_line === "yes" ? false : true}
          >
            {brokerOptions(additional.brokers)}
          </Form.Control>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col}>
          <Form.Label>{"Has Coverage Line:"}</Form.Label>
          <Form.Control
            as="select"
            name="has_coverage_line"
            value={values.has_coverage_line}
            onChange={(event) => {
              handleChange(event);
              handleCoverageLineChange(event, setFieldValue);
            }}
          >
            <option>yes</option>
            <option>no</option>
            <option>unknown</option>
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
            onChange={(val) => setFieldValue("start_date", formatDate(val))}
            disabled={values.has_coverage_line === "yes" ? false : true}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>{"Ending Date:"}</Form.Label>
          <DatePickerInput
            name="end_date"
            value={values.end_date}
            onChange={(val) => setFieldValue("end_date", formatDate(val))}
            disabled={values.has_coverage_line === "yes" ? false : true}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col}></Form.Group>

        <Form.Group as={Col}>
          <Form.Check
            type="checkbox"
            name="verified"
            label={"Verified"}
            value={values.verified}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
    </>
  );
}

function coverageWizardForm(
  values,
  handleChange,
  setFieldValue,
  errors,
  additional
) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Sport:</Form.Label>
          <Form.Control
            as="select"
            name="sport_index"
            value={values.sport_index}
            onChange={handleChange}
          >
            {objectOptions(additional.sports)}
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
              additional.sports[values.sport_index]?.attributes.leagues
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
            {clubOptions(
              additional.clubs,
              additional.sports[values.sport_index]?.attributes.leagues[
                values.league_index
              ]
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
              additional.clubs[values.club_index]?.attributes.club_groups
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
            {objectOptions(additional.categories)}
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
              additional.categories[values.category_index]?.attributes
                .sub_categories
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
                Array.from(event.target.selectedOptions, (option) =>
                  Number(option.value)
                )
              )
            }
            disabled={values.has_coverage_line === "yes" ? false : true}
          >
            {objectOptions(additional.carriers)}
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
                Array.from(event.target.selectedOptions, (option) =>
                  Number(option.value)
                )
              )
            }
            disabled={values.has_coverage_line === "yes" ? false : true}
          >
            {brokerOptions(additional.brokers)}
          </Form.Control>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>{"Has Coverage Line:"}</Form.Label>
          <Form.Control
            as="select"
            name="has_coverage_line"
            value={values.has_coverage_line}
            onChange={(event) => {
              handleChange(event);
              handleCoverageLineChange(event, setFieldValue);
            }}
          >
            <option>yes</option>
            <option>no</option>
            <option>unknown</option>
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
            onChange={(val) => setFieldValue("start_date", formatDate(val))}
            disabled={values.has_coverage_line === "yes" ? false : true}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>{"Ending Date:"}</Form.Label>
          <DatePickerInput
            name="end_date"
            value={values.end_date}
            onChange={(val) => setFieldValue("end_date", formatDate(val))}
            disabled={values.has_coverage_line === "yes" ? false : true}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}></Form.Group>

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
    </>
  );
}

function groupForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

function clubGroupForm(
  values,
  handleChange,
  setFieldValue,
  errors,
  additional
) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Group:</Form.Label>
          <Form.Control
            as="select"
            name="group_index"
            value={values.group_index}
            onChange={handleChange}
          >
            {objectOptions(additional.groups)}
          </Form.Control>
        </Form.Group>
      </Row>
    </>
  );
}

function loginForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

function filterForm(values, handleChange, setFieldValue, errors, additional) {
  return (
    <>
      <Form.Group>
        <Row>
          <Form.Label column lg={2}>
            Group:
          </Form.Label>
          <Col>
            <Form.Control
              as="select"
              name="group_index"
              value={values.group_index}
              onChange={handleChange}
            >
              <option key={-1} value={"-1"}>
                {"All"}
              </option>
              {objectOptions(additional.groups)}
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Form.Label column lg={2}>
            Category:
          </Form.Label>
          <Col>
            <Form.Control
              as="select"
              name="category_index"
              value={values.category_index}
              onChange={(e) => {
                handleChange(e);
                setFieldValue("sub_category_index", "-1");
              }}
            >
              <option key={-1} value={"-1"}>
                {"All"}
              </option>
              {objectOptions(additional.categories)}
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Form.Label column lg={2}>
            Sub:
          </Form.Label>
          <Col>
            <Form.Control
              as="select"
              name="sub_category_index"
              value={values.sub_category_index}
              onChange={handleChange}
            >
              <option key={-1} value={"-1"}>
                {"All"}
              </option>
              {subOptions(additional.categories, values.category_index)}
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Form.Label column lg={2}>
            Line:
          </Form.Label>
          <Col>
            <Form.Control
              as="select"
              name="has_coverage_line"
              value={values.has_coverage_line}
              onChange={(event) => {
                handleChange(event);
                handleCoverageLineChange(event, setFieldValue);
              }}
            >
              <option key={-1} value={"-1"}>
                {"All"}
              </option>
              <option key={0} value={"yes"}>
                {"Yes"}
              </option>
              <option key={1} value={"no"}>
                {"No"}
              </option>
              <option key={2} value={"unknown"}>
                {"Unknown"}
              </option>
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Form.Label column lg={2}>
            Verified:
          </Form.Label>
          <Col>
            <Form.Control
              as="select"
              name="verified"
              value={values.verified}
              onChange={handleChange}
            >
              <option key={-1} value={"-1"}>
                {"All"}
              </option>
              <option key={0} value={"verified"}>
                {"Verified"}
              </option>
              <option key={1} value={"unverified"}>
                {"Unverified"}
              </option>
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Form.Label column lg={2}>
            Order:
          </Form.Label>
          <Col>
            <Form.Control
              as="select"
              name="order_index"
              value={values.order_index}
              onChange={handleChange}
            >
              <option key={-1} value={"-1"}>
                {"None"}
              </option>
              {orderOptions(additional.orders)}
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
}

export function formFor(name, ...values) {
  switch (name) {
    case "sport":
      return sportForm(...values);
    case "league":
      return leagueForm(...values);
    case "club":
      return clubForm(...values);
    case "group":
      return groupForm(...values);
    case "club_group":
      return clubGroupForm(...values);
    case "category":
      return categoryForm(...values);
    case "sub category":
      return subCategoryForm(...values);
    case "carrier":
      return carrierForm(...values);
    case "company":
      return companyForm(...values);
    case "broker":
      return brokerForm(...values);
    case "coverage":
      return coverageForm(...values);
    case "coverage_wizard":
      return coverageWizardForm(...values);
    case "user":
      return userForm(...values);
    case "login":
      return loginForm(...values);
    case "filter":
      return filterForm(...values);
    default:
      return;
  }
}
