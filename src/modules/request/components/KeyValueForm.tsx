/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const keyValueSchema = z.object({
  items: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string().min(1, "Value is required"),
      enabled: z.boolean().default(true).optional(),
    })
  ),
});

type KeyValueFormData = z.infer<typeof keyValueSchema>;

export interface KeyValueItem {
  key: string;
  value: string;
  enabled?: boolean;
}

interface KeyValueFormEditorProps {
  initialData?: KeyValueItem[];
  onSubmit: (data: KeyValueItem[]) => void;
  placeholder?: {
    key?: string;
    value?: string;
    description?: string;
  };
  className?: string;
}

const KeyValueFormEditor: React.FC<KeyValueFormEditorProps> = ({
  initialData = [],
  onSubmit,
  placeholder = {
    key: "Key",
    value: "Value",
    description: "Description",
  },
  className,
}) => {
  /**************************************
   * 1️⃣ FORM INITIALIZATION
   **************************************/
  const form = useForm<KeyValueFormData>({
    resolver: zodResolver(keyValueSchema),
    defaultValues: {
      items:
        initialData.length > 0
          ? initialData.map((item) => ({
              ...item,
              enabled: item.enabled ?? true,
            }))
          : [{ key: "", value: "", enabled: true }],
    },
  });

  /**************************************
   * 2️⃣ DYNAMIC ARRAY HANDLING
   **************************************/
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const addNewRow = () => {
    append({ key: "", value: "", enabled: true });
  };

  const toggleEnabled = (index: number) => {
    const current = form.getValues(`items.${index}.enabled`);
    form.setValue(`items.${index}.enabled`, !current);
  };

  const removeRow = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  /**************************************
   * 3️⃣ AUTOSAVE CORE LOGIC
   **************************************/

  /**
   * Stores the last submitted version of data.
   * Used to prevent duplicate submissions.
   */
  const lastSubmittedSnapshotRef = useRef<string | null>(null);

  /**
   * Filters enabled + non-empty items
   */
  const filterValidItems = (items: KeyValueItem[]) =>
    items
      .filter(
        (item) => item.enabled && (item.key?.trim() || item.value?.trim())
      )
      .map(({ key, value }) => ({ key, value }));

  /**
   * Creates a debounced function
   * (classic debounce implementation)
   */
  const createDebouncedFn = (fn: (...args: any[]) => void, delay = 500) => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: any[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  /**************************************
   * 4️⃣ SUBMIT ONLY IF DATA CHANGED
   **************************************/
  const submitIfDataChanged = useCallback(
    (items: KeyValueItem[]) => {
      const filtered = filterValidItems(items);
      const snapshot = JSON.stringify(filtered);

      if (snapshot !== lastSubmittedSnapshotRef.current) {
        lastSubmittedSnapshotRef.current = snapshot;
        onSubmit(filtered);
      }
    },
    [onSubmit]
  );

  /**************************************
   * 5️⃣ REFS TO AVOID STALE CLOSURES
   **************************************/

  /**
   * Always points to the LATEST submit function
   * (important for setTimeout)
   */
  const latestSubmitFnRef = useRef(submitIfDataChanged);

  useEffect(() => {
    latestSubmitFnRef.current = submitIfDataChanged;
  }, [submitIfDataChanged]);

  /**
   * Holds the debounced trigger function
   * Created only once
   */
  const debouncedTriggerRef = useRef<((items: KeyValueItem[]) => void) | null>(
    null
  );

  useEffect(() => {
    debouncedTriggerRef.current = createDebouncedFn((items: KeyValueItem[]) => {
      latestSubmitFnRef.current(items);
    }, 500);
  }, []);

  /**************************************
   * 6️⃣ WATCH FORM CHANGES
   **************************************/
  useEffect(() => {
    const subscription = form.watch((values) => {
      const items = (values as KeyValueFormData)?.items || [];
      debouncedTriggerRef.current?.(items);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // console.log(form);
  return (
    <div className={cn("w-full", className)}>
      <Form {...form}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-400">
              Query Parameters
            </h3>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addNewRow}
                className="h-8 w-8 p-0 hover:bg-zinc-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={cn(
                  "grid grid-cols-12 gap-3 p-3 rounded-lg border transition-all",
                  form.watch(`items.${index}.enabled`)
                    ? "bg-zinc-900 border-zinc-700"
                    : "bg-zinc-800/50 border-zinc-800 opacity-60"
                )}
              >
                {/* Key Input */}
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.key`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={placeholder.key}
                            className="bg-transparent border-0 focus:ring-0 focus:border-0 text-sm placeholder:text-zinc-500"
                            disabled={!form.watch(`items.${index}.enabled`)}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Value Input */}
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={placeholder.value}
                            className="bg-transparent border-0 focus:ring-0 focus:border-0 text-sm placeholder:text-zinc-500"
                            disabled={!form.watch(`items.${index}.enabled`)}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1 flex items-center justify-center">
                  <FormField
                    control={form.control}
                    name={`items.${index}.enabled`}
                    render={({ field: checkboxField }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center justify-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleEnabled(index)}
                              className={cn(
                                "h-5 w-5 p-0 rounded-sm border-2 transition-colors",
                                checkboxField.value
                                  ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                                  : "border-red-500 text-red-500 hover:border-red-400"
                              )}
                            >
                              {checkboxField.value ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <X className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Remove Button */}
                <div className="col-span-1 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRow(index)}
                    disabled={fields.length <= 1}
                    className={cn(
                      "h-5 w-5 p-0 transition-colors",
                      fields.length <= 1
                        ? "text-zinc-600 cursor-not-allowed"
                        : "text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    )}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Autosave enabled — changes are saved automatically */}
          <div className="flex justify-end pt-4">
            <span className="text-xs text-zinc-500">
              Changes saved automatically
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default KeyValueFormEditor;
