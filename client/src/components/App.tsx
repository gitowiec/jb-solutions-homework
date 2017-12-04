import * as React from "react";
import "./App.css";
import {VatNumberForm} from "./VatNumberForm"
import Http from "./Http";
import PersonData, {IPersonData} from "./PersonData";
import SearchHistory from "./SearchHistory";

const logo = require("./logo.svg");

export interface ISearchHistoryElement {
    vatNumber: string,
    timestamp: number
}

export interface IVatNumberState {
    countryCode: string,
    vatNumber: string,
    personData: IPersonData | {},
    searchHistory: ISearchHistoryElement[]
}

export default class App extends React.Component<any, IVatNumberState> {
    constructor(props: any) {
        super(props);

        this.state = {
            countryCode: "PL",
            vatNumber: "",
            personData: {},
            searchHistory: []
        };

        this.search = this.search.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState() {


    }

    search(vatNumber: string) {
        const updatedState = {...this.state, vatNumber};
        updatedState.searchHistory.push({vatNumber, timestamp: Date.now()});
        this.setState(updatedState);

        delete updatedState.personData;
        delete updatedState.searchHistory;

        Http.search(updatedState).then((personData) => {
            console.log(personData);
            this.setState({personData})
        });
    }

    componentWillUpdate(nextProps: any, nextState: any) {
        localStorage.setItem("search-history", JSON.stringify(nextState.searchHistory))
    }

    componentWillMount() {
        const localStorageRef = localStorage.getItem("search-history");
        if (localStorageRef) {
            this.setState({
                searchHistory: JSON.parse(localStorageRef)
            })

        }
    }


    render() {
        return (
            <div className="App">
                <div className="header">
                    <img src={logo} className="logo" alt="logo"/>
                    <h2>Welcome to the Vat Number checker</h2>
                    <p>Confirmation of the validity of the VAT identification number</p>
                </div>
                <VatNumberForm search={this.search}></VatNumberForm>
                <PersonData data={this.state.personData}></PersonData>
                <SearchHistory list={this.state.searchHistory}></SearchHistory>
            </div>
        );
    }
}

