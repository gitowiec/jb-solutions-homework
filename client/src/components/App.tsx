import * as React from "react";
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

const initialState: IVatNumberState = {
    countryCode: "PL",
    vatNumber: "",
    personData: {},
    searchHistory: []
};

export default class App extends React.Component<any, IVatNumberState> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
        this.search = this.search.bind(this);
        this.updateState = this.updateState.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    resetState(){
        this.setState(initialState);
    }

    updateState(value: string) {
        console.log("updateState", value);
        this.setState({vatNumber: value});
    }

    search(vatNumber: string) {
        const updatedState = {...this.state, vatNumber};
        updatedState.searchHistory.unshift({vatNumber, timestamp: Date.now()});
        this.setState(updatedState);

        delete updatedState.personData;
        delete updatedState.searchHistory;

        Http.search(updatedState).then((personData) => {
            console.log(personData);
            this.setState({personData})
        });

        // this.resetState();
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
                    <h2>Welcome to the Vat Number Checker</h2>
                    <p>Confirmation of the validity of the VAT identification number</p>
                    <div>Made with <span className="emoji">😀</span> in Gdańsk by Marek Zielonkowski</div>
                </div>
                <div className="row use-margins margins-vertical use-paddings paddings-vertical">
                    <VatNumberForm updateState={this.updateState} search={this.search} vatNumber={this.state.vatNumber}></VatNumberForm>
                    <PersonData data={this.state.personData}></PersonData>
                    <SearchHistory retrieveValue={this.updateState} list={this.state.searchHistory}></SearchHistory>
                </div>
            </div>
        );
    }
}

