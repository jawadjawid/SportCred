import React from "react";
import Button from "@material-ui/core/Button";

export default class EditableText extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: props.value||'',
            edit: false,
            setAnswer:props.setValue,
            error:false,
            errorMsg:''
        }
    }

    validate(e){
        const value = e.target.value;
        const currErrorValue = this.state.error;

        if(value.localeCompare('')===0){
            this.setState({error:true, errorMsg:'Do not leave fields empty'},() => {
                if(currErrorValue !== this.state.error)
                    this.props.validationForSave(this.props.prompt,this.state.error);
            });
            return false;
        }
        return true;
    }

    render() {
        return (
            (this.state.edit===true) &&
            <React.Fragment>
            <input
                style={{"border": "0",
                    "outline": "0",
                    background: "transparent",
                    color:"white", width:"100%"}}
                type="text"
                value={this.state.value}
                autoFocus
                onFocus={event=>{
                    const value = event.target.value
                    event.target.value = ''
                    event.target.value = value
                    this.setState({backup:this.state.value})
                }}
                onChange={event=>{
                    this.setState({value:event.target.value})
                }}
                onKeyUp={event=>{
                    if(event.key==='Escape') {
                        this.setState({edit:false, value:this.state.backup})
                    }
                }}
                onBlur={event=>{
                    if(this.validate(event)){
                        const currErrorValue = this.state.error;
                        this.setState({edit:false,error:false,errorMsg:''},()=>{
                            if(currErrorValue !== this.state.error)
                                this.props.validationForSave(this.props.prompt,this.state.error);
                        })
                        this.state.setAnswer(this.state.value);
                    }
                }}

            />
        <span style={{color: "red"}}>{this.state.errorMsg}</span></React.Fragment>
        ||
            <span style={{display:'block','width':'100%'}} onClick={event=>{
                this.setState({edit:this.state.edit!==true})
            }}>
                {this.state.value}
                <Button style={{float:'right',outline:'none'}}>Edit</Button>
            </span>
        )
    }
}