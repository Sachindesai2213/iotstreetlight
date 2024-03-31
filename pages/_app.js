import "../styles/globals.css";

// DX Datagrid
import "devextreme/dist/css/dx.light.css";

// Context API import
import { AppWrapper } from "@src/context/state";
import { ConfigProvider } from "antd";

function MyApp({ Component, pageProps }) {
    return (
        <ConfigProvider componentSize={`large`}>
            <AppWrapper>
                <Component {...pageProps} />
            </AppWrapper>
        </ConfigProvider>
    );
}

export default MyApp;
