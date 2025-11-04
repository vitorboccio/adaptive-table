import { useState, useCallback, useEffect } from "react";
import { type Column } from "../types";

export const useColumnResize = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[],
  tableWidth: number,
  hasCheckbox: boolean,
  onResize?: (columnWidths: number[]) => void
) => {
  const [columnWidths, setColumnWidths] = useState<number[]>([]);

  useEffect(() => {
    const checkboxWidth = hasCheckbox ? 40 : 0;
    const availableWidth = tableWidth - checkboxWidth;
    const equalWidth = availableWidth / columns.length;
    const initialWidths = hasCheckbox
      ? [checkboxWidth, ...columns.map(() => equalWidth)]
      : columns.map(() => equalWidth);

    setColumnWidths(initialWidths);
    onResize?.(initialWidths);
  }, [columns.length, tableWidth, hasCheckbox, onResize]);

  const handleColumnResize = useCallback(
    (index: number, newWidth: number) => {
      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        const actualIndex = hasCheckbox ? index - 1 : index;
        const oldWidth = newWidths[index];

        if (index === 0 && hasCheckbox) return prevWidths;

        const minWidth = columns[actualIndex]?.minWidth || 50;

        const clampedNewWidth = Math.max(newWidth, minWidth);
        const actualWidthChange = clampedNewWidth - oldWidth;

        if (actualWidthChange === 0) return prevWidths;

        newWidths[index] = clampedNewWidth;

        const nextColumnIndex = index + 1;

        if (nextColumnIndex < newWidths.length) {
          const nextActualIndex = hasCheckbox
            ? nextColumnIndex - 1
            : nextColumnIndex;
          const nextMinWidth = columns[nextActualIndex]?.minWidth || 50;
          const nextNewWidth = newWidths[nextColumnIndex] - actualWidthChange;

          if (nextNewWidth >= nextMinWidth) {
            newWidths[nextColumnIndex] = nextNewWidth;
          } else {
            return prevWidths;
          }
        } else {
          if (actualWidthChange > 0) {
            return prevWidths;
          }
        }

        onResize?.(newWidths);
        return newWidths;
      });
    },
    [columns, hasCheckbox, onResize]
  );

  return { columnWidths, handleColumnResize };
};
