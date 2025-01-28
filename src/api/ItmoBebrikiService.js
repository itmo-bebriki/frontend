import boardsApi from './types/Boards/requests';
import topicsApi from './types/Topics/requests';
import tasksApi from './types/Topics/requests';
import axios from 'axios';

import './types/Boards/boards';
import './types/Topics/topics';
import './types/Tasks/tasks';

const BASE_BOARD_URL = boardsApi;
const BASE_TOPIC_URL = topicsApi;
const BASE_TASK_URL = tasksApi;
const PAGE_SIZE = 1000;


class ItmoBebrikiServiceAPI {
    /**
     * @param {BoardsGetRequest} filter
     * @returns {Promise<BoardsGetResponse>}
     */
    async getBoards(filter) {
        try {
            filter.page_size = PAGE_SIZE;
            const response = await axios.get(`${BASE_BOARD_URL}`, {params: filter, headers: {"Content-Type": "application/json"}});
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении досок:', error.message);
            throw error;
        }
    }

    /**
     * @param {BoardCreateRequest} boardData
     * @returns {Promise<BoardCreateResponse>}
     */
    async createBoard(boardData) {
        try {
            const response = await axios.post(`${BASE_BOARD_URL}`, null, {params: boardData});
            return response.data;
        } catch (error) {
            console.error('Ошибка при создании доски:', error.message);
            throw error;
        }
    }

    /**
     * @param {number} id
     * @param {BoardUpdateRequest} boardData
     */
    async updateBoard(id, boardData) {
        try {
            await axios.put(`${BASE_BOARD_URL}/${id}`, null, {params: boardData});
        } catch (error) {
            console.error('Ошибка при обновлении доски:', error.message);
            throw error;
        }
    }

    /**
     * @param {number} id
     * @param {BoardSetTopicsRequest} addTopicsData
     */
    async addBoardTopics(id, addTopicsData) {
        try {
            console.log(addTopicsData);
            await axios.post(`${BASE_BOARD_URL}/${id}/topics`, null, {params: addTopicsData});
        } catch (error) {
            console.error('Ошибка при добавления топиков:', error.message);
            throw error;
        }
    }

    /**
     * @param {number} id
     * @param {BoardSetTopicsRequest} removeTopicsData
     */
    async removeBoardTopics(id, removeTopicsData) {
        try {
            await axios.delete(`${BASE_BOARD_URL}/${id}/topics`, {params: removeTopicsData});
        } catch (error) {
            console.error('Ошибка при добавления топиков:', error.message);
            throw error;
        }
    }

    /**
     * @param {TopicsGetRequest} filter
     * @returns {Promise<TopicsGetResponse>}
     */
    async getTopics(filter) {
        try {
            filter.page_size = PAGE_SIZE;
            const response = await axios.get(`${BASE_TOPIC_URL}`, {params: filter});
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении топиков:', error.message);
            throw error;
        }
    }

    /**
     * @param {TopicCreateRequest} topicData
     * @returns {Promise<TopicCreateResponse>}
     */
    async createTopic(topicData) {
        try {
            const response = await axios.post(`${BASE_TOPIC_URL}`, null, {params: topicData, headers: {"Content-Type": "application/json"}});
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка при создании топика:', error.message);
            throw error;
        }
    }

    /**
     * @param {number} id
     * @param {TopicUpdateRequest} topicData
     */
    async updateTopic(id, topicData) {
        try {
            await axios.put(`${BASE_TOPIC_URL}/${id}`, null, {params: topicData});
        } catch (error) {
            console.error('Ошибка при обновлении топика:', error.message);
            throw error;
        }
    }

    /**
    * @param {number} id
    * @param {TopicSetTasksRequest} addTasksData
    */
    async addTopicTasks(id, addTasksData) {
        try {
            await axios.put(`${BASE_TOPIC_URL}/${id}/tasks`, null, {params: addTasksData});
        } catch (error) {
            console.error('Ошибка при добавления задач:', error.message);
            throw error;
        }
    }

    /**
    * @param {number} id
    * @param {TopicSetTasksRequest} removeTasksData
    */
    async removeTopicTasks(id, removeTasksData) {
        try {
            await axios.delete(`${BASE_TOPIC_URL}/${id}/tasks`, {params: removeTasksData});
        } catch (error) {
            console.error('Ошибка при удалении задач:', error.message);
            throw error;
        }
    }

    /**
     * @param {TasksGetRequest} filter
     * @returns {Promise<TasksGetResponse>}
     */
    async getTasks(filter) {
        try {
            filter.page_size = PAGE_SIZE;
            const response = await axios.get(`${BASE_TASK_URL}`, {params: filter});
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении задач:', error.message);
            throw error;
        }
    }

    /**
     * @param {TaskCreateRequest} taskData
     * @returns {Promise<TaskCreateResponse>}
     */
    async createTask(taskData) {
        try {
            const response = await axios.post(`${BASE_TASK_URL}`, null, {params: taskData, headers: {"Content-Type": "application/json"}});
            return response.data;
        } catch (error) {
            console.error('Ошибка при создании задачи:', error.message);
            throw error;
        }
    }

    /**
     * @param {number} id
     * @param {TaskUpdateRequest} taskData
     */
    async updateTask(id, taskData) {
        try {
            await axios.put(`${BASE_TASK_URL}/${id}`, null, {params: taskData});
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error.message);
            throw error;
        }
    }

    /**
     * @param {number} id
     * @param {TaskSetDependenciesRequest} dependencies
     */
    async updateTaskDependencies(id, dependencies) {
        try {
            await axios.put(`${BASE_TASK_URL}/${id}/deps`, null, {params: dependencies});
        } catch (error) {
            console.error('Ошибка при добавлении зависимых задач:', error.message);
            throw error;
        }
    }

    /**
     * @param {number} id
     * @param {TaskSetDependenciesRequest} dependencies
     */
    async removeTaskDependencies(id, dependencies) {
        try {
            await axios.delete(`${BASE_TASK_URL}/${id}/deps`, {params: dependencies});
        } catch (error) {
            console.error('Ошибка при удалении зависимых задач:', error.message);
            throw error;
        }
    }
}

export const apiInstance = new ItmoBebrikiServiceAPI();
