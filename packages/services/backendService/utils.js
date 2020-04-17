import axios from 'axios'

export const callBackend = ({ operation, modelType, info }) => {
  return axios.post(`http://localhost:3002/api/${operation}`, {
    modelType,
    info,
  })
}

const callBackendDelete = (data) => {
  return axios.delete(`http://localhost:3002/api/delete`, { data })
}
