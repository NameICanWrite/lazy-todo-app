import dotenv from 'dotenv'

dotenv.config()

export const entityTypes = {
  USER: 'user',
  TODOS: 'todos'
}

export const FRONTEND_PAGES = {
  TOKEN_CONFIRMATION_FAILURE: `${process.env.CLIENT_ROOT_URL}/token-is-wrong`,
  SIGNUP_SUCCESS: `${process.env.CLIENT_ROOT_URL}/signup-success`
}

export const BACKEND_PAGES = {
  CONFIRM_SIGNUP: `${process.env.ROOT_URL}/api/user/secure-signup`
}