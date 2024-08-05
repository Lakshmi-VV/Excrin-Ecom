import React,{useContext, useState, useEffect} from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from '../components/Product'; 
import { CategoryContext } from "../contexts/CategoryContext.jsx";
import Category from '../components/Category.jsx';
import Paginate from '../components/Paginate.jsx';
import { BsSearch } from "react-icons/bs";
import { Range, getTrackBackground } from 'react-range';
import { useNavigate } from "react-router-dom";

function Home(){

    const {products} = useContext(ProductContext);
    const {category} = useContext(CategoryContext);
    
    //for pagination
    const[currentPage,setCurrentPage] =useState(1);
    const productPerPage = 8;
 
    const [filteredProducts, setFilteredProducts] = useState(products);

    //Search  by name
    const [searchName, setSearchName] = useState(""); 

    //Category check box
    const [selectedCategories, setSelectedCategories] = useState([]);

    //for price range 
    const STEP = 1;
    const MIN = 0;
    const MAX = 700; 
    const [priceRange, setPriceRange] = useState([MIN, MAX]);

    // Sorting drop down
    const [sortOption, setSortOption] = useState("default");

    useEffect(() => {
    //initial products
        filterProducts();
      }, [products,searchName,selectedCategories,priceRange,sortOption]);
    
    const filterProducts =() =>{
        let updatedProducts = products;

        // Filter by search name
        if (searchName) {
        updatedProducts = updatedProducts.filter((item) =>
          item.title.toLowerCase().includes(searchName.toLowerCase())
        );
      }
       // Filter by selected categories
        if (selectedCategories.length > 0) {
        updatedProducts = updatedProducts.filter((item) =>
          selectedCategories.includes(item.category)
        );
      }

       // Filter by price range
       updatedProducts = updatedProducts.filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

     // Sort products
     if (sortOption === "nameAsc") {
      updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "nameDesc") {
        updatedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "priceLowToHigh") {
        updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
        updatedProducts.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(updatedProducts);
    setCurrentPage(1); 
    };

    // Handle category checkbox change
   const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
    };
    
    // Handle sort option change
     const handleSortChange = (e) => {
    setSortOption(e.target.value);
    };

    //pagination calc
    const lastProductIndex = currentPage * productPerPage; 
    const firstProductIndex = lastProductIndex - productPerPage;
    const currentProduct = filteredProducts.slice(firstProductIndex,lastProductIndex);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   
    return(
        <>
        <div className="flex">
        
         <div className="w-[400px] mx-3 flex flex-col gap-4">
        {/* search by name */}
        <div className="flex items-center">
            <input className="border border-gray-300 rounded p-2 m-2" placeholder="Search by name"
             onChange={e => setSearchName(e.target.value)} />
            <BsSearch onClick={filterProducts} className="cursor-pointer ml-2"  />
        </div>

        {/* Checkbos category */}
        <div>
        {category.map((cat) => (
          <label key={cat} className="flex items-center m-2">
            <input
              type="checkbox"
              className="mr-2" 
              onChange={() => handleCategoryChange(cat)}
              />
            {cat}
          </label> 
        ))}
       </div>

       {/* price range */}
       <div className=" mb-5">
                <span className="mr-2 font-semibold ">Price Range:</span><br /> <br/>
                <Range
                    values={priceRange}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setPriceRange(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '4px',
                                width: '300px',
                                background: getTrackBackground({
                                    values: priceRange,
                                    colors: ['#ccc', 'black', '#ccc'],
                                    min: MIN,
                                    max: MAX
                                }),
                                borderRadius: '3px'
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '10px',
                                width: '10px',
                                borderRadius: '12px',
                                backgroundColor: 'gray',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    height: '5px',
                                    width: '5px',
                                    borderRadius: '3px',
                                    backgroundColor: '#FFF'
                                }}
                            />
                        </div>
                    )}
                />
                <div className="mt-3 flex items-center justify-between w-[300px]">
                    <span className="mr-2">Min: {priceRange[0]}</span>
                    <span>Max: {priceRange[1]}</span>
                </div>
            </div>

              {/* Sort dropdown */}
              <div className="mb-5">
                <label className="mr-2 font-semibold">Sort by:</label>
                <select value={sortOption} onChange={handleSortChange} className="border border-gray-300 rounded p-2">
                    <option value="default">Default</option>
                    <option value="nameAsc">Name (A-Z)</option>
                    <option value="nameDesc">Name (Z-A)</option>
                    <option value="priceLowToHigh">Price (Low to High)</option>
                    <option value="priceHighToLow">Price (High to Low)</option>
                </select>
            </div>
            </div>
        <div className="product-display">
             {filteredProducts.length === 0 ? (
                        <p className="flex justify-center w-[1000px]">Sorry, no products found</p>
                    ) : (
                        currentProduct.map((product) => {
                            return <Product product={product} 
                            key={product.id } />
                        })
                    )}
 
</div>
        </div>
        <Paginate 
            productPerPage={productPerPage} 
            totalProduct ={ filteredProducts.length} 
            paginate={paginate}
        /> 
        </>
    )
} 
export default Home
