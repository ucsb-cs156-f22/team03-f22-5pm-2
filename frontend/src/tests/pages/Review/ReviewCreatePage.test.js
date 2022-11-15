import { render, waitFor, fireEvent } from "@testing-library/react";
import ReviewCreatePage from "main/pages/Review/ReviewCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});


describe("ReviewCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();

        const review = {
            comments: "bad",
            dateReviewed: "2022-11-11T02:02:35",
            id: 1,
            itemId: 1,
            reviewerEmail: "sophia@ucsb.edu",
            stars: 2
          };
        
    
        axiosMock.onPost("/api/menuitemreview/post").reply( 202, review );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("ReviewForm-stars")).toBeInTheDocument();
        });

        const itemIdField = getByTestId("ReviewForm-itemId");
        const commentsField = getByTestId("ReviewForm-comments");
        const dateReviewedField = getByTestId("ReviewForm-dateReviewed");
        const reviewerEmailField = getByTestId("ReviewForm-reviewerEmail");
        const starsField = getByTestId("ReviewForm-stars");
        
        const submitButton = getByTestId("ReviewForm-submit");

        fireEvent.change(itemIdField, { target: { value: '1' } });
        fireEvent.change(commentsField, { target: { value: 'bad' } });
        fireEvent.change(dateReviewedField, { target: { value: '2022-11-11T02:02:35' } });
        fireEvent.change(reviewerEmailField, { target: { value: 'sophia@ucsb.edu' } });
        fireEvent.change(starsField, { target: { value: '2' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual({
            "comments": "bad",
            "dateReviewed": "2022-11-11T02:02:35",
            "itemId": "1",
            "reviewerEmail": "sophia@ucsb.edu",
            "stars": "2"
        });

        expect(mockToast).toBeCalledWith("New Menu Item Review Created - id: 1 itemId: 1");
        expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview/list" });
    });


});


