import React from 'react'

const RoundCard=(props)=> {
    return (
        <div>
            <div className="contents">
                <h1 className = "title">回合設定</h1>
                <Input
                    className="input"
                    key={`${props.id}_round`}
                    id={`${props.id}_round`}
                    elementType="input"
                    onChange={evt => props.roundOnChange(`${props.id}_round`, evt.target.value)} 
                    elementConfig={{type: "text",placeholder: "填入回合數"}}
                    value={props.roundValue} 
                    label="回合數"                   
                />
                <Typography id="continuous-slider" gutterBottom>買賣家比例</Typography>
                <Slider
                    key={`${props.id}_percent`}
                    id={`${props.id}_percent`}
                    defaultValue={30}
                    getAriaValueText={valuetext}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    onChange={evt => props.percentOnChange(`${props.id}_percent`, evt.target.value)}
                    marks
                    min={30}
                    max={70}
                />
                <span style={{margin:"80px 10px 0px 0px"}}>是否新增物件?</span>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                            color="primary"
                            />
                        }
                    label=""
                />
                <Input
                    className={`${state.checkedB ? "" : "hide"}`}
                    key="item"
                    id="item"
                    elementType={form.round.elementType}
                    onChange={handleItemChanged} 
                    elementConfig={form.items.elementConfig}
                    value={item} 
                    label={"新增物件"}                    
                />
                <div className="timer">
                    <span style={{margin:"0px 10px 0px 0px"}}>回合時間</span>
                    <Input
                    className="time"
                    key="minute"
                    id="minute"
                    elementType={form.minute.elementType}
                    onChange={handleMinuteChanged} 
                    elementConfig={form.minute.elementConfig}
                    value={minute}                    
                />
                <span style={{margin:"0px 10px 0px 10px"}}>分</span>
                <Input
                    className="time"
                    key="minute"
                    id="minute"
                    elementType={form.minute.elementType}
                    onChange={handleMinuteChanged} 
                    elementConfig={form.minute.elementConfig}
                    value={minute}               
                />
                <span style={{margin:"0px 10px 0px 10px"}}>秒</span>
                </div>     
            </div>
        </div>
    )
}

export default RoundCard
