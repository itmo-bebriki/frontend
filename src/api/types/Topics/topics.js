/**
 * @module topics
 */

/**
 * @typedef {Object} TopicDto
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number[]} taskIds
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} TopicCreateRequest
 * @property {string} name
 * @property {string} description
 * @property {number[]} taskIds
 */

/**
 * @typedef {Object} TopicCreateResponse
 * @property {number} topicId
 */

/**
 * @typedef {Object} TopicsGetRequest
 * @property {number[]} topicIds
 * @property {string} fromUpdatedAt
 * @property {string} toUpdatedAt
 * @property {number} cursor
 * @property {number} pageSize
 */

/**
 * @typedef {Object} TopicsGetResponse
 * @property {number} cursor
 * @property {TopicDto[]} tasks
 */

/**
 * @typedef {Object} TopicSetTasksRequest
 * @property {number[]} taskIds
 */

/**
 * @typedef {Object} TopicUpdateRequest
 * @property {string} name
 * @property {string} description
 */
