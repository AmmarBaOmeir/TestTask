import { Badge, styled, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const CustomBadgeContainer = styled(Badge)(({ bgColor, isMobile }) => ({
  padding: isMobile ? '6px' : '10px',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: bgColor,
  minWidth: isMobile ? '16px' : '24px',
  height: isMobile ? '16px' : '24px',
  width: 'fit-content',
}));

const IzamBadge = (props) => {
  const { label, bgColor = 'white', isMobile, ...rest } = props;
  const theme = useTheme();
  return (
    <CustomBadgeContainer {...rest} isMobile={isMobile} bgColor={bgColor}>
      {label && (
        <Typography
          variant={isMobile ? 'caption' : 'subtitle1'}
          color={theme.palette.grey[700]}
        >
          {label}
        </Typography>
      )}
    </CustomBadgeContainer>
  );
};

IzamBadge.propTypes = {
  isMobile: PropTypes.bool,
  label: PropTypes.string,
  bgColor: PropTypes.oneOf(['white', 'grey']),
};

export default IzamBadge;
