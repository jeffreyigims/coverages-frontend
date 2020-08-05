import * as yup from "yup";

export const sports = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

export const leagues = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
    level: "",
    sport_index: 0,
  },
};

export const clubs = {
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

export const groups = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

export const club_groups = {
  schema: yup.object({
    club_index: yup.string().required(),
    group_index: yup.string().required(),
  }),
  initialValues: {
    club_index: 0,
    group_index: 0,
  },
};

export const companies = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

export const brokers = {
  schema: yup.object({
    name: yup.string().required(),
    company: yup.string().required(),
  }),
  initialValues: {
    name: "",
    company: 0,
  },
};

export const carriers = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

export const categories = {
  schema: yup.object({
    name: yup.string().required(),
  }),
  initialValues: {
    name: "",
  },
};

export const sub_categories = {
  schema: yup.object({
    name: yup.string().required(),
    category_index: yup.string().required(),
  }),
  initialValues: {
    name: "",
    category_index: 0,
  },
};

export const coverages = {
  schema: yup.object({
    // club_index: yup.string().required(),
    // group_index: yup.string().required(),
    // category_index: yup.string().required(),
    // sub_category_index: yup.string().required(),
    // notes: yup.string(),
    // start_date: yup.date(),
    // end_date: yup.date(),
    // has_coverage_line: yup.boolean().required(),
    // verified: yup.boolean().required(),
  }),
  initialValues: {
    club_index: 0,
    group_index: 0,
    category_index: 0,
    sub_category_index: 0,
    carriers: [],
    brokers: [],
    notes: "",
    start_date: new Date(),
    end_date: null,
    has_coverage_line: false,
    verified: false,
  },
};

export const users = {
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
