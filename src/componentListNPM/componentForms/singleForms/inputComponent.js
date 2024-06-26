import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';
class InputFormComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max
        };
    }
    handleChange(e) {

        if(this.props.type==="checkbox"){
            this.check();
            return
        }
        
        let { name, value } = e.target;
        
        this.setState({ value: value });
       
        if(!this.props.updateOnClickOutside){
            this.props.handleChange(e);

        }
    }
    async check(){
        
        await this.setState({value:!this.state.value})
        this.props.objDispatch(this.state.value);
    }
    componentDidUpdate(props, state){
        if(this.props.value!==props.value){
            this.setState({value:this.props.value})
        }

    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined)
            {
                this.props.emitClickedOutside(this.state);
            }
            if(this.props.updateOnClickOutside){
                debugger
                this.props.objDispatch(this.state.value);

            }
        }
    }
    render() {
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        let inputType = {
            required: <input 
            type={this.props.type}
            className={this.props.class ? this.props.class : "form-control"}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            name={this.props.name}
            value={this.state.value}
            min={this.state.min}
            max={this.state.max}
            autoComplete={this.props.autoComplete ? this.props.autoComplete : "off"}
            style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.inputStyle:undefined}
            id={this.props.id}
            checked={this.props.checked}
            spellCheck={(this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            onClick={this.props.onClick}
                required
               
            />,
            normal: <input
                type={this.props.type}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                name={this.props.name}
                value={this.state.value}
                min={this.state.min}
                max={this.state.max}
                onClick={this.props.onClick}
                autoComplete={this.props.autoComplete ? this.props.autoComplete : "off"}
                style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.inputStyle:undefined}
                id={this.props.id}
                checked={this.props.checked}
                spellCheck={(this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck}
                minLength={this.props.minLength}
                maxLength={this.props.maxLength}
            />,
            disabled: <input
            id={this.props.id}
                type={this.props.type}
                style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.inputStyle:undefined}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onClick={this.props.onClick}
                disabled


            />
        }
        



        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle?this.props.wrapperStyle:theme!==undefined? theme.wrapperStyle:undefined} 
            className={this.props.wrapperClass}>
                {this.props.label && (<label style={this.props.labelStyle?this.props.labelStyle:theme!==undefined? theme.labelStyle:undefined} 
                className={this.props.labelClass}>{this.props.label}</label>)}
                {inputType[this.props.input]}
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default InputFormComponent;