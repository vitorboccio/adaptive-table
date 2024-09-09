# AdaptiveTable Component Documentation

## Overview

AdaptiveTable is a flexible and feature-rich React table component that provides sorting, pagination, column resizing, row selection, and expandable rows. It's designed to be easy to use while offering powerful customization options.

## Installation

```bash
npm install adaptive-table
```

## Basic Usage

```jsx
import AdaptiveTable from 'adaptive-table';
import type { Column } from 'adaptive-table/types'

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', minWidth: 50 },
  { key: 'name', title: 'Name', minWidth: 100 },
  { key: 'email', title: 'Email', minWidth: 200 },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

function App() {
  return (
    <AdaptiveTable<User>
      data={data}
      columns={columns}
      hasCheckbox={true}
      itemsPerPage={10}
    />
  );
}
```

## Props

### `data: T[]`

An array of objects representing the data to be displayed in the table. Each object should match the structure defined by your generic type `T`.

### `columns: Column<T>[]`

An array of column definitions. Each column should have the following properties:

- `key: keyof T | ''`: The key of the data object this column represents.
- `title: string`: The display title for the column header.
- `minWidth: number`: The minimum width of the column in pixels.
- `isSortable?: boolean`: Whether the column is sortable (default: true).
- `isResizable?: boolean` Whether teh column is resizable (default: true).
- `render?: (value: T[keyof T], row: T) => React.ReactNode`: Optional custom render function for cell content.

### `hasCheckbox?: boolean`

Whether to display a checkbox column for row selection. Default is `false`.

### `pageSize?: number`

The number of items to display per page. Default is `10`.

### `pageSizeOptions?: number[]`

The page size options displayed on the table footer

### `onSorting?: (sortingData: SortingState<T>) => void`

Callback function triggered when sorting changes. Receives an object with:

- `column: keyof T | null`: The key of the column being sorted.
- `direction: 'asc' | 'desc' | null`: The sort direction.

### `onPagination?: (paginationData: PaginationState) => void`

Callback function triggered when pagination changes. Receives an object with:

- `currentPage: number`: The current page number.
- `itemsPerPage: number`: The number of items per page.

### `onRowSelect?: (selectedRows: T[]) => void`

Callback function triggered when row selection changes. Receives an array of selected row data.

### `onResize?: (columnWidths: number[]) => void`

Callback function triggered when column widths change due to resizing. Receives an array of column widths.

### `expandedRow?: (row: T) => React.ReactNode`

A function that returns the content to be displayed in the expanded row. If provided, rows become expandable on click.

## Column Resizing

Columns can be resized by dragging the right edge of the column header. The minimum width of a column is determined by the `minWidth` property in the column definition.

## Sorting

Clicking on a column header will sort the data by that column. Clicking again will reverse the sort order. The `sortable` property in the column definition can be used to disable sorting for specific columns.

## Pagination

The table includes built-in pagination. You can customize the number of items per page using the `itemsPerPage` prop.

## Row Selection

When `hasCheckbox` is set to `true`, a checkbox column will appear, allowing for row selection. The `onRowSelect` callback will be triggered with an array of selected row data whenever the selection changes.

## Expandable Rows

When the `expandedRow` prop is provided, rows become expandable. Clicking on a row will toggle its expanded state, showing the content returned by the `expandedRow` function.

## Styling

The component comes with default styling, but you can customize its appearance by overriding the CSS classes. The main classes used are:

- `.adaptive-table-container`: The outer container of the table.
- `.adaptive-table`: The table itself.
- `.adaptive-table-header`: The table header row.
- `.adaptive-table-body`: The container for table body rows.
- `.adaptive-table-row`: Individual table rows.
- `.adaptive-table-cell`: Individual table cells.
- `.adaptive-table-checkbox`: The checkbox cell.
- `.adaptive-table-expanded-row`: The expanded row content container.
- `.adaptive-table-pagination`: The pagination controls container.
- `.adaptive-table-empty-state`: The component when no data is provided or T[].length === 0;

## TypeScript Support

AdaptiveTable is built with TypeScript and provides full type safety. When using the component, provide your data type as a generic parameter:

```typescript
<AdaptiveTable<YourDataType> ... />
```

This ensures type checking for your data, columns, and callback functions.

## Performance Considerations

AdaptiveTable is optimized for performance, using memoization and efficient update mechanisms. However, for very large datasets, consider implementing virtual scrolling or lazy loading to improve performance.
