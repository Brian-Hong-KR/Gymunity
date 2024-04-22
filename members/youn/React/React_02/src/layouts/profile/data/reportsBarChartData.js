import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingDownIcon from 'mdi-react/TrendingDownIcon';
import axios from 'axios';

const reportsBarChartData = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const fetchDatas = async () => {
    const response = await axios.get(
      `api/${localStorage.getItem('userId')}/weekpoints`
    );
    setData(response.data);
    setActiveItem(response.data[0]);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleClick = (item) => {
    const index = data.indexOf(item.payload);
    setActiveIndex(index);
    setActiveItem(data[index]);
  };

  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <CardBody className='dashboard__card-widget'>
          <div className='card__title'>
            <h5 className='bold-text'>Price</h5>
          </div>
          <div className='dashboard__total'>
            <TrendingDownIcon className='dashboard__trend-icon' />
            <p className='dashboard__total-stat'>{activeItem.price}</p>
            <div className='dashboard__chart-container'>
              <ResponsiveContainer height={50}>
                <BarChart data={data}>
                  <Bar dataKey='price' onClick={handleClick}>
                    {data.map((entry, index) => (
                      <Cell
                        key={entry.id}
                        cursor='pointer'
                        fill={index === activeIndex ? '#4ce1b6' : '#c88ffa'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};
export default reportsBarChartData;
