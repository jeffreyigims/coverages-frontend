export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
    case "sub_categories":
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
