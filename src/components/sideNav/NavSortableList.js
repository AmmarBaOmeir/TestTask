import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import SideNavItem from './SideNavItem';
import { trackNavs } from '../../apis/actions';
import { useSideNavStore } from '../../store/useSideNavStore';

const ItemType = 'ITEM';

const SortableItem = ({ id, index, moveItem, ...rest }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index, originalIndex: index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    drop: (draggedItem) => {
      const oldIndex = draggedItem.originalIndex;
      const newIndex = draggedItem.index;
      const itemId = draggedItem.id;
      rest.onDrop({ oldIndex, newIndex, itemId });
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      <SideNavItem id={id} index={index} moveItem={moveItem} {...rest} />
    </div>
  );
};

SortableItem.prototype = {
  id: PropTypes.string,
  title: PropTypes.string,
  index: PropTypes.string,
  moveItem: PropTypes.func,
  onDrop: PropTypes.func,
  subItems: PropTypes.arrayOf(PropTypes.shape()),
  target: PropTypes.string,
};

const SortableList = (props) => {
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
        <SortableItem
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

SortableList.prototype = {
  list: PropTypes.arrayOf({
    id: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default SortableList;
