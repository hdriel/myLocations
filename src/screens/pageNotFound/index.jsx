import React from 'react';
import './index.scss';
import { DEFAULT_PAGE } from '../index';
import { useHistory } from 'react-router-dom';

const PageNotFound = props => {
    const history = useHistory();

    const BackToHomepageBtnHandler = () => {
      history.push(DEFAULT_PAGE);
      window.location.reload(false);
    }

    return (
        <div>
            <button
                className='back-to-homepage-btn'
                onClick={BackToHomepageBtnHandler}
            >Back to Homepage</button>
        </div>
    );
};

export default PageNotFound;
