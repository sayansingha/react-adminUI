import { useState } from 'react';
import useMembers from './FetchingData/useMembers';
import Table from './Table';
import Pagination from './Pagination';
const Users = () => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { usersData, error, loading } = useMembers();

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

    return ( 
        <div className='container'>
            <input
                type='text'
                placeholder='Search...'
                value={query}
                onChange={(e) => onInputChange(e)}
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {
                usersData && (
                    <div>
                        <Table data={search(usersData).slice(indexOfFirstItem, indexOfLastItem)} totalItems={usersData.length} />
                    </div>
                    
                )
            }
            <div className='flex-container'>
                <button>Delete Selected</button>
                { usersData && <Pagination itemsPerPage={itemsPerPage} totalItems={search(usersData).length} paginate={paginate} currentPage={currentPage}/>}
            </div>
        </div>
    )
}

export default Users;