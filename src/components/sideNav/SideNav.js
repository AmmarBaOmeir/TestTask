import { DndProvider } from 'react-dnd';
import { Box, Button } from '@mui/material';
import NavSortableList from './NavSortableList';
import SideNavItem from './SideNavItem';
import { useSideNavStore } from '../../store/useSideNavStore';
import { getNavs, postNavs } from '../../apis/actions';
import HTML5toTouch from '../../HTML5toTouch';
import { MultiBackend } from 'react-dnd-multi-backend';

const SideNav = () => {
  const {
    sideNav: {
      viewMode,
      setViewMode,
      setNavs,
      navs,
      setEditedNavs,
      editedNavs,
    },
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
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
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
            postNavs(editedNavs).then(() => {
              getNavs().then((navList) => {
                setNavs(navList);
                setEditedNavs(navList);
              });
            });
          }}
        >
          Save
        </Button>
      </Box>
    </DndProvider>
  );
};

export default SideNav;
