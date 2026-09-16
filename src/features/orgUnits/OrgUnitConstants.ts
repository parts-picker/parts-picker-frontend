import { IconNames } from "@blueprintjs/icons";

// shared between server & client, must not read process env

export const ORG_UNITS_PATH = "/org-units";

export const ORG_UNIT_COOKIE_NAME = "pp-org-unit";
export const ORG_UNIT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

// org units loaded per page
export const ORG_UNITS_PAGE_SIZE = 20;

export const ORG_UNIT_ICON = IconNames.AREA_OF_INTEREST;

export const ORG_UNIT_CACHE_REVALIDATE_SECONDS = 60;
