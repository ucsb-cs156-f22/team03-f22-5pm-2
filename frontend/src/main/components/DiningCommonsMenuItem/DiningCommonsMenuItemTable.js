import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/DiningCommonsMenuItemUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function DiningCommonsMenuItemTable({ diningCommonsMenuItem, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/diningCommonsMenuItem/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsbdiningcommonsmenuitem/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }   

    const columns = [
        {
            Header: 'id',
            accessor: 'id', 
        },
        {
            Header: 'DiningCommonsCode',
            accessor: 'diningCommonsCode',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Station',
            accessor: 'station',
        }
        
    ];

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, "DiningCommonsMenuItemTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "DiningCommonsMenuItemTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={diningCommonsMenuItem}
        columns={columnsToDisplay}
        testid={"DiningCommonsMenuItemTable"}
    />;
};