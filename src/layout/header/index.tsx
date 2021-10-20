import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponet = () => {
    return (
        <Header>
        <nav>
          <h3 className="app-logo">Concert Recomandator</h3>
        </nav>
      </Header>
    )
}

export default HeaderComponet;