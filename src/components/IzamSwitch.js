import { Box, styled, Switch, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 30,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 4,
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.contrastText,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 22,
    height: 22,
    backgroundColor: theme.palette.background.default,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
  },
}));

const CustomSwitchContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const IzamSwitch = (props) => {
  const { label, ...rest } = props;

  return (
    <CustomSwitchContainer>
      {label && <Typography variant="subtitle1">{label}</Typography>}
      <CustomSwitch {...rest} />
    </CustomSwitchContainer>
  );
};

IzamSwitch.prototype = {
  label: PropTypes.string,
};

export default IzamSwitch;
