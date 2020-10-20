export const validate = (value,editText)=>{
    const currErrorValue = editText.state.error;
    const prompt = editText.props.prompt;

    if(value.localeCompare('')===0){
        return invalid(editText,currErrorValue, 'Do not leave field empty',editText.props.validationForSave);
    }

    if("Email".localeCompare(prompt) === 0 && !value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
        return invalid(editText,currErrorValue, 'Please enter valid email',editText.props.validationForSave);
    }

    if("Date of Birth".localeCompare(prompt) === 0 && !value.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)){
        return invalid(editText,currErrorValue, 'Please enter valid date of birth',editText.props.validationForSave);
    }

    editText.setState({edit:false,error:false,errorMsg:''},()=>{
        if(currErrorValue !== editText.state.error)
            editText.props.validationForSave(editText.props.prompt,editText.state.error);
    })
    editText.state.setAnswer(editText.state.value);
    return true;
}

const invalid = (editText,currErrorValue, errorMsg,validationForSave) => {
    editText.setState({error:true, errorMsg:errorMsg},() => {
        if(currErrorValue !== editText.state.error)
            validationForSave(editText.props.prompt,editText.state.error);
    });
    return false
}
