import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DiningCommonsMenuItemForm from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function DiningCommonsMenuItemCreatePage() {

  const objectToAxiosParams = (menuItem) => ({
    url: "/api/ucsbdiningcommonsmenuitem/post",
    method: "POST",
    params: {
        diningCommonsCode: menuItem.diningCommonsCode,
        name: menuItem.name,
        station: menuItem.station
    }
  });

  const onSuccess = (menuItem) => {
    toast(`New Dining Commons Menu Item Created - id: ${menuItem.id} name: ${menuItem.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/ucsbdiningcommonsmenuitem/all"]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/diningCommonsMenuItem/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Dining Commons Menu Item</h1>

        <DiningCommonsMenuItemForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}