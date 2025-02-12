import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Dashboard from '../pages/Dashboard/Dashboard';
import TopNav from '../components/topNav/TopNav';
import Companies from '../pages/Companies/Companies';
import Company from '../pages/Companies/Company';
import Qualifications from '../pages/Qualifications/Qualifications';
import Qualification from '../pages/Qualifications/Qualification';
import JobApplications from '../pages/JobApplications/JobApplications';
import JobApplication from '../pages/JobApplications/JobApplication';
import NotFound from './NotFound';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Jobs from '../pages/Jobs/Jobs';
import MobileTopNav from '../components/topNav/MobileTopNav';
import MobileDashboard from '../pages/Dashboard/MobileDashboard';

const RootRoutes = () => {
  const isMobile = useMediaQuery('(max-width:850px)');

  return (
    <Router>
      {isMobile ? <MobileTopNav /> : <TopNav />}
      <Routes>
        <Route
          path="/"
          element={isMobile ? <MobileDashboard /> : <Dashboard />}
        />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<Company />} />
        <Route path="/applications" element={<JobApplications />} />
        <Route path="/applications/:id" element={<JobApplication />} />
        <Route path="/qualifications" element={<Qualifications />} />
        <Route path="/qualifications/:id" element={<Qualification />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RootRoutes;
