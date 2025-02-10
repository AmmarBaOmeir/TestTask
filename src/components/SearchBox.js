import {
  Box,
  debounce,
  InputAdornment,
  styled,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../assets/search.svg';

const StyledSearchBox = styled(TextField)(({ width, theme }) => ({
  width,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.contrastText,
  borderRadius: '25px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input': {
    padding: '10px 15px',
  },
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.main,
  },
}));

const StyledAdornment = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.darkGreen,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: 36,
  height: 36,
}));

const SearchBox = (props) => {
  const { size = 'medium', onChange, width } = props;

  const handleChange = debounce((textVal) => {
    if (onChange) {
      onChange(textVal);
    }
  }, 750);

  return (
    <StyledSearchBox
      placeholder="Search by name, job title"
      size={size}
      onChange={handleChange}
      width={width}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <StyledAdornment>
                <SearchIcon width={20} height={20} fill="white" />
              </StyledAdornment>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

SearchBox.prototype = {
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
};

export default SearchBox;
