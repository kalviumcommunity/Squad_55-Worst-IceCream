import './Landing.css'

function App() {

    return (
        <>
            <div className='mains'>

            <div className='tagline'>
                   <h2>Taste the Mistake: A regrettable spoonful in every bite! 😬</h2>
                </div>
                <nav className='navbar'>
                    <div className='searchbar'>
                        <input type="text" placeholder="Search..." />
                    </div>

                    <div className='about'>
                        <p>About</p>
                    </div>
                </nav>

               <div className='content'>
                  <div className='images'>
                    <img src="https://hellogiggles.com/wp-content/uploads/sites/7/2018/03/16/Sriracha-Ice-Cream-Sundae-still-sixteen-2000.jpg?quality=82&strip=1&resize=640%2C360" alt="" />
                  </div>

                  <div className='flavour'>
                    Ice-cream name
                  </div>

                  <div className='features'>
                    <p>Sugar-free</p>
                    <p>Taste</p>
                    <p>Color</p>
                  </div>

                  <div className='rating'>
                    <p>Rating : </p>
                  </div>
               </div>
                
                
            </div>
        </>
    )
}

export default App
