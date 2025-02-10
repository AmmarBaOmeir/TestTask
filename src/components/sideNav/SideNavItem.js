import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { ReactComponent as ChevronUp } from '../../assets/chevronUp.svg';
import { ReactComponent as ChevronDown } from '../../assets/chevronDown.svg';
import { ReactComponent as SortDots } from '../../assets/sortDots.svg';
import { ReactComponent as EditPen } from '../../assets/editPen.svg';
import { ReactComponent as EyeOn } from '../../assets/eyeOn.svg';
import { ReactComponent as EyeOff } from '../../assets/eyeOff.svg';
import { ReactComponent as CheckMark } from '../../assets/checkMark.svg';
import { useSideNavStore } from '../../store/useSideNavStore';

const SideNavItemContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid',
  borderColor: theme.palette.border.default,
  backgroundColor: theme.palette.background.paper,
}));

const SideNavItemLeading = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const SideNavItemTrailing = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const SideNavItemTextInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  margin: '0 16px',

  '& .MuiOutlinedInput-root': {
    paddingRight: 0,
    height: '100%',
  },
  '& .MuiInputAdornment-root': {
    height: '100%',
    margin: 0,
  },
}));

const StyledAdornment = styled(InputAdornment)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  width: '50px',
  '& svg path': {
    fill: theme.palette.primary.main,
  },
}));

const ExpandingIcon = ({ expanded, subItems }) => {
  if (subItems?.length) {
    return expanded ? ChevronUp : ChevronDown;
  }
  return null;
};

ExpandingIcon.prototype = {
  expanded: PropTypes.bool,
  subItems: PropTypes.arrayOf(PropTypes.shape()),
};

const SideNavItem = (props) => {
  const { title, visible, target, subItems } = props;
  const [fieldEdit, setFieldEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(visible);

  const longClickTimer = useRef(null);

  const {
    sideNav: { viewMode, setViewMode },
  } = useSideNavStore();

  const handleMouseDown = () => {
    longClickTimer.current = setTimeout(() => {
      setViewMode(true);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longClickTimer.current) {
      clearTimeout(longClickTimer.current);
      longClickTimer.current = null;
    }
  };

  const theme = useTheme();
  return (
    <Box
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <SideNavItemContainer>
        <SideNavItemLeading>
          {!viewMode && <SortDots />}
          <Typography variant="body1">{title}</Typography>
        </SideNavItemLeading>
        {fieldEdit && (
          <SideNavItemTextInput
            size="small"
            slotProps={{
              input: {
                sx: { height: '100%' },
                endAdornment: (
                  <StyledAdornment onClick={() => setFieldEdit(false)}>
                    <CheckMark
                      width={25}
                      height={25}
                      stroke={theme.palette.primary.main}
                    />
                  </StyledAdornment>
                ),
              },
            }}
          />
        )}
        <SideNavItemTrailing>
          {viewMode ? (
            <ExpandingIcon
              cursor="pointer"
              subItems={subItems}
              expanded={expanded}
            />
          ) : (
            <>
              {!fieldEdit && (
                <EditPen cursor="pointer" onClick={() => setFieldEdit(true)} />
              )}
              {isVisible ? (
                <EyeOn cursor="pointer" onClick={() => setIsVisible(false)} />
              ) : (
                <EyeOff cursor="pointer" onClick={() => setIsVisible(true)} />
              )}
            </>
          )}
        </SideNavItemTrailing>
      </SideNavItemContainer>
      <Box sx={{ ml: '6px' }}>
        {expanded && subItems.map((item) => <SideNavItem {...item} />)}
      </Box>
    </Box>
  );
};

SideNavItem.prototype = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  target: PropTypes.string,
  subItems: PropTypes.arrayOf(PropTypes.shape()),
};

export default SideNavItem;
