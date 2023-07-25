import '../assets/css/Home.css';
import Footer from '../components/Footer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const Home = () => {

  return (
    <div className='col-lg-12'>
      <header>
        <div className="banner">
          <img src="\img\Banner.png" alt="" />
          <div className="banner-text">
            <h1>Tech eCommerce</h1>
            <p>Tecnologia de alto rendimiento</p>
          </div>
        </div>
      </header>
      <main>
        <section className='section_categorias'>
          <div className='categoria'>
            <h2>Categorias</h2>
            <h3>Conoce nuestros productos</h3>
          </div>
          <div className='bloques_categorias'>
            <a href=""><img src='/img/Bloque_computo.png' alt='computo' /></a>
            <a href=""><img src='/img/Pantalla.png' alt='computo' /></a>
            <a href=""><img src='/img/Gaiming.png' alt='computo' /></a>
            <a href=""><img src='/img/Telefonia.png' alt='computo' /></a>
            <a href=""><img src='/img/software.png' alt='computo' /></a>
            <a href=""><img src='\img\Audio.png' alt='computo' /></a>
          </div>
        </section>
        <section className='section_productos'>
          <div className='productos-titulo'>
            <h2>Nuevo productos</h2>
            <h3>Lo mas nuevo</h3>
          </div>
          <div className="d-flex gap-5 align-items-center justify-content-center flex-wrap mt-5">
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="https://m.media-amazon.com/images/I/81if4I5R1yL._AC_SX522_.jpg"

              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Laptop
                </Typography>
                <Typography variant="body2" color="text.secondary">
                HP EliteBook 840 G5 14 FHD Core i5-8350U 1.7GHz, 16GB RAM, 512GB M.2-NVMe, Windows 10 Pro 64Bit, CAM 
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="https://cdn.gameplanet.com/wp-content/uploads/2023/01/05133916/6950376772251-redragon-teclado-k630-dragonborn-negro-1.jpg"

              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Teclado
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Logitech K360 - Teclado (Estándar, Inalámbrico, RF inalámbrico, QWERTY, Negro)
                </Typography>
              </CardContent>

            </Card>
            <Card sx={{ maxWidth: 400}}>
              <CardMedia
                sx={{ height: 235 }}
                image="https://m.media-amazon.com/images/I/71A-tk9Bh-L._AC_SX522_.jpg"

              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Audifonos Gamer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ocelot tipo diadema iluminacion rgb
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400}}>
              <CardMedia
                sx={{ height: 235 }}
                image="https://m.media-amazon.com/images/I/71A-tk9Bh-L._AC_SX522_.jpg"

              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Audifonos Gamer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ocelot tipo diadema iluminacion rgb
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400}}>
              <CardMedia
                sx={{ height: 235 }}
                image="https://m.media-amazon.com/images/I/71A-tk9Bh-L._AC_SX522_.jpg"

              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Audifonos Gamer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ocelot tipo diadema iluminacion rgb
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 400}}>
              <CardMedia
                sx={{ height: 235 }}
                image="https://m.media-amazon.com/images/I/71A-tk9Bh-L._AC_SX522_.jpg"

              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Audifonos Gamer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ocelot tipo diadema iluminacion rgb
                </Typography>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  )
}

export default Home

