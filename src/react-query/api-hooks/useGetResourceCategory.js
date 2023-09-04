import { useQuery } from '@tanstack/react-query'
import queryKeys from "../constants"
import { HTTP } from '../../utils'

const getResourceCategory= async () => {
    try {
        const res = await HTTP.get(`/dev/edves-resources/api/v1/getresourcecategory`)
        return res
    } catch (error) {
        return error
    }
}

const useGetResourceCategory = () => {
    const  {data, isLoading} = useQuery([queryKeys.GET_RESOURCE_CATEGORY], getResourceCategory)
  return {
    resourceCategoryResponse: data?.data?.resource,
    isLoadingResourceCategory: isLoading
  }
}

export default useGetResourceCategory