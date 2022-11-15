import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ArticlesForm from "main/components/Articles/ArticlesForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function ArticlesCreatePage() {

  const objectToAxiosParams = (article) => ({
    url: "/api/Articles/post",
    method: "POST",
    params: {
      Title: article.title,
      Url: article.name,
      Explanation: article.explanation,
      Email: article.email,
      dateAdded:article.dateAdded
    }
  });

  const onSuccess = (article) => {
    toast(`New article Created - id: ${article.id} name: ${article.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/Articles/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/Articles/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Article</h1>

        <ArticlesForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}