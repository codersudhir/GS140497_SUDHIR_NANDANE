// Import necessary modules and components from react-router-dom and react-redux
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

// Import page components
import StoresPage from "./pages/StoresPage";
import SKUsPage from "./pages/SKUsPage";
import PlanningPage from "./pages/PlanningPage";
import ChartsPage from "./pages/ChartsPage";
import Layout from "./component/Layout";

// Define the main App component
const App = () => {
    // Access user and loading state from the Redux store
    const { user, loading } = useSelector((state: RootState) => state.auth);

    return (
        // Set up the Router for navigation
        <Router>
            {/* Wrap the main content with the Layout component */}
            <Layout>
                {/* Define the routes for the application */}
                <Routes>
                    <Route path="/" element={<StoresPage />} /> {/* Route for StoresPage */}
                    <Route path="sku" element={<SKUsPage />} /> {/* Route for SKUsPage */}
                    <Route path="planning" element={<PlanningPage />} /> {/* Route for PlanningPage */}
                    <Route path="charts" element={<ChartsPage />} /> {/* Route for ChartsPage */}
                </Routes>
            </Layout>
        </Router>
    );
};

// Export the App component as the default export
export default App;
