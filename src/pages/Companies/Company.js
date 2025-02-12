import { useParams } from 'react-router-dom';
import CommingSoonPage from '../../components/CommingSoonPage';
import { getDetailById } from '../../utils/functions';
import { useSideNavStore } from '../../store/useSideNavStore';

const Company = () => {
  const {
    sideNav: { navs },
  } = useSideNavStore();
  const { id } = useParams();
  const company = getDetailById(navs, `/companies/${id}`);
  return <CommingSoonPage title={`Company: ${company.title}`} />;
};

export default Company;
