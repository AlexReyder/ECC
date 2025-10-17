import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FC } from "react"
import ProductDraggableItem, { ItemProps } from './product-image-draggable-item'

const ProductSortableItem: FC<ItemProps> = (props) => {
		const {
				isDragging,
				attributes,
				listeners,
				setNodeRef,
				transform,
				transition
		} = useSortable({ id: props.id });

		const style = {
				transform: CSS.Transform.toString(transform),
				transition: transition || undefined,
		};

		return (
				<ProductDraggableItem
						ref={setNodeRef}
						style={style}
						withOpacity={isDragging}
						{...props}
						{...attributes}
						{...listeners}
				/>
		);
};

export default ProductSortableItem;
