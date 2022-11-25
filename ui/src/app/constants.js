export const BASE_API_URL = window._env_.API_URL;

export const action_status = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

export const MESSAGE_VARIANT = {
  SUCCESS: "success",
  ERROR: "error",
};

export const MESSAGE_ERRORS = {
  UNAUTHORIZE: "You don't have permission to acess this resource",
};

export const ROLES = {
  ADMIN: "Admin",
};

export const BASE_S3_URL =
window._env_.S3_BASE_URL || "https://sioaybucket.s3.ap-southeast-1.amazonaws.com/";
