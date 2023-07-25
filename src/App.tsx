import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PubllicRoutes';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'


function App() {

    return (
        <>
                <PayPalScriptProvider
                    options={{
                        "clientId": "AZlRFeSXl3mfYytrVLkzXK0FgTBW7s_Ok21atTAEjJe5uM-0pRKe729Zb_K7kQkhHqJv2z041UrWK9wl"
                    }}
                >
                    <Routes>
                        <Route path='/admin/*' element={<AdminRoutes />} />
                        <Route path='/*' element={<PublicRoutes />} />
                    </Routes>
                </PayPalScriptProvider>
        </>
    );
}

export default App;
