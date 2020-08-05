import React from "react";
import { Form, Row, Col } from "react-bootstrap";

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
  return objects.map((object, index) => {
    return (
      <option key={index} value={index}>
        {object.data.attributes.group.name}
      </option>
    );
  });
};

export const objectDataOptions = (objects) => {
  return objects.map((object, index) => {
    return (
      <option key={index} value={index}>
        {object.data.attributes.name}
      </option>
    );
  });
};

export function sportForm(values, handleChange, setFieldValue, errors) {
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

export function leagueForm(
  values,
  handleChange,
  setFieldValue,
  errors,
  sports
) {
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
            {objectOptions(sports)}
          </Form.Control>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          {errors.sport_index}
        </Form.Control.Feedback>
      </Row>
    </>
  );
}

export function clubForm(values, handleChange, setFieldValue, errors, leagues) {
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
            {objectOptions(leagues)}
          </Form.Control>
        </Form.Group>
      </Row>
    </>
  );
}

export function companyForm(values, handleChange, setFieldValue, errors) {
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

export function categoryForm(values, handleChange, setFieldValue, errors) {
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

export function carrierForm(
  values,
  handleChange,
  setFieldValue,
  errors,
  leagues
) {
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

export function userForm(values, handleChange, setFieldValue, errors, leagues) {
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

export function brokerForm(values, handleChange, setFieldValue, errors) {
  return (
    <>
      {" "}
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Company:</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={values.company.name}
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

export function coverageForm(
  values,
  handleChange,
  setFieldValue,
  errors,
  clubs,
  categories,
  carriers,
  brokers
) {
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
            {objectOptions(clubs)}
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
              clubs[values.club_index].attributes.club_groups
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
            {objectOptions(categories)}
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
              categories[values.category_index].attributes.sub_categories
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
          >
            {objectOptions(carriers)}
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
          >
            {objectOptions(brokers)}
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
          {/* <DatePicker
            name="start_date"
            selected={values.start_date}
            onChange={(val) => setFieldValue("start_date", val)}
          /> */}
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>{"Ending Date:"}</Form.Label>
          {/* <DatePicker
            name="end_date"
            selected={values.end_date}
            onChange={(val) => setFieldValue("end_date", val)}
          /> */}
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col}>
          <Form.Check
            type="checkbox"
            name="has_coverage_line"
            label={"Has Coverage Line"}
            value={values.has_coverage_line}
            onChange={handleChange}
          />
        </Form.Group>

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

export function groupForm(
  values,
  handleChange,
  setFieldValue,
  errors,
  leagues
) {
  return (
    <>
      {" "}
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

export function objectForm(
  values,
  handleChange,
  setFieldValue,
  errors,
  leagues
) {
  return <></>;
}
