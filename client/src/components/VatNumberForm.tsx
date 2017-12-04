import * as React from "react";

interface INipFormProps {
    search: Function
}


export class VatNumberForm extends React.Component<INipFormProps> {

    protected vatNumberElement: HTMLInputElement;
    protected vatNumberForm: HTMLFormElement;

    constructor(props: INipFormProps) {
        super(props);
        this.createPacket = this.createPacket.bind(this);
    }

    createPacket(event: any) {
        event.preventDefault();
        this.props.search(this.vatNumberElement.value);
        // this.vatNumberForm.reset();
    }

    render() {
        return (
            <form ref={(form: HTMLFormElement) => this.vatNumberForm = form} className="vat-number-form"
                  onSubmit={(e) => this.createPacket(e)}>
                <input defaultValue="9570745262" ref={(input: HTMLInputElement) => this.vatNumberElement = input}
                type="text" placeholder="Vat Number"/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

