import axios from 'axios'

export const callBackend = ({ operation, modelType, info, query }) => {
  return axios.post(`http://localhost:3002/api/${operation}`, {
    modelType,
    info,
    query,
  })
}
