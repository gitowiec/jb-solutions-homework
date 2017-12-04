import * as React from "react";
import {ISearchHistoryElement} from "./App";

interface ISearchHistoryProps {
    list: ISearchHistoryElement[]
}


export default class SearchHistory extends React.Component<ISearchHistoryProps> {
    render() {
        const list = this.props.list;
        return (
            <div>
                <h3>Search History</h3>
                <ul>
                    {list.map(value => <li key={value.timestamp}>{value.vatNumber}</li>)}
                </ul>
            </div>
        );

    }

}
