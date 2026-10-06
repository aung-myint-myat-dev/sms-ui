import { Children } from "react";

export function Table({ children, className = "", ...props }) {
  return (
    <div className="border border-zinc-200 rounded-md overflow-hidden font-roboto">
      <table
        className={`w-full border-collapse ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableColumnGroup({
  children,
  className = "",
  ...props
}) {
  return (
    <colgroup className={className} {...props}>
      {Children.toArray(children)}
    </colgroup>
  );
}

export function TableColumn({
  className = "",
  ...props
}) {
  return (
    <col
      className={className}
      {...props}
    />
  );
}

export function TableHeader({
  children,
  className = "",
  ...props
}) {
  return (
    <thead className={`${className} bg-zinc-100`} {...props}>
      {children}
    </thead>
  );
}

export function TableHead({
  children,
  className = "",
  ...props
}) {
  return (
    <th
      className={`px-4 py-3 text-zinc-500 text-sm font-semibold ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableBody({
  children,
  className = "",
  ...props
}) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  className = "",
  ...props
}) {
  return (
    <tr
      className={`border-b border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  className = "",
  ...props
}) {
  return (
    <td
      className={`px-4 py-3 text-zinc-500 text-xs ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}

export function TableFooter({
  children,
  className = "",
  ...props
}) {
  return (
    <tfoot className={className} {...props}>
      {children}
    </tfoot>
  );
}