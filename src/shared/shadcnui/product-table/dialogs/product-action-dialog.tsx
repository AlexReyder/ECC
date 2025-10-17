"use client";

import {
  uniqueProductArticleNumber,
  uniqueProductName,
} from "@/shared/api/admin/formUnique";
import { addProduct } from "@/shared/api/admin/products";
import { Button } from "@/shared/shadcnui/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcnui/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcnui/ui/form";
import { Input } from "@/shared/shadcnui/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shared/shadcnui/ui/radio-group";
import { Switch } from "@/shared/shadcnui/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/shadcnui/ui/tabs";
import { Textarea } from "@/shared/shadcnui/ui/textarea";
import { IImagesData } from "@/shared/types/file";
import {
  FiltersNSpecDb,
  ProductsDb,
  ProductsDbAdd,
  ProductsDbAddSchema,
} from "@/shared/types/validation/products";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import slug from "slug";
import { FileUploader } from "../../file-uploader";
import { Label } from "../../ui/label";
import MultipleSelector from "../../ui/multiple-select";

interface Props {
  currentRow?: ProductsDb;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}

export function ProductActionDialog({
  currentRow,
  open,
  onOpenChange,
  data,
}: Props) {
  const isEdit = !!currentRow;
  const loadImages = isEdit ? currentRow.images : [];
  const [images, setImages] = useState<IImagesData | []>(loadImages);
  const labelAdState = currentRow?.isNew
    ? "new"
    : currentRow?.isBestseller
      ? "bestseller"
      : "none";
  const [labelAd, setLabelAd] = useState(labelAdState);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProductsDbAdd>({
    resolver: zodResolver(ProductsDbAddSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          id: "",
          name: "",
          isActive: true,
          isInStock: true,
          articleNumber: "",
          description: "",
          adPrice: 0,
          price: 0,
          images,
          category: [],
          sizes: [],
          colors: [],
          material: [],
          categoryFilter: [],
          colorsFilter: [],
          sizesFilter: [],
          materialFilter: [],
        },
  });

  const onSubmit = async (values: ProductsDbAdd) => {
    values.images = images;
    values.labelAd = labelAd;
    values.categoryFilter = values.category.map((item) => item.value);
    values.colorsFilter = values.colors.map((item) => item.value);
    values.sizesFilter = values.sizes.map((item) => item.value);
    values.materialFilter = values.material.map((item) => item.value);
    const { success, error } = await addProduct(values);
    const toastMessage = isEdit
      ? "Товар успешно изменен"
      : "Товар успешно добавлен";
    if (success) {
      toast.success(toastMessage);
    }

    if (error) {
      toast.error("Произошла ошибка");
      console.log(error);
    }
    onOpenChange(false);
    resetForm();
  };

  function resetForm() {
    setImages({});
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(state) => {
          form.reset();
          resetForm();
          onOpenChange(state);
        }}
      >
        <DialogContent className="sm:max-w-19/20 max-w-19/20  h-19/20 overflow-y-auto">
          <DialogHeader className="text-left">
            <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {isEdit ? "Изменить товар" : "Добавить новый товар"}
            </DialogTitle>
          </DialogHeader>
          <div className="-mr-4 h-full w-full  py-1 pr-4">
            <Form {...form}>
              <form
                id="product-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-0.5"
              >
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
                  Основное:
                </h4>
                <IsProductActive form={form} />
                <ProductName form={form} />
                <ProductDescription form={form} />
                <ProductArticle form={form} />
                <ProductAdPrice form={form} />
                <ProductPrice form={form} />
                <ProductLabelAd state={labelAd} setState={setLabelAd} />

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
                  Фильтры:
                </h4>
                <FormTemplateField
                  name="category"
                  form={form}
                  data={data.categories}
                  title="Категория"
                  placeholder="Выберите категорию товара"
                  isEdit={isEdit}
                  maxSelected={1}
                />

                <FormTemplateField
                  name="colors"
                  form={form}
                  data={data.colors}
                  title="Доступные цвета"
                  placeholder="Выберите доступные цвета"
                  isEdit={isEdit}
                />

                <FormTemplateField
                  name="sizes"
                  form={form}
                  data={data.sizes}
                  title="Доступные размеры"
                  placeholder="Выберите доступные размеры"
                  isEdit={isEdit}
                />

                <FormTemplateField
                  name="material"
                  form={form}
                  data={data.materials}
                  title="Доступные материалы"
                  placeholder="Выберите материалы"
                  isEdit={isEdit}
                />
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
                  Фотографии:
                </h4>
                <ProductImages
                  form={form}
                  images={images}
                  setImages={setImages}
                />
              </form>
            </Form>
          </div>
          <DialogFooter>
            <Button type="submit" form="product-form">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />
    </>
  );
}

interface FormTemplateFieldP {
  title: string;
  placeholder: string;
  name: string;
  form: UseFormReturn<ProductsDbAdd, any, ProductsDbAdd>;
  data: any;
  isEdit: boolean;
  maxSelected?: number;
  defaultValue?: any;
}

