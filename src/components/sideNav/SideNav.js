import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Button } from '@mui/material';
import NavSortableList from './NavSortableList';
import SideNavItem from './SideNavItem';
import { useSideNavStore } from '../../store/useSideNavStore';
import { postNavs } from '../../apis/actions';

const SideNav = () => {
  const {
    sideNav: { viewMode, setViewMode, navs, setEditedNavs, editedNavs },
  } = useSideNavStore();

  if (viewMode) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navs
          .filter((nav) => nav.visible !== false)
          .map((item, index) => (
            <SideNavItem
              key={index}
              {...item}
              subItems={item?.children ?? []}
            />
          ))}
      </Box>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <NavSortableList list={navs} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
          padding: '16px',
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setViewMode(true);
            setEditedNavs(navs);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setViewMode(true);
            postNavs(editedNavs);
          }}
        >
          Save
        </Button>
      </Box>
    </DndProvider>
  );
};

export default SideNav;
