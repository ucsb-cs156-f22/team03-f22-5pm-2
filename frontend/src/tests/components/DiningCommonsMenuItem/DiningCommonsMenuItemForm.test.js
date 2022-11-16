import { render, waitFor, fireEvent } from "@testing-library/react";
import DiningCommonsMenuItemForm from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemForm";
import { diningCommonsMenuItemFixtures } from "fixtures/diningCommonsMenuItemFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("DiningCommonsMenuItemForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <DiningCommonsMenuItemForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Name/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a MenuItem ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <DiningCommonsMenuItemForm initialMenuItem={diningCommonsMenuItemFixtures.oneMenuItem} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/DiningCommonsMenuItemForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/DiningCommonsMenuItemForm-id/)).toHaveValue("1");
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <DiningCommonsMenuItemForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("DiningCommonsMenuItemForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("DiningCommonsMenuItemForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Dinning Commons Code is required./)).toBeInTheDocument());
        expect(getByText(/Name is required./)).toBeInTheDocument();
        expect(getByText(/Station is required./)).toBeInTheDocument();

    });

    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <DiningCommonsMenuItemForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("DiningCommonsMenuItemForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("DiningCommonsMenuItemForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


