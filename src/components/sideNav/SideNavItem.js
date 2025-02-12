import {
  Box,
  Collapse,
  InputAdornment,
  styled,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ChevronUp } from '../../assets/chevronUp.svg';
import { ReactComponent as ChevronDown } from '../../assets/chevronDown.svg';
import { ReactComponent as SortDots } from '../../assets/sortDots.svg';
import { ReactComponent as EditPen } from '../../assets/editPen.svg';
import { ReactComponent as EyeOn } from '../../assets/eyeOn.svg';
import { ReactComponent as EyeOff } from '../../assets/eyeOff.svg';
import { ReactComponent as CheckMark } from '../../assets/checkMark.svg';
import { useSideNavStore } from '../../store/useSideNavStore';

const SideNavItemContainer = styled(Box)(({ theme }) => ({
  padding: '8px 10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid',
  cursor: 'pointer',
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

const SideNavItem = (props) => {
  const { title, visible = true, target, subItems, id } = props;
  const navigate = useNavigate();

  const [isfieldEdit, setIsFieldEdit] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(visible);
  const [textValue, setTextValue] = useState(title);

  const longClickTimer = useRef(null);

  const {
    sideNav: { viewMode, setViewMode, setEditedNavs, editedNavs },
  } = useSideNavStore();

  const handleMouseDown = () => {
    longClickTimer.current = setTimeout(() => {
      setViewMode(false);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longClickTimer.current) {
      clearTimeout(longClickTimer.current);
      longClickTimer.current = null;
    }
  };

  const handleUpdateNavs = (key, value) => {
    const updatedItems = editedNavs?.map((navItem) => {
      if (navItem.id === id) {
        return { ...navItem, [key]: value };
      }
      return {
        ...navItem,
        children: navItem?.children
          ?.map((childNav) => {
            if (childNav?.id === id) {
              return { ...childNav, [key]: value };
            }
            return childNav;
          })
          .filter(Boolean),
      };
    });
    setEditedNavs(updatedItems);
  };

  const theme = useTheme();

  const ExpandingIcon = expanded ? ChevronUp : ChevronDown;

  useEffect(() => {
    setTextValue(title);
  }, [title]);

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
          {!isfieldEdit && (
            <Typography
              variant="body1"
              fontWeight="bold"
              onClick={() => navigate(target)}
            >
              {textValue}
            </Typography>
          )}
        </SideNavItemLeading>
        {isfieldEdit && (
          <SideNavItemTextInput
            size="small"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            slotProps={{
              input: {
                sx: { height: '100%' },
                endAdornment: (
                  <StyledAdornment
                    onClick={() => {
                      handleUpdateNavs('title', textValue);
                      setIsFieldEdit(false);
                    }}
                  >
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
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
              {...(!subItems?.length && { display: 'none' })}
            />
          ) : (
            <>
              {!isfieldEdit && (
                <EditPen
                  cursor="pointer"
                  onClick={() => setIsFieldEdit(true)}
                />
              )}
              {isVisible ? (
                <EyeOn
                  cursor="pointer"
                  onClick={() => {
                    handleUpdateNavs('visible', false);
                    setIsVisible(false);
                  }}
                />
              ) : (
                <EyeOff
                  cursor="pointer"
                  onClick={() => {
                    handleUpdateNavs('visible', true);
                    setIsVisible(true);
                  }}
                />
              )}
            </>
          )}
        </SideNavItemTrailing>
      </SideNavItemContainer>
      {!!subItems?.length && (
        <Collapse in={expanded} timeout={400} unmountOnExit>
          <Box
            sx={{
              ml: '24px',
              mt: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {viewMode
              ? subItems
                  ?.filter((sub) => sub?.visible !== false)
                  ?.map((item) => <SideNavItem {...item} />)
              : subItems.map((item) => <SideNavItem {...item} />)}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

SideNavItem.prototype = {
  visible: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  subItems: PropTypes.arrayOf(PropTypes.shape()),
};

export default SideNavItem;
