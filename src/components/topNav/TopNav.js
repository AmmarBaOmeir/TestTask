import { Box, styled } from '@mui/material';
import TopNavItem from './TopNavItem';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as Job } from '../../assets/job.svg';
import logo from '../../assets/izam_logo_white.png';
import SearchBox from '../SearchBox';

const CustomTopNav = styled(Box)(({ theme }) => ({
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.main,
  margin: 0,
  height: '50px',
}));

const TopNav = () => {
  return (
    <CustomTopNav>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ width: '120px', height: '40px' }}
        />
        <SearchBox width="360px" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <TopNavItem label="Home" icon={<Home />} />
        <TopNavItem label="Jobs" icon={<Job />} active />
      </Box>
    </CustomTopNav>
  );
};

export default TopNav;
