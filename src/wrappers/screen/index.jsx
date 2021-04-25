import './index.scss';
import React from 'react';
import SearchAppBar from "../../components/appBar";
import ToolbarActions from "../../components/toolbar";


const Screen = props => {
    const {
        search,
        section,
        title,
        allowedActions,
        barColor,
        searchPlaceholder,
    } = props;

    const searchAppBarProps = { search, title, barColor, searchPlaceholder };
    const toolbarActionsProps = { section, allowedActions };

    return (
        <>
            <SearchAppBar {...searchAppBarProps}/>
            <div className={'vertical-center'}>
                <ToolbarActions {...toolbarActionsProps}/>
            </div>
            { props.children }
        </>
    )
}

export default Screen
