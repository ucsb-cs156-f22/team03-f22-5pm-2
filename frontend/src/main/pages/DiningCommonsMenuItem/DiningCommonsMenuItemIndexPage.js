import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DiningCommonsTable from 'main/components/DiningCommonsMenuItem/DiningCommonsMenuItemTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function DiningCommonsMenuItemIndexPage() {

  const currentUser = useCurrentUser();

  const { data: diningCommonsMenuItem, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/ucsbdiningcommonsmenuitem/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/ucsbdiningcommonsmenuitem/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>UCSB Dining Commons Menu Item</h1>
        <DiningCommonsTable diningCommonsMenuItem={diningCommonsMenuItem} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}