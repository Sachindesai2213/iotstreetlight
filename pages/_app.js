import "../styles/globals.css";

// DX Datagrid
import "devextreme/dist/css/dx.light.css";

// Context API import
import { AppWrapper } from "@src/context/state";

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    );
}

export default MyApp;
