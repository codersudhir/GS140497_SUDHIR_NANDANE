import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";


import StoresPage from "./pages/StoresPage";
import SKUsPage from "./pages/SKUsPage";
import PlanningPage from "./pages/PlanningPage";
import ChartsPage from "./pages/ChartsPage";
import Layout from "./component/Layout";

const App = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/store" element={<StoresPage />} />
                    <Route path="sku" element={<SKUsPage />} />
                    <Route path="planning" element={<PlanningPage />} />
                    <Route path="charts" element={<ChartsPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
