import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/ArticlesUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function ArticlesTable({ articles, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/articles/edit/${cell.row.values.code}`)
    }

    //Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/Articles/all"]
    );
    //Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }
    
    const columns = [
        {
            Header: 'Id',
            accessor: 'id', 
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Url',
            accessor: 'url',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'DateAdded',
            accessor: 'dateAdded',
        }
        /*{
            Header: 'Url',
            id: 'url', // needed for tests
            accessor: (row, _rowIndex) => String(row.hasSackMeal) // hack needed for boolean values to show up
        },
        {
            Header: 'Takeout Meal?',
            id: 'hasTakeOutMeal', // needed for tests
            accessor: (row, _rowIndex) => String(row.hasTakeOutMeal) // hack needed for boolean values to show up

        },
        {
            Header: 'Dining Cam?',
            id: 'hasDiningCam', // needed for tests
            accessor: (row, _rowIndex) => String(row.hasDiningCam) // hack needed for boolean values to show up
        },
        {
            Header: 'Latitude',
            accessor: 'latitude',
        },
        {
            Header: 'Longitude',
            accessor: 'longitude',
        }*/
    ];

    const testid = "ArticlesTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={articles}
        columns={columnsToDisplay}
        testid={testid}
    />;
};