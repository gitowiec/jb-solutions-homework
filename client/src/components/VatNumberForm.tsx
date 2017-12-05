import * as React from "react";

interface INipFormProps {
    search: Function,
    updateState: Function,
    vatNumber: string
}


export class VatNumberForm extends React.Component<INipFormProps> {

    protected vatNumberElement: HTMLInputElement;
    protected vatNumberForm: HTMLFormElement;

    constructor(props: INipFormProps, context: any) {
        super(props, context);
        this.sendSearch = this.sendSearch.bind(this);
    }

    protected sendSearch(event: any) {
        event.preventDefault();
        this.props.search(this.vatNumberElement.value.trim().replace(/-/g,''));
        // console.log(this.vatNumberForm);
        this.vatNumberForm.reset();
    }

    protected vatNumberChange(event: any) {
        this.props.updateState(this.vatNumberElement.value)
    }

    componentDidMount() {
        this.props.updateState('9570745262');
    }

    render() {
        return (
            <form ref={(form: HTMLFormElement) => this.vatNumberForm = form} className="col-sm vat-number-form"
                  onSubmit={(e) => this.sendSearch(e)}>
                <p className="alert alert-primary" role="alert">Please enter valid VAT number and press Submit</p>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">#</span>
                        <input value={this.props.vatNumber} required
                               onChange={e => this.vatNumberChange(e.target.value)}
                               ref={(input: HTMLInputElement) => this.vatNumberElement = input}
                               className="vat-number-input" type="text" placeholder="Vat Number"/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </span>
                    </div>
                </div>
            </form>
        );
    }
}

