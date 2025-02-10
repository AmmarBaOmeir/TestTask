import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import TopNav from '../components/topNav/TopNav';
import Companies from '../pages/Companies/Companies';
import Qualifications from '../pages/Qualifications/Qualifications';
import JobApplications from '../pages/JobApplications/JobApplications';
import NotFound from './NotFound';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';

const RootRoutes = () => {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/applications" element={<JobApplications />} />
        <Route path="/qualifications" element={<Qualifications />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RootRoutes;
