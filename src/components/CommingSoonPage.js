import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CommingSoonPage = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: '16px' }}>
      <Button size="large" variant="outlined" onClick={() => navigate('/')}>
        Back to Dashboard
      </Button>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Typography variant="h3" align="center" color="textPrimary">
          {title} Page
        </Typography>
        <Typography variant="h3" align="center" color="textPrimary">
          Comming Soon...
        </Typography>
      </Box>
    </Box>
  );
};

CommingSoonPage.prototype = {
  title: PropTypes.string,
};

export default CommingSoonPage;
