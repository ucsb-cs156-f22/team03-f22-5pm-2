import { render, waitFor, fireEvent } from "@testing-library/react";
import ReviewForm from "main/components/Review/ReviewForm";
import { reviewFixtures } from "fixtures/reviewFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("ReviewForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <ReviewForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Item ID/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in an Items ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <ReviewForm initialItem={reviewFixtures.oneItem} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/ReviewForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        await waitFor( () => expect(getByTestId(/ReviewForm-id/)).toHaveValue("1") );
    });

    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <ReviewForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("ReviewForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("ReviewForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


