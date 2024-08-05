import React, { useState } from 'react'

function Paginate({productPerPage,totalProduct,paginate}) {

    const pageNumbers =[];
    for(let i=1;i<=Math.ceil(totalProduct/productPerPage);i++){
        pageNumbers.push(i);
    }
    const [activePage,setActivePage] = useState(1);

    const handlePageClick=(number,event)=>{
        event.preventDefault();
        setActivePage(number);
        paginate(number);
    }  
    // console.log(pageNumbers); 
  return (
    <div>
        <nav>
            <ul className="pagination">{
                pageNumbers.map((number)=>(
                    <li key={number} className={`page-item ${activePage === number ? 'active' : ''}`}>
                        <a 
                            href="!#" 
                            className='page-link'
                            onClick={(event)=>{
                            handlePageClick(number,event);
                        }}>
                        {number}   
                        </a>
                    </li>
                ))
                } 
            </ul>
        </nav>
    </div>
  )
}
export default Paginate