import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ReviewForm from "main/components/Review/ReviewForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function ReviewCreatePage() {

  const objectToAxiosParams = (review) => ({
    url: "/api/menuitemreview/post",
    method: "POST",
    params: {
        comments: review.comments,
        dateReviewed: review.dateReviewed,
        itemId: review.itemId,
        reviewerEmail: review.reviewerEmail,
        stars: review.stars,
    }
  });

  const onSuccess = (review) => {
    toast(`New Menu Item Review Created - id: ${review.id} itemId: ${review.itemId}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/menuitemreview/all"]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/menuitemreview/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Menu Item Review</h1>

        <ReviewForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}