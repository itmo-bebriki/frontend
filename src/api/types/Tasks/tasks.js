/**
 * @module tasks
 */

/**
 * @typedef {Object} TaskDto
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} assigneeId
 * @property {number} jobTaskState
 * @property {number} jobTaskPriority
 * @property {number[]} dependOnJobTaskIds
 * @property {string} deadline
 * @property {bool} isAgreed
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} TaskCreateRequest
 * @property {string} title
 * @property {string} description
 * @property {number} assigneeId
 * @property {number} jobTaskPriority
 * @property {number[]} dependOnJobTaskIds
 * @property {string} deadline
 */

/**
 * @typedef {Object} TaskCreateResponse
 * @property {number} id
 */

/**
 * @typedef {Object} TasksGetRequest
 * @property {number[]} jobTaskIds
 * @property {number} assigneeId
 * @property {number[]} states
 * @property {number[]} priorities
 * @property {number[]} dependsOnTaskIds
 * @property {string} fromDeadline
 * @property {string} toDeadline
 * @property {string} fromUpdatedAt
 * @property {string} toUpdatedAt
 * @property {number} cursor
 * @property {number} pageSize
 */

/**
 * @typedef {Object} TasksGetResponse
 * @property {number} cursor
 * @property {TaskDto[]} jobTasks
 */

/**
 * @typedef {Object} TaskSetDependenciesRequest
 * @property {number[]} dependsOnTaskIds
 */

/**
 * @typedef {Object} TaskUpdateRequest
 * @property {string} title
 * @property {string} description
 * @property {number} assigneeId
 * @property {number} jobTaskPriority
 * @property {string} deadline
 * @property {bool} isAgreed
 */
