import React from 'react';
import { IconFeedAdd, IconSearchSubmit } from './cyberpunk/ui';
const SearchButton = ({ query }) => {
  return (
           <div className="form-group" >
             <label className="sr-only" htmlFor="sidebar-search" style={{ marginTop: 100 }}>
               Search feeds
             </label>
             <div className="form-control form-control--with-addon">
               <input
                 id="sidebar-search"
                 name="query"
                 placeholder="Search..."
                 type="text"
                 value={query}
                 onChange={(e) => onQueryChange(e.target.value)}
                 autoComplete="off"
               />
               <div
                 className="form-control__addon form-control__addon--prefix"
                 aria-hidden="true"
               >
                 <IconSearchSubmit />
               </div>
             </div>
           </div>
  
  );
};

export default SearchButton;
