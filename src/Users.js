import { useState, useEffect } from 'react';
import useMembers from './FetchingData/useMembers';
import Table from './Table';
import Pagination from './Pagination';
const Users = () => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState([]);
    const itemsPerPage = 10;
    const { usersData, error, loading } = useMembers();
    const [data, setData] = useState(null);
    const [mainChecked, setMainChecked] = useState({});

    useEffect(() => {
        setData(usersData);
    }, [usersData])
    

    const search = (data) => {
        return data.filter(
            (item) => item.name.toLowerCase().includes(query) || 
                        item.email.toLowerCase().includes(query) || 
                        item.role.toLowerCase().includes(query) ||
                        item.id.includes(query)
        )
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const onInputChange = (event) => {
        setQuery(event.target.value);
        setCurrentPage(1)
    }

    const deleteRows = (ids) => {
        ids.map((id) => setData(data => data.filter((item) => item.id !== id)))
    }

    console.log(rows);

    const handleDeleteSelected = () => {
        deleteRows(rows);
        setRows([]);
        const totalPages = Math.ceil(data.length / itemsPerPage);
        for(let i = 1; i <= totalPages; i++) {
            const newElement = {};
            newElement[i] = false;
            setMainChecked((oldData) => ({...oldData, ...newElement}))
        }
        setCurrentPage(1);
    }

    return ( 
        <div className='container'>
            <div>
            <input
                type='text'
                placeholder='Search by name, email or role...'
                value={query}
                onChange={(e) => onInputChange(e)}
                className='search-bar'
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {
                data && (
                    <div>
                        <Table 
                            data={search(data).slice(indexOfFirstItem, indexOfLastItem)} 
                            totalData={data} 
                            deleteRows={deleteRows}
                            setRows={setRows}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            mainChecked={mainChecked}
                            setMainChecked={setMainChecked}
                            />
                    </div>
                    
                )
            }
            </div>
            {data && 
                <div className='flex-container'>
                    <button onClick={handleDeleteSelected} className='delete'>
                        Delete Selected
                    </button>
                    <Pagination 
                        itemsPerPage={itemsPerPage} 
                        totalItems={search(data).length} 
                        paginate={paginate} 
                        currentPage={currentPage}
                    />
            </div>}
        </div>
    )
}

export default Users;