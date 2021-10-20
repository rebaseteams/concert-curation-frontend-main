import { Layout, Row, Col } from 'antd';
import './layout.scss';
import HeaderComponet from './header';
import PieChart from '../components/charts/pieChart';
import { useEffect, useState } from 'react';
import { getRecomendedArtists } from '../services/getRecomandedArtists';

const { Content } = Layout;

const LayoutComponent = () => {

    const [artists, setArtists] = useState()

    useEffect( () => {
        getData();
        
    }, [] )

    const getData = async ( ) => {
        const data: any = await getRecomendedArtists({age: "10-29"});
        console.log(data);
        setArtists(data);
    }

    return (
    <Layout>  
        <HeaderComponet/>
        <Content>
            <div className="layout-workspace">
            {/* <Row>
               <Col className="content-box graph-box" span={24}>
                   <PieChart/>
               </Col> 
            </Row> */}

            <Row className="card-container" gutter={10} align={"bottom"}>
                <Col span={2}/>
                {artists && renderCards(artists)}
                <Col span={2}/>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="summary-container">
                        <h3>Summary</h3>
                        <p>
                            Artist 1 is the best sutable option according to your search beacuse he has good popularity at the location Surat and also the Milk products are very related to the artist as he is a Fittest among all other.
                        </p>
                    </div>
                </Col>
            </Row>
            </div>
        </Content>
    </Layout>
    );
}

function renderCards(data: any) {
    const span = 20/ data.artists_data.length;
    return data.artists_data.map( (artist: any, artistIndex: any) => <Col className="card" style={{height: (artistIndex*10+450)}} span={span}>
        <div className="inner-card" style={{ height: (artistIndex*-30+450)}}>
            <div className="card-heading">
            <h3 style={{color: "#fff"}}>{artist.artist_name}</h3>
            <p>{String(artist.match_percentage)}%</p>
            </div>
            <div className="vanue">
                <h6>Vanue</h6>
                <ul>
                {artist.match_attributes.venues.map( (vanue: any, index:any) => <li key={index}>{vanue.name}</li> )}
                </ul>
            </div>

            <div className="vanue">
                <h6>Affinities</h6>
                <div>
                    <h5>Age </h5>
                </div>
                <div>
                    <h5>Gender {artist.match_attributes.gender}</h5>
                </div>
                <div>
                    <h5>Genre {artist.match_attributes.genre}</h5>
                </div>
            </div>

            <div className="vanue">
                <h6>Associated Brands</h6>
                <ul>
                </ul>
            </div>
        </div>
        </Col>
    );
}

export default LayoutComponent;