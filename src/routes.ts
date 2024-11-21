/**
 * An array of routes that are accessible to unauthenticated users
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used to authenticate users
 * These redirect loggedIn users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/signin", "/signup", "/error"];

/**
 * The prefix of all api authentication routes
 *
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default route to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
