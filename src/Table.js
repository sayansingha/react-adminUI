import { useState } from "react";
import EditableCell from "./EditableCell";

const Table = ({ data, totalItems }) => {
    const editableRows = {};

    for(let i = 1; i <= totalItems; i++) {
        editableRows[i] = true;
    }

    const [edit, setEdit] = useState(editableRows);
    
    const updateEdit = (id) => {
        const updatedValue = {};
        updatedValue[id] = !edit[id];
        setEdit(edit => ({
            ...edit,
            ...updatedValue
        }))
    }

    const getEditButton = (id) => {
        if(edit[id]) {
            return 'Edit';
        } else {
            return 'Done';
        }
    }
    return (
        <table className="container">
            <tbody>
                <tr>
                    <th>
                        <input
                        type="checkbox"
                        />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <input
                            type="checkbox"
                            />
                        </td>
                        <td>
                            <EditableCell value={item.name} isDisabled={edit[item.id]} />
                        </td>
                        <td>
                            <EditableCell value={item.email} isDisabled={edit[item.id]} />
                        </td>
                        <td>
                            <EditableCell value={item.role} isDisabled={edit[item.id]} />
                        </td>
                        <td>
                            <button onClick={() => updateEdit(item.id)}>
                                {getEditButton(item.id)}
                            </button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;