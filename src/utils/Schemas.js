import * as yup from "yup";
import { formatDate } from "./Helpers";

const sports = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

const leagues = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
    level: "",
    sport_index: 0,
  },
};

const clubs = {
  schema: yup.object({
    name: yup.string().required(),
    abbreviation: yup.string(),
  }),
  initialValues: {
    name: "",
    abbreviation: "",
    league_index: 0,
  },
};

const groups = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

const club_groups = {
  schema: yup.object({
    group_index: yup.string().required(),
  }),
  initialValues: {
    group_index: 0,
  },
};

const companies = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

const brokers = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

const carriers = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

const categories = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

const sub_categories = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

const coverages = {
  schema: yup.object({
    club_index: yup.string(),
    group_index: yup.string(),
    category_index: yup.string(),
    sub_category_index: yup.string(),
    notes: yup.string(),
    start_date: yup.string().nullable(),
    end_date: yup.string().nullable(),
    has_coverage_line: yup.string().required(),
    verified: yup.boolean().required(),
  }),
  initialValues: {
    club_index: 0,
    group_index: 0,
    category_index: 0,
    sub_category_index: 0,
    carriers: [],
    brokers: [],
    notes: "",
    start_date: formatDate(new Date()),
    end_date: formatDate(null),
    has_coverage_line: "yes",
    verified: false,
  },
};

const coverage_wizard = {
  schema: yup.object({
    club_index: yup.string().required(),
    group_index: yup.string().required(),
    category_index: yup.string().required(),
    sub_category_index: yup.string().required(),
    notes: yup.string(),
    start_date: yup.string().nullable(),
    end_date: yup.string().nullable(),
    has_coverage_line: yup.string().required(),
    verified: yup.boolean().required(),
  }),
  initialValues: {
    sport_index: 0,
    league_index: 0,
    club_index: 0,
    group_index: 0,
    category_index: 0,
    sub_category_index: 0,
    carriers: [],
    brokers: [],
    notes: "",
    start_date: formatDate(new Date()),
    end_date: formatDate(null),
    has_coverage_line: "yes",
    verified: false,
  },
};

const users = {
  schema: yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    role: yup.string().required(),
    username: yup.string().required(),
  }),
  initialValues: {
    first_name: "",
    last_name: "",
    role: "admin",
    username: "",
  },
};

const login = {
  schema: yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
  initialValues: {
    username: "",
    password: "",
  },
};

const filter = {
  schema: yup.object({
    group_index: yup.string().required(),
    category_index: yup.string().required(),
    sub_category_index: yup.string().required(),
    order_index: yup.string().required(),
  }),
  initialValues: {
    group_index: "-1",
    category_index: "-1",
    sub_category_index: "-1",
    order_index: "-1",
  },
};

export function schemaFor(name) {
  switch (name) {
    case "sport":
      return sports;
    case "league":
      return leagues;
    case "club":
      return clubs;
    case "group":
      return groups;
    case "club_group":
      return club_groups;
    case "category":
      return categories;
    case "sub category":
      return sub_categories;
    case "carrier":
      return carriers;
    case "company":
      return companies;
    case "broker":
      return brokers;
    case "coverage":
      return coverages;
    case "coverage_wizard":
      return coverage_wizard;
    case "user":
      return users;
    case "login":
      return login;
    case "filter":
      return filter;
    default:
      return;
  }
}
