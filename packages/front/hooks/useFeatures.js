import { featureSelectors } from '@just4dev/services'
import { useSelector } from 'react-redux'

export const useFeatures = () => {
  const features = useSelector(featureSelectors.featureSelector) || []
  const likeFeature =
    useSelector(featureSelectors.featuresByNameSelector)('like') || {}
  const commentFeature =
    useSelector(featureSelectors.featuresByNameSelector)('comment') || {}
  const similarpostsFeature =
    useSelector(featureSelectors.featuresByNameSelector)('similar_posts') || {}

  return {
    features,
    likeFeature,
    commentFeature,
    similarpostsFeature,
  }
}
