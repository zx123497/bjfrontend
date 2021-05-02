import React from 'react'
import Input from '../../../components/Input/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
const RoundCard=(props)=> {
    return (
        <div>
            <div className="contents">
                <h1 className = "title">第{props.id}回合設定</h1>
                <Input
                    className="input"
                    key={`${props.id}_round`}
                    id={`${props.id}_round`}
                    elementType="input"
                    onChange={evt => props.handleRoundChanged(`${props.id}_round`, evt.target.value)} 
                    elementConfig={{type: "text",placeholder: "填入回合數"}}
                    value={props.round} 
                    label="回合數"                   
                />
                <Typography id="continuous-slider" gutterBottom>買賣家比例</Typography>
                <Slider
                    key={`${props.id}_percent`}
                    id={`${props.id}_percent`}
                    defaultValue={30}
                    getAriaValueText={val=>props.valuetext(val)}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    // onChange={evt => props.percentOnChange(`${props.id}_percent`, evt.target.value)}
                    marks
                    min={30}
                    max={70}
                />
                <span style={{margin:"80px 10px 0px 0px"}}>是否新增物件?</span>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.state.checkedB}
                            onChange={props.handleChange}
                            name="checkedB"
                            color="primary"
                            />
                        }
                    label=""
                />
                <Input
                    className={`${props.state.checkedB ? "" : "hide"}`}
                    key="item"
                    id="item"
                    elementType={props.form.round.elementType}
                    onChange={props.handleItemChanged} 
                    elementConfig={props.form.items.elementConfig}
                    value={props.form.items.value} 
                    label={"新增物件"}                    
                />
                <div className="timer">
                    <span style={{margin:"0px 10px 0px 0px"}}>回合時間</span>
                    <Input
                    className="time"
                    key="minute"
                    id="minute"
                    elementType={props.form.minute.elementType}
                    onChange={props.handleMinuteChanged} 
                    elementConfig={props.form.minute.elementConfig}
                    value={props.form.minute.value}                    
                />
                <span style={{margin:"0px 10px 0px 10px"}}>分</span>
                <Input
                    className="time"
                    key="minute"
                    id="minute"
                    elementType={props.form.minute.elementType}
                    onChange={props.handleMinuteChanged} 
                    elementConfig={props.form.minute.elementConfig}
                    value={props.form.minute.value}               
                />
                <span style={{margin:"0px 10px 0px 10px"}}>秒</span>
                </div>     
            </div>
        </div>
    )
}

export default RoundCard
