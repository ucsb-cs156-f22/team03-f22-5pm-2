import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";

import TodosIndexPage from "main/pages/Todos/TodosIndexPage";
import TodosCreatePage from "main/pages/Todos/TodosCreatePage";
import TodosEditPage from "main/pages/Todos/TodosEditPage";

import DiningCommonsIndexPage from "main/pages/DiningCommons/DiningCommonsIndexPage";
import DiningCommonsCreatePage from "main/pages/DiningCommons/DiningCommonsCreatePage";
import DiningCommonsEditPage from "main/pages/DiningCommons/DiningCommonsEditPage";

import UCSBDatesIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage";
import UCSBDatesCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage";
import UCSBDatesEditPage from "main/pages/UCSBDates/UCSBDatesEditPage";

import DiningCommonsMenuItemIndexPage from "main/pages/DiningCommonsMenuItem/DiningCommonsMenuItemIndexPage";
import DiningCommonsMenuItemCreatePage from "main/pages/DiningCommonsMenuItem/DiningCommonsMenuItemCreatePage";
import DiningCommonsMenuItemEditPage from "main/pages/DiningCommonsMenuItem/DiningCommonsMenuItemEditPage";

import ArticlesIndexPage from "main/pages/Articles/ArticlesIndexPage";

import UCSBOrganizationsIndexPage from "main/pages/UCSBOrganizations/UCSBOrganizationsIndexPage";

import HelpRequestIndexPage from "main/pages/HelpRequest/HelpRequestIndexPage";

import ReviewIndexPage from "main/pages/Review/ReviewIndexPage";

import RecommendationIndexPage from "main/pages/Recommendation/RecommendationIndexPage";

import { hasRole, useCurrentUser } from "main/utils/currentUser";

import "bootstrap/dist/css/bootstrap.css";


function App() {

  const { data: currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        {
          hasRole(currentUser, "ROLE_ADMIN") && <Route exact path="/admin/users" element={<AdminUsersPage />} />
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/todos/list" element={<TodosIndexPage />} />
              <Route exact path="/todos/create" element={<TodosCreatePage />} />
              <Route exact path="/todos/edit/:todoId" element={<TodosEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/diningCommons/list" element={<DiningCommonsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/diningCommons/create" element={<DiningCommonsCreatePage />} />
              <Route exact path="/diningCommons/edit/:code" element={<DiningCommonsEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/ucsbdates/list" element={<UCSBDatesIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/ucsbdates/create" element={<UCSBDatesCreatePage />} />
              <Route exact path="/ucsbdates/edit/:id" element={<UCSBDatesEditPage />} />
            </>
          )
        }
        {
           hasRole(currentUser, "ROLE_USER") && (
             <>
               <Route exact path="/diningCommonsMenuItem/list" element={<DiningCommonsMenuItemIndexPage />} />
             </>
           )
         }
         {
           hasRole(currentUser, "ROLE_ADMIN") && (
             <>
               <Route exact path="/diningCommonsMenuItem/create" element={<DiningCommonsMenuItemCreatePage />} />
               <Route exact path="/diningCommonsMenuItem/edit/:id" element={<DiningCommonsMenuItemEditPage />} />
             </>
           )
         }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/Articles/list" element={<ArticlesIndexPage />} />
            </>
          )
        }
       
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/UCSBOrganizations/list" element={<UCSBOrganizationsIndexPage />} />
            </>
          )
        }

        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/helprequests/list" element={<HelpRequestIndexPage />} />
            </>
          )
        }

        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/menuitemreview/list" element={<ReviewIndexPage />} />
            </>
          )
        }  

        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/recommendation/list" element={<RecommendationIndexPage />} />
            </>
          )
        }   
        

      </Routes>
    </BrowserRouter>
  );
}


export default App;
