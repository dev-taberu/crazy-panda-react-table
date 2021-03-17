import {useState} from 'react';

export default function Table ({headers, data, itemsOnPage}) {

    let [tableSearchString, setTableSearchString] = useState('');
    let [tableSortColumn, setTableSortColumn] = useState(null);
    let [tableSortDecrease, setTableSortDecrease] = useState(false);
    let [maxItemsOnPage, setMaxItemsOnPage] = useState((itemsOnPage === undefined)?50:itemsOnPage[0] || 50);
    let [currentPage, setCurrentPage] = useState(0);

    const setSorting = (columnName) => {
        if(tableSortColumn === columnName) {
            setTableSortDecrease(!tableSortDecrease);
            return;
        }
        
        setTableSortColumn(columnName);
        setTableSortDecrease(false);
    }

    const sortFunc = (item1, item2) => {
        if(item1[tableSortColumn] < item2[tableSortColumn])
            return -1;
        else if(item1[tableSortColumn] > item2[tableSortColumn])
            return 1;
        else
            return 0;
    }

    const searchPredicate = (e) => {
        let res = false;
        Object.keys(e).forEach(item => { 
            if(e[item].toString().indexOf(tableSearchString) !== -1) {
                res = true;
            }
        })

        return res;
    }

    const search = (data) => {
        if(tableSearchString.length === 0)
            return data;

        return data.filter(searchPredicate);

    }

    const sort = (data) => {
        if(tableSortColumn === null)
            return data;
        
        if(tableSortDecrease) {
            return data.sort((i1, i2) => sortFunc(i2, i1));
        } else {
            return data.sort(sortFunc);
        }
    }

    const renderHeaders = (table_headers) => table_headers.map(header => (
        <th className='table__content-header' onClick={() => { setSorting(header) }}><a className='table__content-header-name' href='#'>{headers[header]}</a>{(tableSortColumn === header)?(tableSortDecrease)?'↓':'↑':''}</th>
    ))

    const renderRows = (data, table_headers) => {
        let start_item_index = maxItemsOnPage * currentPage;
        let end_item_index = start_item_index + maxItemsOnPage;

        return data.slice(start_item_index, end_item_index).map(item => (
            <tr className='table__content-row'>
                {renderCells(item, table_headers)}
            </tr>
        ))
    }

    const renderCells = (item, table_headers) => (
        table_headers.map(header => (
            <td className='table__content-cell'>{item[header]}</td>
        ))
    )

    const renderPagination = (data) => {
        let pagesCount = Math.trunc(data.length / maxItemsOnPage) + 1;
        if(currentPage >= pagesCount)
            setCurrentPage(0);
        return new Array(pagesCount).fill(null).map((el, i) => (
            <a href='#' className={`table__pagination-number ${(currentPage === i)?'page-active':''}`} onClick={() => {setCurrentPage(i)}}>{i+1}</a>
        ))
    }

    const renderTableContent = (data, headers) => {
        return (
            <table className='table__content'>
                {renderHeaders(headers)}
                {renderRows(data, headers)}
            </table>
        )
    }

    const renderTable = () => {
        let table_headers = Object.keys(headers);
        let prepared_data = sort(search(data));

        return (
            <div className='table'>
                <div className='table__search'>
                    <label className='table__search-label'>Search:</label>
                    <input className='table__search-input' onChange={(e) => setTableSearchString(e.target.value)}/>
                </div>
                {renderTableContent(prepared_data, table_headers)}
                <div className='table__pagination'>
                    <a href='#' className='table__pagination-prev' onClick={() => {if(currentPage !== 0) setCurrentPage(currentPage - 1)}}>Prev</a>
                    {renderPagination(prepared_data)}
                    <a href='#' className='table__pagination-next' onClick={() => {if(currentPage !== (Math.trunc(data.length / maxItemsOnPage))) setCurrentPage(currentPage + 1)}}>Next</a>
                </div>
            </div>
            
        )
    }

    return(
        <div className='table-container'>
            {renderTable()}
        </div>
    );
}