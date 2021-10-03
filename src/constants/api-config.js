/**
 * Dev Server
 */
//export const BASE_API_URL = '';
//export const BASE_SOCKET_ENDPOINT = '';

/**
 * Local Server
 */
const production = process.env.NODE_ENV == "production" ? true : true

export const BASE_API_URL = production ? 'http://3.108.124.251:8080/api/' : 'http://localhost:8080/api/';
export const BASE_SOCKET_ENDPOINT = production ? 'http://3.108.124.251:8080' : 'http://localhost:8080';