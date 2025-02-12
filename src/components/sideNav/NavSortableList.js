import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { trackNavs } from '../../apis/actions';
import { useSideNavStore } from '../../store/useSideNavStore';
import NavSortableItem from './NavSortableItem';

const NavSortableList = (props) => {
  const { list } = props;
  const [items, setItems] = useState(list);
  const {
    sideNav: { setEditedNavs },
  } = useSideNavStore();

  const moveItem = useCallback((fromIndex, toIndex) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
    setEditedNavs(newItems);
  }, []);

  const onDrop = ({ oldIndex, newIndex, itemId }) => {
    trackNavs({ id: itemId, from: oldIndex, to: newIndex });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, index) => (
        <NavSortableItem
          key={item?.id}
          {...item}
          subItems={item?.children}
          index={index}
          moveItem={moveItem}
          onDrop={onDrop}
        />
      ))}
    </Box>
  );
};

NavSortableList.prototype = {
  list: PropTypes.arrayOf({
    id: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default NavSortableList;
