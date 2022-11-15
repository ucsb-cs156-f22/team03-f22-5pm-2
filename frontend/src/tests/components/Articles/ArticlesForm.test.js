import { render, waitFor, fireEvent } from "@testing-library/react";
import ArticlesForm from "main/components/Articles/ArticlesForm";
import { ArticlesFixtures } from "fixtures/ArticlesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("ArticlesForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Name/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in an article ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <ArticlesForm initialMenuItem={ArticlesFixtures.oneMenuItem} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/ArticlesForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/ArticlesForm-id/)).toHaveValue("1");
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("ArticlesForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("ArticlesForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Articles is required./)).toBeInTheDocument());
        expect(getByText(/Title is required./)).toBeInTheDocument();
        expect(getByText(/Url is required./)).toBeInTheDocument();
        expect(getByText(/Explanation is required./)).toBeInTheDocument();
        expect(getByText(/Email is required./)).toBeInTheDocument();
        expect(getByText(/dateAdded is required./)).toBeInTheDocument();

    });

    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("ArticlesForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("ArticlesForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});