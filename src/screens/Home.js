import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:7000/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();
      setFoodItem(responseData[0]);
      setFoodCat(responseData[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }} >
              <div className="d-flex justify-content-center" >
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg"
                className="d-block w-100"
                alt="burger"
                style={{ objectFit: 'cover', height: '700px', width: '100%', filter: "brightness(30%)" }}
              />
              {/* <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="burger" style={{ filter: "brightness(30%)" }} /> */}
            </div>
            <div className="carousel-item">
              <img src="https://www.shutterstock.com/image-photo/tasty-breakfast-cup-coffee-jam-600nw-2448687433.jpg" className="d-block w-100" alt="cupcakes" style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://media.istockphoto.com/id/1814338392/photo/veg-momos-or-steamed-momos-with-tamato-chilli-sauce.jpg?s=612x612&w=0&k=20&c=17hlDG9NGY6z-d4i681dIl2D_JTaQrZd5dHwgG2b1mY=" className="d-block w-100" alt="momos" style={{ filter: "brightness(30%)" }} />
            </div>
          </div>  
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {foodCat.length !== 0 ? (
          foodCat.map((data, index) => {
            return (
              <div className='row mb-3' key={index}>
                <div className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {foodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card
                      foodItem={filterItems}
                      options={filterItems.options[0]}
                    />
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          "No categories found"
        )}
      </div>


      <Footer />
    </div>
  );
}

export default Home;
