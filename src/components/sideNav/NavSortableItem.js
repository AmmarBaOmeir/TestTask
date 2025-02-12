import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import SideNavItem from './SideNavItem';

const ItemType = 'ITEM';

const NavSortableItem = ({ id, index, moveItem, ...rest }) => {
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

NavSortableItem.prototype = {
  id: PropTypes.string,
  title: PropTypes.string,
  index: PropTypes.string,
  moveItem: PropTypes.func,
  onDrop: PropTypes.func,
  subItems: PropTypes.arrayOf(PropTypes.shape()),
  target: PropTypes.string,
};

export default NavSortableItem;
