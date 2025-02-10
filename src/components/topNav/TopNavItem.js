import { Box, styled, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const NavItemContainer = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '& svg path': {
    fill: theme.palette.grey[active ? 400 : 700],
  },
}));

const TopNavItem = (props) => {
  const { label, icon, active } = props;
  const theme = useTheme();

  return (
    <NavItemContainer active={active}>
      {icon}
      <Typography
        variant="caption"
        color={theme.palette.grey[active ? 400 : 700]}
      >
        {label}
      </Typography>
    </NavItemContainer>
  );
};

TopNavItem.prototype = {
  label: PropTypes.string,
  icon: PropTypes.shape(),
  active: PropTypes.bool,
};

export default TopNavItem;