const FormTemplateField = ({
  form,
  name,
  data,
  title,
  placeholder,
  isEdit,
  maxSelected,
  defaultValue,
}: FormTemplateFieldP) => {
  const valueDefault: any = defaultValue ? defaultValue : [];
  const items = data.map((item: any) => {
    if (name === "category") {
      return {
        label: (item.gender === "MAN" ? "M > " : "Ж > ") + item.name,
        value: item.slug,
      };
    }
    return { label: item.name, value: item.slug };
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
          <FormLabel className="col-span-2 text-right">{title}</FormLabel>
          <FormControl>
            <div className="col-span-4">
              <MultipleSelector
                {...field}
                value={
                  valueDefault.length > 0
                    ? !field.value
                      ? valueDefault
                      : field.value
                    : field.value
                }
                // value={valueDefault.length > 0 ? valueDefault : field.value}
                onChange={(e) => {
                  field.onChange(e);
                }}
                maxSelected={maxSelected ? maxSelected : undefined}
                defaultOptions={items}
                placeholder={placeholder}
                hidePlaceholderWhenSelected={true}
              />
            </div>
          </FormControl>
          <FormMessage className="col-span-4 col-start-3" />
        </FormItem>
      )}
    />
  );
};

const ProductName = (form: { form: any }) => {
  const [err, setErr] = useState("");
  const handleUnique = async (e: ChangeEvent<HTMLInputElement>) => {
    const isUnique = await uniqueProductName(e.target.value);
    if (!isUnique) {
      setErr(
        "Ошибка. Поле должно быть уникальным. Товар с таким названием уже существует.",
      );
      return;
    }
    setErr("");
  };
  return (
    <FormField
      //@ts-ignore:next-line
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
          <FormLabel className="col-span-2 text-right">Название</FormLabel>
          <FormControl>
            <Input
              placeholder="Название товара"
              className="col-span-4"
              autoComplete="off"
              {...field}
              onBlur={handleUnique}
            />
          </FormControl>
          {err ? (
            <p className="text-red-600 col-span-6 text-sm">{err}</p>
          ) : null}
          <FormMessage className="col-span-4 col-start-3" />
        </FormItem>
      )}
    />
  );
};

const ProductDescription = (form: { form: any }) => {
  return (
    <FormField
      //@ts-ignore:next-line
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
          <FormLabel className="col-span-2 text-right">Описание</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Описание товара"
              className="col-span-4"
              autoComplete="off"
              {...field}
            />
          </FormControl>
          <FormMessage className="col-span-4 col-start-3" />
        </FormItem>
      )}
    />
  );
};
const ProductArticle = (form: { form: any }) => {
  const [err, setErr] = useState("");

  const handleUnique = async (e: ChangeEvent<HTMLInputElement>) => {
    const isUnique = await uniqueProductArticleNumber(e.target.value);
    if (!isUnique) {
      setErr(
        "Ошибка. Поле должно быть уникальным. Товар с таким артикулом уже существует.",
      );
      return;
    }
    setErr("");
  };
  return (
    <FormField
      //@ts-ignore:next-line
      control={form.control}
      name="articleNumber"
      render={({ field }) => (
        <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
          <FormLabel className="col-span-2 text-right">Артикул</FormLabel>
          <FormControl>
            <Input
              placeholder="Артикул товара"
              className="col-span-4"
              autoComplete="off"
              {...field}
              onBlur={handleUnique}
            />
          </FormControl>
          {err ? (
            <p className="text-red-600 col-span-6 text-sm">{err}</p>
          ) : null}
          <FormMessage className="col-span-4 col-start-3" />
        </FormItem>
      )}
    />
  );
};
const ProductAdPrice = (form: { form: any }) => {
  return (
    <FormField
      //@ts-ignore:next-lnie
      control={form.control}
      name="adPrice"
      render={({ field }) => (
        <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
          <FormLabel className="col-span-2 text-right">
            Цена товара до скидки
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Цена товара до скидки"
              className="col-span-4"
              autoComplete="off"
              {...field}
            />
          </FormControl>
          <FormMessage className="col-span-4 col-start-3" />
        </FormItem>
      )}
    />
  );
};

const ProductPrice = (form: { form: any }) => {
  return (
    <FormField
      //@ts-ignore:next-lnie
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
          <FormLabel className="col-span-2 text-right">
            Цена товара после скидки
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Цена товара после скидки"
              className="col-span-4"
              autoComplete="off"
              {...field}
            />
          </FormControl>
          <FormMessage className="col-span-4 col-start-3" />
        </FormItem>
      )}
    />
  );
};

const ProductLabelAd = ({ state, setState }: { state: any; setState: any }) => {
  const onChange = (e) => {
    setState(e);
  };

  return (
    <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
      <FormLabel className="col-span-2 text-left">Флажок товара</FormLabel>
      <RadioGroup
        defaultValue={state}
        onValueChange={onChange}
        className="col-span-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="option-one" />
          <Label htmlFor="option-one">Не указан</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="option-two" />
          <Label htmlFor="option-two">Новинка</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bestseller" id="option-three" />
          <Label htmlFor="option-three">Хит</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

const IsProductActive = (form: { form: any }) => {
  return (
    <FormField
      //@ts-ignore:next-line
      control={form.control}
      name="isActive"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <FormLabel className="col-span-2 text-right">
            Показывать товар в каталоге
          </FormLabel>
          <div className="col-span-4">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};
const ProductImages = ({
  form,
  images,
  setImages,
}: {
  form: UseFormReturn<ProductsDbAdd, any, ProductsDbAdd>;
  images: any;
  setImages: any;
}) => {
  return (
    <div>
      <FileUploader
        value={images}
        onValueChange={setImages}
        maxFiles={10}
        maxSize={10 * 1024 * 1024}
      />
    </div>
  );
};
