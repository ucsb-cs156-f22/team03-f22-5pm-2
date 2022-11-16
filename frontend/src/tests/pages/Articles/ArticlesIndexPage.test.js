/*import { render, waitFor} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

import AppNavbar from "main/components/Nav/AppNavbar";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("AppNavbar tests", () => {

    const queryClient = new QueryClient();

    test("renders correctly for regular logged in user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, pconrad.cis@gmail.com")).toBeInTheDocument());
    });

    test("renders correctly for admin user", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const doLogin = jest.fn();

        const { getByText , getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, phtcon@ucsb.edu")).toBeInTheDocument());
        const adminMenu = getByTestId("appnavbar-admin-dropdown");
        expect(adminMenu).toBeInTheDocument();        
    });

    test("renders H2Console and Swagger links correctly", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const { getByText  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("H2Console")).toBeInTheDocument());
        const swaggerMenu = getByText("Swagger");
        expect(swaggerMenu).toBeInTheDocument();        
    });


    test("renders the todos menu correctly", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-todos-dropdown")).toBeInTheDocument());
    });

    test("renders the AppNavbarLocalhost when on http://localhost:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://localhost:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());
    });

    test("renders the AppNavbarLocalhost when on http://127.0.0.1:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://127.0.0.1:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());
    });

    test("renders the AppNavbarLocalhost when on http://127.0.0.1:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://127.0.0.1:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());

    });

    test("does NOT render the AppNavbarLocalhost when on localhost:8080", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://localhost:8080')

        const {getByTestId, queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbar")).toBeInTheDocument());
        expect(queryByTestId(/AppNavbarLocalhost/i)).toBeNull();
    });

    test("renders the articles menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-articles-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-articles-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-articles-list")).toBeInTheDocument() );

    });

    test("renders the articles menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-articles-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-articles-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-articles-create/)).toBeInTheDocument() );

    });


    test("renders the ucsbdates menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-ucsbdates-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-ucsbdates-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-ucsbdates-list")).toBeInTheDocument() );

    });

    test("renders the ucsbdates menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-ucsbdates-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-ucsbdates-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-ucsbdates-create/)).toBeInTheDocument() );

    });

    test("renders the diningcommons menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-dining-commons-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-dining-commons-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-dining-commons-list/)).toBeInTheDocument() );

    });

});*/

import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ArticlesIndexPage from "main/pages/Articles/ArticlesIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { articlesFixtures } from "fixtures/ArticlesFixtures";
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

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("ArticlesIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "ArticlesTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/Articles/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/Articles/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders three requests without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/Articles/all").reply(200, articlesFixtures.threeArticles);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("3");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("4");

    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/Articles/all").timeout();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });
    
    test("test what happens when you click delete, admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/Articles/all").reply(200, articlesFixtures.threeArticles);
        axiosMock.onDelete("/api/Articles").reply(200, "Article with id 1 was deleted");


        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2"); 

        const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("Article with id 1 was deleted") });

    });

});
