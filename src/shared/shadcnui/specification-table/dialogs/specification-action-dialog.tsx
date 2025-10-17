"use client";

import { Label } from "../../ui/label";
import { categoryGenderSchema } from "@/shared/types/schemas";
import { RadioGroup, RadioGroupItem } from "@/shared/shadcnui/ui/radio-group";
import { upsertCategory } from "@/shared/api/admin/categories";
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
import { SpecificationAdmin } from "@/shared/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Обязательное поле." }),
  gender: z.any(),
});

export type SpecForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: SpecificationAdmin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SpecActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const form = useForm<SpecForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          name: currentRow.name,
          gender: currentRow.gender,
        }
      : {
          name: "",
          gender: "MAN",
        },
  });

  const onSubmit = async (values: SpecForm) => {
    values.id = isEdit ? currentRow.id : "";
    console.log(values);
    const { success, error } = await upsertCategory(values);
    form.reset();

    const toastMessage = isEdit
      ? "Категория успешно изменена"
      : "Категория успешно добавлена";
    if (success) {
      toast.success(toastMessage);
    }

    if (error) {
      toast.error("Произошла ошибка");
    }

    onOpenChange(false);
  };

  return (
    <>
      {
        <Dialog
          open={open}
          onOpenChange={(state) => {
            form.reset();
            onOpenChange(state);
          }}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader className="text-left">
              <DialogTitle>
                {isEdit ? `Изменить категорию` : `Добавить категорию`}
              </DialogTitle>
            </DialogHeader>
            <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
              <Form {...form}>
                <form
                  id="specification-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 p-0.5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                        <FormLabel className="col-span-2 text-right">
                          Название
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            className="col-span-4"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                        <FormLabel className="col-span-2 text-right">
                          Пол
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="col-span-4"
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={"MAN"} id="option-two" />
                              <Label htmlFor="option-two">Для мужчин</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={"WOMEN"}
                                id="option-three"
                              />
                              <Label htmlFor="option-three">Для женщин</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-3" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <DialogFooter>
              <Button type="submit" form="specification-form">
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />
    </>
  );
}
