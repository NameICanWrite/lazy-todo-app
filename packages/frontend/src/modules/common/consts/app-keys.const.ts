// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN',
  EMAIL: 'EMAIL'
};

// React-query keys
export const QUERY_KEYS = {
  EXAMPLE: 'EXAMPLE',
  TOKEN: 'TOKEN',
  STATISTIC: 'statistic',
  TRENDING: 'trending',
  TODOS: 'todos',
  GET_USER: 'get-user',
};

export const QUERY_ACTIONS = {
  delete: 'DELETE',
  update: 'UPDATE'
}

// Backend Routes
export const BACKEND_KEYS = {
  EXAMPLE: 'example',
  COURSES: 'courses',
  ARTICLES: 'articles',
  STATISTIC: 'statistic',
  TRENDING: 'trending',
  FEATURED_ARTICLES: 'featured_articles'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  HOME: '/home',
  AUTHORIZED: '/authorized',
  LOGIN: '/login',
  SIGNUP:'/signup',
  SIGNUP_SUCCESS: '/signup-success',
  MY_TODOS: '/my-todos',
  CREATE_TODO: '/create-todo',
  EDIT_TODO: '/edit-todo',
  VIEW_TODO: '/view-todo',
  FORGET_PASSWORD: '/forget-password',
  RESET_PASSWORD: '/reset-password',
  USER: '/user'
};

export const SERVER_URL = 'http://localhost:5000'

export const TODOS_ON_PAGINATION = 10
