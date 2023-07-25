import '../assets/css/components/footer.css'

const Footer = () => {
    return (
        <div>
            <footer>
                <div className="footer-wrapper">
                    <section className="footer-top">
                        <a href='' title='logo'>
                            Tech eCommerce
                        </a>
                        <span className='social-links'>

                        </span>
                    </section>
                    <section className='footer-columns'>
                        <section>
                            <ul>
                                <h3>Categoria</h3>
                                <li>
                                    <a href='' title='Solution 1'>Televisiones</a>
                                </li>
                                <li>
                                    <a href='' title='Solution 2'>Computadoras</a>
                                </li>
                                <li>
                                    <a href='' title='Solution 3'>Accesorios</a>
                                </li>
                                <li>
                                    <a href='' title='Solution 4'>Audio</a>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <ul>
                                <h3>Product</h3>
                                <li>
                                    <a href="" title='API'>Laptops</a>
                                </li>
                                <li>
                                    <a href="" title='API'>Audifonos</a>
                                </li>
                                <li>
                                    <a href="" title='API'>Monitores</a>
                                </li>
                                <li>
                                    <a href="" title='API'>Teclados</a>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <ul>
                                <h3>Resource</h3>
                                <li>
                                    <a href="" title='Support'>Support</a>
                                </li>
                                <li>
                                    <a href="" title='Sitemap'>Sitemap</a>
                                </li>
                                <li>
                                    <a href="" title='Status'>Status</a>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <ul>
                                <h3>Company</h3>
                                <li>
                                    <a href="" title='About Us'>About Us</a>
                                </li>
                            </ul>
                        </section>
                    </section>
                    <section className='footer-bottom'>
                        <small>Tech ECommerce <span id='year'></span>, All rights reserverd</small>
                        <span className='footer-bottom-links'>
                            <a href="" title='Terms and services'>Terms and Services</a>
                            <a href="" title='Privacy Policy'>Privacy policy</a>
                        </span>
                    </section>
                </div>
            </footer>

        </div>
    )
}

export default Footer;