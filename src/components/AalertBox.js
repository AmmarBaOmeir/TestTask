import { Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import IzamSwitch from './IzamSwitch';

const StyledAalertBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
}));

const AalertBox = (props) => {
  const { title, description, switchProps, width = '93%' } = props;

  const theme = useTheme();

  return (
    <StyledAalertBox sx={{ width }}>
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1" color={theme.palette.primary.contrastText}>
          {description}
        </Typography>
      </Box>
      {switchProps && (
        <Box>
          <IzamSwitch
            label={switchProps.title}
            onChange={switchProps.onChange}
          />
        </Box>
      )}
    </StyledAalertBox>
  );
};

AalertBox.prototype = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  switchProps: PropTypes.shape(),
};

export default AalertBox;
