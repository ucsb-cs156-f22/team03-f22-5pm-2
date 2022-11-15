import { render, waitFor, fireEvent } from "@testing-library/react";
import DiningCommonsMenuItemCreatePage from "main/pages/DiningCommonsMenuItem/DiningCommonsMenuItemCreatePage";
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

describe("DiningCommonsMenuItemCreatePage tests", () => {

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
                    <DiningCommonsMenuItemCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const menuItem = {
            id: 40,
            diningCommonsCode: "Portola",
            name: "Greek Salad",
            station: "Salad bar"
        };

        axiosMock.onPost("/api/ucsbdiningcommonsmenuitem/post").reply( 202, menuItem );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DiningCommonsMenuItemCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("DiningCommonsMenuItemForm-name")).toBeInTheDocument();
        });

        const diningCommonsCode = getByTestId("DiningCommonsMenuItemForm-diningcommonscode");
        const name = getByTestId("DiningCommonsMenuItemForm-name");
        const station = getByTestId("DiningCommonsMenuItemForm-station");
        const submitButton = getByTestId("DiningCommonsMenuItemForm-submit");

        fireEvent.change(diningCommonsCode, { target: { value: 'Portola' } });
        fireEvent.change(name, { target: { value: 'Greek Salad' } });
        fireEvent.change(station, { target: { value: 'Salad Bar' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "diningCommonsCode": "Portola",
            "name": "Greek Salad",
            "station": "Salad Bar"
        });

        expect(mockToast).toBeCalledWith("New Dining Commons Menu Item Created - id: 40 name: Greek Salad");
        expect(mockNavigate).toBeCalledWith({ "to": "/diningCommonsMenuItem/list" });
    });


});


