import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface TableColumn<T> {
    header: string;
    accessor: keyof T | ((data: T) => React.ReactNode);
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    onRowClick?: (item: T) => void;
    showActionIcon?: boolean;
}

export function Table<T>({ data, columns, onRowClick, showActionIcon = true }: TableProps<T>) {
    console.log("dat is", data)
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                        {showActionIcon && <th scope="col" className="relative px-6 py-3"></th>}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => onRowClick && onRowClick(item)}
                            className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                                >
                                    {typeof column.accessor === 'function'
                                        ? column.accessor(item)
                                        : (item[column.accessor] as React.ReactNode)}
                                </td>
                            ))}
                            {showActionIcon && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}