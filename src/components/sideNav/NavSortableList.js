import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import SideNavItem from './SideNavItem';

const ItemType = 'ITEM';

const SortableItem = ({ id, title, index, subItems, target, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      <SideNavItem
        id={id}
        title={title}
        index={index}
        subItems={subItems}
        target={target}
      />
    </div>
  );
};

SortableItem.prototype = {
  id: PropTypes.string,
  title: PropTypes.string,
  index: PropTypes.string,
  moveItem: PropTypes.func,
  subItems: PropTypes.arrayOf(PropTypes.shape()),
  target: PropTypes.string,
};

const SortableList = (props) => {
  const { list } = props;
  const [items, setItems] = useState(list);

  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <SortableItem
          key={item.id}
          subItems={item.children}
          id={item.id}
          title={item.title}
          index={index}
          target={item.target}
          moveItem={moveItem}
        />
      ))}
    </div>
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
