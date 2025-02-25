import React from 'react'
import TableRow from './ListItem'

const List = ({ item }) => {
    if (!item || !item.length > 0) return;
  return (
    <div className='myTableWrapper'>
        <table className='myTable'>
            
            <thead className='tableHeader'>
                <tr className='myTr'>
                    {Object.entries(item[0]).map(([key, value], index)=>
                        
                    
                            <th key={index}>{key}</th>
                        
                    
                    )}
                </tr>
            </thead>  
            
            <tbody>
                {item.map((tableItem, index) =>
                    <TableRow 
                        key = {index}
                        tableRow = {tableItem}
                    />   
                            
                )}
            </tbody>
                
        </table>
    </div>
  )
}

export default List