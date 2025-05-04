/**
 *  Noroff API Key.
 * @constant {string}
 */
export const API_KEY = "c949bdba-e191-40b8-962d-b009ea056f4c";

/**
 * access token for authorization.
 * @constant {string}
 */
export const ACCESS_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU09DQU5JQ09ERSIsImVtYWlsIjoiYXplc2FtMDI3NDVAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NDU3MDg2MTl9.ZZ4OUekOyb0bbVD0C_sROe13PMekYxqgrv1Mj_5qw6Y";

/**
 * Base API URL.
 * @constant {string}
 */
export const API_BASE = "https://v2.api.noroff.dev";

/**
 * Auth endpoints.
 */
export const API_AUTH = `${API_BASE}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`; // POST login
export const API_AUTH_REGISTER = `${API_AUTH}/register`; // POST register

/**
 * Social-profiles endpoints.
 */

/**
 * Social base.
 */
export const API_SOCIAL = `${API_BASE}/social`;

/**
 * Profile-related endpoints.
 */
export const API_PROFILES_BASE = `${API_SOCIAL}/profiles`; // base: /profiles

export const API_PROFILE_BY_NAME = (name) => `${API_PROFILES_BASE}/${name}`; // GET or PUT
export const API_PROFILE_POSTS = (name) => `${API_PROFILES_BASE}/${name}/posts`; // GET
export const API_PROFILE_SEARCH = (query) =>
  `${API_PROFILES_BASE}/search?q=${query}`; // GET
export const API_PROFILE_FOLLOW = (name) =>
  `${API_PROFILES_BASE}/${name}/follow`; // PUT
export const API_PROFILE_UNFOLLOW = (name) =>
  `${API_PROFILES_BASE}/${name}/unfollow`; // PUT

/**
 * Post-related endpoints.
 */
export const API_POSTS_BASE = `${API_SOCIAL}/posts`;

export const API_POST_BY_ID = (id) => `${API_POSTS_BASE}/${id}`; // GET, PUT, DELETE
export const API_POST_REACT = (id, symbol) =>
  `${API_POSTS_BASE}/${id}/react/${encodeURIComponent(symbol)}`; // PUT
export const API_POST_COMMENT = (id) => `${API_POSTS_BASE}/${id}/comment`; // GET, POST
export const API_DELETE_COMMENT = (id, commentId) =>
  `${API_POSTS_BASE}/${id}/comment/${commentId}`; // DELETE
export const API_POSTS_FOLLOWING = `${API_POSTS_BASE}/following`; // GET
export const API_POSTS_TAG_FILTER = (tag) => `${API_POSTS_BASE}/?_tag=${tag}`; // GET
