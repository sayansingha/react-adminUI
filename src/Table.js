const Table = ({ data }) => {
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
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;