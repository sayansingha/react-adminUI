import { useEffect, useState } from "react";
import { BiEditAlt } from 'react-icons/bi'
import { BsCheckCircle } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import EditableCell from "./EditableCell";

const Table = ({ data, totalData, deleteRows, setRows, currentPage, itemsPerPage, mainChecked, setMainChecked }) => {

    const [editableRows, setEditableRows] = useState({});
    const [selectedRows, setSelectedRows] = useState({});

    useEffect(() => {
        for(let i = 0; i < totalData.length; i++) {
            const newElement = {};
            newElement[totalData[i].id] = true;
            setEditableRows((oldData) => ({...oldData, ...newElement }));
        }

        for(let i = 0; i < totalData.length; i++) {
            const newElement = {};
            newElement[totalData[i].id] = false;
            setSelectedRows((oldData) => ({...oldData, ...newElement}));
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
            return <BiEditAlt onClick={() => updateEdit(id)} className='icons' />;
        } else {
            return <BsCheckCircle onClick={() => updateEdit(id)} className='icons' />;
        }
    }

    const deleteRow = (id) => {
        const rowIds = [id];
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

            if(!mainChecked[currentPage]) {
                const newElement = [];
                newElement.push(item.id);
                setRows(oldData => [...oldData, ...newElement]);
            } else {
                setRows(oldData => oldData.filter(row => row!== item.id))
            }
        })

        const newElement = {};
        newElement[currentPage] = !mainChecked[currentPage];
        setMainChecked((oldData) => ({...oldData, ...newElement}))
    }

    const handleSelectedRow = (id) => {

        if(!selectedRows[id]) {
            const newElement = [];
            newElement.push(id);
            setRows(oldData => [...oldData, ...newElement]);
        } else {
            setRows(oldData => oldData.filter(row => row!== id))
        }

        const updatedSelectedRows = {};
        updatedSelectedRows[id] = !selectedRows[id];
        setSelectedRows(selectedRows => ({
            ...selectedRows,
            ...updatedSelectedRows
        }))

    }

    return (
        <table className="container">
            <tbody>
                <tr className="table-row">
                    <th>
                        <input
                            type="checkbox"
                            checked={mainChecked[currentPage]}
                            onChange={handleMainChecked}
                        />
                    </th>
                    <th className="table-head-color">Name</th>
                    <th className="table-head-color">Email</th>
                    <th className="table-head-color">Role</th>
                    <th className="table-head-color">Actions</th>
                </tr>
                {data.map((item) => (
                    <tr key={item.id} style={{backgroundColor: selectedRows[item.id] ? 'lightgray' : ''}}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows[item.id]}
                                onChange={() => handleSelectedRow(item.id)}
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
                            <div>
                                {getEditButton(item.id)}
                                <AiFillDelete onClick={() => deleteRow(item.id)} className='delete-icon'/>  
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;