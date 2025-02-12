import { Avatar, Box, styled } from '@mui/material';
import logo from '../../assets/izam_logo_white.png';
import SearchBox from '../SearchBox';

const CustomMobileTopNav = styled(Box)(({ theme }) => ({
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.main,
  margin: 0,
  height: '50px',
}));

const MobileTopNav = () => {
  return (
    <CustomMobileTopNav>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Avatar />
        <SearchBox width="200px" clickableAdornment />
      </Box>
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{ width: '120px', height: '40px' }}
      />
    </CustomMobileTopNav>
  );
};

export default MobileTopNav;
