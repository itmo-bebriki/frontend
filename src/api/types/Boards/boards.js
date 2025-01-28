/**
 * @module boards
 */

/**
 * @typedef {Object} BoardDto
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number[]} topicIds
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} BoardCreateRequest
 * @property {string} name
 * @property {string} description
 * @property {number[]} topicIds
 */

/**
 * @typedef {Object} BoardCreateResponse
 * @property {number} id
 */

/**
 * @typedef {Object} BoardsGetRequest
 * @property {number[]} boardIds
 * @property {string} fromUpdatedAt
 * @property {string} toUpdatedAt
 * @property {number} cursor
 * @property {number} pageSize
 */

/**
 * @typedef {Object} BoardsGetResponse
 * @property {number} cursor
 * @property {BoardDto[]} boards
 */

/**
 * @typedef {Object} BoardSetTopicsRequest
 * @property {number[]} topicIds
 */

/**
 * @typedef {Object} BoardUpdateRequest
 * @property {string} name
 * @property {string} description
 */
