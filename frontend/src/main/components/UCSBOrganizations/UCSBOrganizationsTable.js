import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBOrganizationUtils"
//import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function UCSBOrganizationsTable({ orgs, currentUser }) {

    //const navigate = useNavigate();

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/UCSBOrganization/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'OrgCode',
            accessor: 'orgCode',
        },
        {
            Header: 'OrgTranslation',
            accessor: 'orgTranslation',
        },
	{
	    Header: 'OrgTranslationShort',
	    accessor: 'orgTranslationShort',
	},
	{
	    Header: 'Inactive',
	    accessor: (row, _rowIndex) => String(row.inactive) // hack needed for boolean values to show up
        }
    ];

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Delete", "danger", deleteCallback, "UCSBOrganizationsTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={orgs}
        columns={columnsToDisplay}
        testid={"UCSBOrganizationsTable"}
    />;
};
