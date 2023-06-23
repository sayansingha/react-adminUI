import { useEffect, useState } from "react";
import EditableCell from "./EditableCell";

const Table = ({ data, totalData, deleteRows, setRows, currentPage, itemsPerPage }) => {

    const [editableRows, setEditableRows] = useState({});
    const [selectedRows, setSelectedRows] = useState({});
    const [mainChecked, setMainChecked] = useState({});

    useEffect(() => {
        for(let i = 0; i < totalData.length; i++) {
            const newElement = {};
            newElement[totalData[i].id] = true;
            setEditableRows((oldData) => ({...oldData, ...newElement }));
        }

        for(let i = 0; i < totalData.length; i++) {
            const newElement = {};
            newElement[totalData[i].id] = false;
            console.log(newElement);
            setSelectedRows((oldData) => ({...oldData, ...newElement}));
        }

        const totalPages = Math.ceil(totalData.length / itemsPerPage);
        for(let i = 1; i <= totalPages; i++) {
            const newElement = {};
            newElement[i] = false;
            setMainChecked((oldData) => ({...oldData, ...newElement}))
        }
    }, [])
    
    const updateEdit = (id) => {
        const updatedValue = {};
        updatedValue[id] = !editableRows[id];
        setEditableRows(edit => ({
            ...edit,
            ...updatedValue
        }))
    }

    const getEditButton = (id) => {
        if(editableRows[id]) {
            return 'Edit';
        } else {
            return 'Done';
        }
    }

    const deleteRow = (id) => {
        const rowIds = [id];
        console.log(rowIds);
        deleteRows(rowIds);
    }

    const handleMainChecked = () => {
        data.map((item) => {
            const updatedSelectedRows = {};
            updatedSelectedRows[item.id] = !mainChecked[currentPage];
            setSelectedRows(selectedRows => ({
                ...selectedRows,
                ...updatedSelectedRows
            }))

        })
        const newElement = {};
        newElement[currentPage] = !mainChecked[currentPage];
        setMainChecked((oldData) => ({...oldData, ...newElement}))
    }

    const handleSelectedRow = () => {

    }

    return (
        <table className="container">
            <tbody>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={mainChecked[currentPage]}
                            onChange={handleMainChecked}
                        />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                {data.map((item) => (
                    <tr key={item.id} style={{backgroundColor: 'grey'}}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows[item.id]}
                                onChange={handleSelectedRow}
                            />
                        </td>
                        <td>
                            <EditableCell value={item.name} isDisabled={editableRows[item.id]} />
                        </td>
                        <td>
                            <EditableCell value={item.email} isDisabled={editableRows[item.id]} />
                        </td>
                        <td>
                            <EditableCell value={item.role} isDisabled={editableRows[item.id]} />
                        </td>
                        <td>
                            <button onClick={() => updateEdit(item.id)}>
                                {getEditButton(item.id)}
                            </button>
                            <button onClick={() => deleteRow(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;