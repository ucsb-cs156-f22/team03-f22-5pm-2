import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import DiningCommonsMenuItemEditPage from "main/pages/DiningCommonsMenuItem/DiningCommonsMenuItemEditPage";

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

describe("DiningCommonsMenuItemEditPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/ucsbdiningcommonsmenuitem", { params: { id: 40 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit Dining Commons Menu Item")).toBeInTheDocument());
            expect(queryByTestId("DiningCommonsMenuItemForm-name")).not.toBeInTheDocument();
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
            axiosMock.onGet("/api/ucsbdiningcommonsmenuitem", { params: { id: 40 } }).reply(200, {
                id: 40,
                diningCommonsCode: 'Portola',
                name: "Greek Salad",
                station: "Salad Bar"
            });
            axiosMock.onPut('/api/ucsbdiningcommonsmenuitem').reply(200, {
                id: "40",
                diningCommonsCode: 'Ortega',
                name: "Steak",
                station: "The Grill"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("DiningCommonsMenuItemForm-diningcommonscode")).toBeInTheDocument());

            const idField = getByTestId("DiningCommonsMenuItemForm-id");
            const diningCommonsCodeField = getByTestId("DiningCommonsMenuItemForm-diningcommonscode");
            const nameField = getByTestId("DiningCommonsMenuItemForm-name");
            const stationField = getByTestId("DiningCommonsMenuItemForm-station");

            expect(idField).toHaveValue("40");
            expect(diningCommonsCodeField).toHaveValue("Portola");
            expect(nameField).toHaveValue("Greek Salad");
            expect(stationField).toHaveValue("Salad Bar");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <DiningCommonsMenuItemEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("DiningCommonsMenuItemForm-diningcommonscode")).toBeInTheDocument());

            const idField = getByTestId("DiningCommonsMenuItemForm-id");
            const diningCommonsCodeField = getByTestId("DiningCommonsMenuItemForm-diningcommonscode");
            const nameField = getByTestId("DiningCommonsMenuItemForm-name");
            const stationField = getByTestId("DiningCommonsMenuItemForm-station");
            const submitButton = getByTestId("DiningCommonsMenuItemForm-submit");

            expect(idField).toHaveValue("40");
            expect(diningCommonsCodeField).toHaveValue("Portola");
            expect(nameField).toHaveValue("Greek Salad");
            expect(stationField).toHaveValue("Salad Bar");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(diningCommonsCodeField, { target: { value: 'Ortega' } })
            fireEvent.change(nameField, { target: { value: 'Steak' } })
            fireEvent.change(stationField, { target: { value: "The Grill" } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("DiningCommonsMenuItem Updated - id: 40 name: Steak");
            expect(mockNavigate).toBeCalledWith({ "to": "/diningCommonsMenuItem/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 40 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                diningCommonsCode: 'Ortega',
                name: "Steak",
                station: "The Grill"
            })); // posted object

        });

       
    });
});


