import './index.scss';
import React from 'react';
import SearchAppBar from "../../components/appBar";
import ToolbarActions from "../../components/toolbar";


const Screen = props => {
    const { search, section, title, allowedActions } = props;
    return (
        <>
            <SearchAppBar search={search} title={title}/>
            <div className={'vertical-center'}>
                <ToolbarActions section={section} allowedActions={allowedActions}/>
            </div>
            { props.children }
        </>
    )
}

export default Screen
