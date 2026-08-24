// shared variables for server & client
// cannot contain process env variables

export const REDIRECT_TO_PARAM_NAME = "redirectTo";
export const TARGET_URL_PARAM_NAME = "targetUrl";

export const LOGIN_REQUIRED_ERROR_CODE = "login_required";

export type InteralResponseErrors = {
  errorCode: string;
};
