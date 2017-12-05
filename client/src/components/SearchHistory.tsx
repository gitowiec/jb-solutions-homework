import * as React from "react";
import {ISearchHistoryElement} from "./App";

interface ISearchHistoryProps {
    list: ISearchHistoryElement[],
    retrieveValue: Function
}


export default class SearchHistory extends React.Component<ISearchHistoryProps> {

    constructor(props: ISearchHistoryProps, context: any) {
        super(props, context);
        this.selectFromHistory = this.selectFromHistory.bind(this);
    }

    protected selectFromHistory(e: any) {
        e.preventDefault();
        this.props.retrieveValue(e.target.dataset.vatNumber);
    }

    render() {
        const list = this.props.list;
        return (
            <div className="col-sm">
                <h5 className="alert alert-secondary" role="alert">Search History</h5>
                <div className="list-group">
                    {list.length ? list.map(value =>
                        <a href="#" onClick={e => this.selectFromHistory(e)}
                           className="list-group-item list-group-item-action"
                           key={value.timestamp} data-vat-number={value.vatNumber}>{value.vatNumber}</a>
                    ) : <div className="list-group-item">Nothing was searched</div>}
                </div>
            </div>
        );

    }

}
