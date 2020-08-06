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
      return object.attributes.club_groups.length === 0 ? true : false;
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
    case "user":
      return object.attributes.coverages.length === 0 &&
        object.attributes.club === ""
        ? true
        : false;
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
