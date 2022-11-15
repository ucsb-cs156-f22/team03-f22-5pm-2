import { render, waitFor, fireEvent } from "@testing-library/react";
import ArticlesCreatePage from "main/pages/Articles/ArticlesCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
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

describe("ArticlesCreatePage tests", () => {

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
                    <ArticlesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const menuItem = {
            id: 40,
            title: "test",
            url: "test",
            explanation: "test", 
            email: "test",
            dateAdded: "test"
        };

        axiosMock.onPost("/api/Articles/post").reply( 202, menuItem );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("ArticlesForm-name")).toBeInTheDocument();
        });

        const title = getByTestId("ArticlesForm-title");
        const url = getByTestId("ArticlesForm-url");
        const explanation = getByTestId("ArticlesForm-explanation");
        const email = getByTestId("ArticlesForm-email");
        const dateAdded = getByTestId("ArticlesForm-dateAdded");
        const submitButton = getByTestId("ArticlesForm-submit");

        fireEvent.change(title, { target: { value: 'test' } });
        fireEvent.change(url, { target: { value: 'test' } });
        fireEvent.change(explanation, { target: { value: 'test' } });
        fireEvent.change(email, { target: { value: 'test' } });
        fireEvent.change(dateAdded, { target: { value: 'test' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "title": "test",
            "url": "test",
            "explanation": "test",
            "email": "test",
            "dateAdded": "test"
        });

        expect(mockToast).toBeCalledWith("New Article Created - id: 40 name: test");
        expect(mockNavigate).toBeCalledWith({ "to": "/Articles/list" });
    });


});