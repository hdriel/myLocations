import './index.sass';
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector } from 'react-redux';

const CategoryDataTable = () => {
    const { categoryList, locationList } = useSelector(state => ({
        categoryList: state.category?.categoryList ?? [],
        locationList: state.location?.locationList ?? [],
    }));

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        {
            field: 'locations',
            headerName: 'Locations',
            width: 130,
            description: 'This column has a value getter and is not sortable.',
            valueGetter: (params) => {
                const count = locationList
                    .filter(location => location.category === params.getValue('id'))
                    .length;
                return `${count}`;
            }
        },
    ];

    const rows = categoryList.map(category => ({
        id: category.id,
        name: category.name,
    }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
}
export default CategoryDataTable;