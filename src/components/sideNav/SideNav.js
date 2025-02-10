import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavSortableList from './NavSortableList';
import SideNavItem from './SideNavItem';
import { useSideNavStore } from '../../store/useSideNavStore';

const SideNav = () => {
  const {
    sideNav: { viewMode },
  } = useSideNavStore();

  if (viewMode) {
    return (
      <>
        {[
          { id: 1, title: 'test1' },
          { id: 2, title: 'test2' },
          { id: 3, title: 'test3' },
        ].map((item, index) => (
          <SideNavItem key={index} {...item} />
        ))}
      </>
    );
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <NavSortableList
        list={[
          { id: 1, title: 'test1' },
          { id: 2, title: 'test2' },
          { id: 3, title: 'test3' },
        ]}
      />
    </DndProvider>
  );
};

export default SideNav;
