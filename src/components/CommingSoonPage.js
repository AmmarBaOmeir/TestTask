import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CommingSoonPage = ({ title }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" align="center" color="textPrimary">
        {title}
      </Typography>
      <Typography variant="h3" align="center" color="textPrimary">
        Comming Soon...
      </Typography>
    </Box>
  );
};

CommingSoonPage.prototype = {
  title: PropTypes.string,
};

export default CommingSoonPage;
