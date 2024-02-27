import './Landing.css'

function App() {

    return (
        <>
            <div >
                <nav className='navbar'>


                    <div className='searchbar'>
                        <input type="text" placeholder="Search..." />
                    </div>


                    <div>
                        <p>Home</p>
                    </div>
                </nav>
                <div className='main'>
                    <div className='server'>
                        <div className='image'>
                            <img src="https://as2.ftcdn.net/v2/jpg/02/42/62/57/1000_F_242625767_X6Anv6cJBy2M5sqWSQChIstIWtDnRGDp.jpg" alt="" />
                        </div>
                        <div className='hi'>
                            <div className='details'>
                                <div className='taste'>Taste</div>
                                <div className='color'>Color</div>
                            </div>

                            <div className='rating'> rating

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
