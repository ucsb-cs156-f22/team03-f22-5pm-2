import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ArticlesEditPage from "main/pages/Articles/ArticlesEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

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
            id: 40
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("ArticlesEditPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/Articles", { params: { id: 40 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ArticlesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit Articles")).toBeInTheDocument());
            expect(queryByTestId("ArticlesForm-name")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/Articles", { params: { id: 40 } }).reply(200, {
                id: 40,
                title: "test",
                url: "test",
                explanation: "test", 
                email: "test",
                dateAdded: "test"
            });
            axiosMock.onPut('/api/Articles').reply(200, {
                id: 40,
                title: "test",
                url: "test",
                explanation: "test", 
                email: "test",
                dateAdded: "test"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ArticlesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ArticlesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("ArticlesForm-diningcommonscode")).toBeInTheDocument());

            const titleField = getByTestId("ArticlesForm-title");
            const urlField = getByTestId("ArticlesForm-url");
            const explanationField = getByTestId("ArticlesForm-explanation");
            const emailField = getByTestId("ArticlesForm-email");
            const dateAddedField = getByTestId("ArticlesForm-dateAdded");

            expect(idField).toHaveValue("40");
            expect(titleField).toHaveValue("test");
            expect(urlField).toHaveValue("test");
            expect(explanationField).toHaveValue("test");
            expect(emailField).toHaveValue("test");
            expect(dateAddedField).toHaveValue("test");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <ArticlesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("ArticlesForm-title")).toBeInTheDocument());

            const titleField = getByTestId("ArticlesForm-title");
            const urlField = getByTestId("ArticlesForm-url");
            const explanationField = getByTestId("ArticlesForm-explanation");
            const emailField = getByTestId("ArticlesForm-email");
            const dateAddedField = getByTestId("ArticlesForm-dateAdded");

            expect(idField).toHaveValue("40");
            expect(titleField).toHaveValue("test");
            expect(urlField).toHaveValue("test");
            expect(explanationField).toHaveValue("test");
            expect(emailField).toHaveValue("test");
            expect(dateAddedField).toHaveValue("test");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(titleField, { target: { value: 'test' } })
            fireEvent.change(urlField, { target: { value: 'test' } })
            fireEvent.change(explanationField, { target: { value: "test" } })
            fireEvent.change(emailField, { target: { value: 'test' } })
            fireEvent.change(dateAddedField, { target: { value: 'test' } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("Article Updated - id: 40 name: Steak");
            expect(mockNavigate).toBeCalledWith({ "to": "/Articles/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 40 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                title: 'test',
                url: "test",
                explanation: "test",
                email: "test",
                dateAdded: "test"
            })); // posted object

        });

       
    });
});