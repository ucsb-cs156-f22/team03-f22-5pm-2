import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/HelpRequestUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function HelpRequestTable({ requests, currentUser }) {

    // const navigate = useNavigate();

    // const __editCallback = (cell) => {
    //     navigate(`/helprequest/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/helprequest/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'requesterEmail',
            accessor: 'requesterEmail',
        },
        {
            Header: 'teamId',
            accessor: 'teamId',
        },
        {
            Header: 'tableOrBreakoutRoom',
            accessor: 'tableOrBreakoutRoom',
        },
        {
            Header: 'explanation',
            accessor: 'explanation',
        },
        {
            Header: 'solved',
            accessor: 'solved',
        }
    ];

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Delete", "danger", deleteCallback, "HelpRequestTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={requests}
        columns={columnsToDisplay}
        testid={"HelpRequestTable"}
    />;
};