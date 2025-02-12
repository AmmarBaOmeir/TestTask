import { useParams } from 'react-router-dom';
import CommingSoonPage from '../../components/CommingSoonPage';
import { getDetailById } from '../../utils/functions';
import { useSideNavStore } from '../../store/useSideNavStore';

const JobApplication = () => {
  const {
    sideNav: { navs },
  } = useSideNavStore();
  const { id } = useParams();
  const application = getDetailById(navs, `/applications/${id}`);
  return <CommingSoonPage title={`Job Application: ${application.title}`} />;
};

export default JobApplication;
