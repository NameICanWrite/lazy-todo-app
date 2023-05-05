import { useHistory } from "react-router-dom"
import { useQueryParams } from "./useQueryParams"

export const useEditUrlParam = () => {
  const query = useQueryParams()
  const history = useHistory()
  return (key: string, value: string) => {
    let params: Record<string, string> = {}
    query.delete(key)
    query.forEach((value, key) => {
      params[key] = value
    })
    if (value) params[key] = value

    const queryString = new URLSearchParams({ ...params })
    history.push({ search: `?${queryString}` })
  }

}