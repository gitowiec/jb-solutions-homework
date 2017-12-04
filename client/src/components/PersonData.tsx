import * as React from "react";
import {IVatNumberState} from "./App";

export interface IPersonData extends IVatNumberState {
    address: string,
    name: string,
    requestDate: string,
    valid: boolean,
}

interface IPersonDataProps {
    data: IPersonData | {}
}

export default class PersonData extends React.Component<IPersonDataProps> {
    render() {
        const data = this.props.data;
        return (
            <dl className="person-data">
                {Object.keys(data).map(key => {
                    return [
                        <dt key={"k_" + key}>{key}</dt>,
                        <dd key={"v_" + key}>{data[key]}</dd>
                    ];
                })}
            </dl>
        );
    }
}

