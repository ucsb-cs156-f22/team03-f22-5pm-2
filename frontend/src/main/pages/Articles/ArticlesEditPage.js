import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import ArticlesForm from "main/components/Articles/ArticlesForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function ArticlesEditPage() {
  let { id } = useParams();

  const { data: article, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/Articles?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/Articles`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (article) => ({
    url: "/api/Articles",
    method: "PUT",
    params: {
      id: article.id,
    },
    data: {
        Title: article.title,
        Url: article.name,
        Explanation: article.explanation,
        Email: article.email,
        dateAdded:article.dateAdded
    }
  });

  const onSuccess = (article) => {
    toast(`Article Updated - id: ${article.id} name: ${article.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/Articles?id=${id}`]
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
        <h1>Edit Articles</h1>
        {article &&
          <ArticlesForm initialArticle={article} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}