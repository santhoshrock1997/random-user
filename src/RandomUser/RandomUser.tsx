import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './RandomUser.scss';
import GoogleMap from './GoogleMap';

type Data = {
  name: Name;
  email: string;
  dob: { age: number; date: string };
  gender: string;
  phone: string;
  picture: { large: string };
  location: Coordinates;
};

type Name = {
  first: string;
  last: string;
};

type Coordinates = {
  coordinates: {
    latitue: string;
    longitude: string;
  };
};

export default () => {
  const [data, setData] = useState<Data>();
  const [handleRefresh, setHandleRefresh] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await axios.get('https://randomuser.me/api');
      const data = response?.data?.results?.[0];
      localStorage.setItem('data', JSON.stringify(data));
      setData(data);
    })();
  }, [handleRefresh]);

  return (
    <div className="random-user-wrapper">
      <h2>Random User</h2>
      <img src={data?.picture?.large} alt={data?.gender} />
      <div className="first-section">
        <div>
          <strong>Name:</strong> {`${data?.name?.first} ${data?.name?.last}`}
        </div>
        <div>
          <strong>Email:</strong> {data?.email}
        </div>
        <div>
          {' '}
          <strong>DOB:</strong> {moment(data?.dob?.date).format('LL')}
        </div>
      </div>
      <div className="second-section">
        <div>
          {' '}
          <strong>Age:</strong> {data?.dob?.age}
        </div>
        <div>
          {' '}
          <strong>Gender:</strong> {data?.gender}
        </div>
        <div>
          {' '}
          <strong>Phone:</strong> {data?.phone}
        </div>
      </div>

      <GoogleMap coordinates={data?.location?.coordinates} />
      <button
        className="glow-on-hover"
        onClick={() => {
          setHandleRefresh(!handleRefresh);
        }}
      >
        Load User
      </button>
    </div>
  );
};
