import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ReviewEditPage from "main/pages/Review/ReviewEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import _mockConsole from "jest-mock-console";

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
        useParams: () => ({
            id: 1
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("ReviewEditPage tests", () => {

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/menuitemreview", { params: { code: 1} }).reply(200, {  
                comments: "bad",
                dateReviewed: "2022-11-11T02:02:35",
                id: 1,
                itemId: 1,
                reviewerEmail: "sophia@ucsb.edu",
                stars: 2
            });
            axiosMock.onPut('/api/menuitemreview').reply(200, {
                comments: "bad",
                dateReviewed: "2022-11-11T02:02:35",
                id: "1",
                itemId: "1",
                reviewerEmail: "rose@ucsb.edu",
                stars: "3"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("ReviewForm-stars")).toBeInTheDocument());

            const idField = getByTestId("ReviewForm-id");
            const itemIdField = getByTestId("ReviewForm-itemId");
            const commentsField = getByTestId("ReviewForm-comments");
            const dateReviewedField = getByTestId("ReviewForm-dateReviewed");
            const reviewerEmailField = getByTestId("ReviewForm-reviewerEmail");
            const starsField = getByTestId("ReviewForm-stars");

            expect(idField).toHaveValue("1");
            expect(itemIdField).toHaveValue("1");
            expect(starsField).toHaveValue("2");
            expect(commentsField).toHaveValue("bad");
            expect(dateReviewedField).toHaveValue("2022-11-11T02:02:35");
            expect(reviewerEmailField).toHaveValue("sophia@ucsb.edu");
            
        });

        test("Changes when you click Update", async () => {

            const { getByTestId, getByText } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("ReviewForm-stars")).toBeInTheDocument());

            const idField = getByTestId("ReviewForm-id");
            const itemIdField = getByTestId("ReviewForm-itemId");
            const commentsField = getByTestId("ReviewForm-comments");
            const dateReviewedField = getByTestId("ReviewForm-dateReviewed");
            const reviewerEmailField = getByTestId("ReviewForm-reviewerEmail");
            const starsField = getByTestId("ReviewForm-stars");

            expect(idField).toHaveValue("1");
            expect(itemIdField).toHaveValue("1");
            expect(starsField).toHaveValue("2");
            expect(commentsField).toHaveValue("bad");
            expect(dateReviewedField).toHaveValue("2022-11-11T02:02:35");
            expect(reviewerEmailField).toHaveValue("sophia@ucsb.edu");
           
            const submitButton = getByText("Update");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(starsField, { target: { value: '3' } })
            fireEvent.change(reviewerEmailField, { target: { value: 'rose@ucsb.edu' } })
        
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("Review Updated - id: 1 itemId: 1");
            expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id:1 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                comments: "bad",
                dateReviewed: "2022-11-11T02:02:35",
                id: "1",
                itemId: "1",
                reviewerEmail: "rose@ucsb.edu",
                stars: "3"
            })); // posted object

        });

       
    });
});


