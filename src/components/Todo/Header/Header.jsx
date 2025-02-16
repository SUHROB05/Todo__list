import './header2.scss';

function Header({ onSearch , toggleMenu}) {
    return (
        <header>
            <div className='menu' onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <input type="text" placeholder='Search...' onChange={(e) => onSearch(e.target.value)}
            />
            {/* <div className='profile'>
                <img src="night.png" alt="" />
            </div> */}
        </header>
    );
}

export default Header;
