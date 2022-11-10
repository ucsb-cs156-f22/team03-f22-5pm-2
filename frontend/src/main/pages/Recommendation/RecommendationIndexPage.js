import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function RecommendationIndexPage() {

  // const currentUser = useCurrentUser();

  const { error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/recommendation/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/recommendation/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Recommendation Request</h1>
        <p>Recommendation Request index page</p>
      </div>
    </BasicLayout>
  );
}