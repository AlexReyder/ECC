import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useState, useTransition } from "react";
import GridSortable from "./grid";
import ProductSortableItem from "./product-image-item";

interface Props {
  data: any;
  setImages: any;
  setFiles: any;
  removeFile: any;
}

export const ProductImageMover = ({
  data,
  setImages,
  setFiles,
  removeFile,
}: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>(data);
  const [isPending, startTransition] = useTransition();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleMoveImagesStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleMoveImagesEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over?.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleMoveImagesStart}
      onDragEnd={handleMoveImagesEnd}
    >
      {items.length > 0 ? (
        <SortableContext items={items}>
          <GridSortable rows={Math.ceil(items.length / 5)}>
            {items.map((item) => (
              <ProductSortableItem
                key={item.name}
                id={item}
                removeFile={removeFile}
              />
            ))}
          </GridSortable>
        </SortableContext>
      ) : (
        <></>
      )}
    </DndContext>
  );
};

