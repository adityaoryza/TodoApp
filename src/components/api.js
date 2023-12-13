// api.js

import axios from 'axios';

const baseURL = 'https://api.adityaoryza.my.id';

export const getAllActivityGroups = () =>
  axios.get(`${baseURL}/activity-groups`);

export const getActivityGroup = (activityId) =>
  axios.get(`${baseURL}/activity-groups/${activityId}`);

export const createActivityGroup = (activityData) =>
  axios.post(`${baseURL}/activity-groups`, activityData);

export const updateActivityGroup = (activityId, activityData) =>
  axios.patch(`${baseURL}/activity-groups/${activityId}`, activityData);

export const deleteActivityGroup = (activityId) =>
  axios.delete(`${baseURL}/activity-groups/${activityId}`);

export const getAllTodoItems = (activityGroupId) =>
  axios.get(`${baseURL}/todo-items?activity_group_id=${activityGroupId}`);

export const getTodoItem = (todoId) =>
  axios.get(`${baseURL}/todo-items/${todoId}`);

export const createTodoItem = (todoData) =>
  axios.post(`${baseURL}/todo-items`, todoData);

export const updateTodoItem = (todoId, todoData) =>
  axios.patch(`${baseURL}/todo-items/${todoId}`, todoData);

export const deleteTodoItem = (todoId) =>
  axios.delete(`${baseURL}/todo-items/${todoId}`);
