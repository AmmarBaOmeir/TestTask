import { Badge, styled, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const CustomBadgeContainer = styled(Badge)(({ bgColor }) => ({
  padding: '10px',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: bgColor,
  minWidth: '24px',
  height: '24px',
  width: 'fit-content',
}));

const IzamBadge = (props) => {
  const { label, bgColor = 'white', ...rest } = props;
  const theme = useTheme();
  return (
    <CustomBadgeContainer {...rest} bgColor={bgColor}>
      {label && (
        <Typography variant="subtitle1" color={theme.palette.grey[700]}>
          {label}
        </Typography>
      )}
    </CustomBadgeContainer>
  );
};

IzamBadge.propTypes = {
  label: PropTypes.string,
  bgColor: PropTypes.oneOf(['white', 'grey']),
};

export default IzamBadge;
