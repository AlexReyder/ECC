import { Button } from "@/shared/shadcnui/ui/button";
import { IconDragDrop2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { CSSProperties, forwardRef, HTMLAttributes } from "react";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  withOpacity?: boolean;
  isDragging?: boolean;
  removeFile: any;
};

const ProductDraggableItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, withOpacity, isDragging, style, removeFile, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "50% 50%",
      height: "140px",
      width: "140px",
      borderRadius: "10px",
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      position: "relative",
      ...style,
    };

    return (
      <div
        style={inlineStyles}
        className="relative flex items-center space-x-2"
        key={id.name}
      >
        <Image
          src={id.url}
          alt="Maldito"
          fill
          style={{ objectFit: "contain" }}
          className="aspect-square shrink-0 rounded-md z-1"
        />
        <div className="flex flex-col items-start gap-2 self-baseline z-99 relative left-[15px]">
          <div
            ref={ref}
            {...props}
            className="flex justify-center items-center rounded-full size-8 bg-black z-99"
          >
            <IconDragDrop2 className="text-muted-foreground text-white" />
          </div>
          <Button
            type="button"
            variant="default"
            size="icon"
            onClick={() => removeFile(id.name)}
            className="size-8 rounded-full relative z-99"
          >
            <IconX className="text-muted-foreground text-white" />
            <span className="sr-only">Удалить</span>
          </Button>
        </div>
      </div>
    );
  },
);

export default ProductDraggableItem;
