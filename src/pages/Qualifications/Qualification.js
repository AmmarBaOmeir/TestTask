import { useParams } from 'react-router-dom';
import CommingSoonPage from '../../components/CommingSoonPage';
import { getDetailById } from '../../utils/functions';
import { useSideNavStore } from '../../store/useSideNavStore';

const Qualification = () => {
  const {
    sideNav: { navs },
  } = useSideNavStore();
  const { id } = useParams();
  const qualification = getDetailById(navs, `/qualifications/${id}`);
  return <CommingSoonPage title={`Qualification: ${qualification.title}`} />;
};

export default Qualification;
