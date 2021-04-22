import './index.scss';
import React from 'react';
import SearchAppBar from "../../components/appBar";
import ToolbarActions from "../../components/toolbar";


const Screen = props => {
    const { search } = props;
    return (
        <>
            <SearchAppBar search={search}/>
            <div className={'vertical-center'}><ToolbarActions /></div>
            { props.children }
        </>
    )
}

export default Screen
