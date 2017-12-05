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

const splitCamel = (camelString: string): string => {
    return camelString.charAt(0).toUpperCase() +
        camelString.replace(/([a-z])([A-Z])/, "\$1 \$2").slice(1)
};

const checkMark = (valid: boolean): JSX.Element => {
    return valid ? <span className="text-success emoji">😊</span> : <span className="text-danger emoji">😞</span>;
};

export default class PersonData extends React.Component<IPersonDataProps> {
    render() {
        const data = this.props.data;
        return (
            <div className="col-sm personal-data-container">
                <p className="alert alert-info" role="alert">Personal data will appear here</p>
                <dl className="person-data">
                    {Object.keys(data).map(key => {
                        return [
                            <dt key={"k_" + key}>{splitCamel(key)}</dt>,
                            <dd key={"v_" + key}>{typeof data[key] === "boolean" ? checkMark(data[key]) : data[key]}</dd>
                        ];
                    })}
                </dl>
            </div>
        );
    }
}

