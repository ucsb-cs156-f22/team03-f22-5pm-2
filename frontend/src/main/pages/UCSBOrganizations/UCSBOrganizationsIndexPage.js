import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBOrganizationsTable from 'main/components/UCSBOrganizations/UCSBOrganizationsTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function UCSBOrganizationsIndexPage() {

    const currentUser = useCurrentUser();

    const { data: orgs, error: _error, status: _status } =
	  useBackend(
	      // Stryker disable next-line all : don't test internal caching of React Query
	      ["/api/UCSBOrganization/all"],
              // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
              { method: "GET", url: "/api/UCSBOrganization/all" },
	      []
	  );
    
    return (
	<BasicLayout>
	    <div className="pt-2">
		<h1>UCSBOrganizations</h1>
		<UCSBOrganizationsTable orgs={orgs} currentUser={currentUser} />
	    </div>
	</BasicLayout>
    )
}
