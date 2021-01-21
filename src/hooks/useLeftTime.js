import {useEffect, useState} from "react";

export const useLeftTime = () => {
    const initRenderTime = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }

    const [time, setTime] = useState();
    const [leftTime, setLeftTime] = useState(initRenderTime);

    const calcuTime = ()=>{
        if (time) {
            let leftd = Math.floor(time / (1000 * 60 * 60 * 24));
            let lefth = Math.floor(time / (1000 * 60 * 60) % 24);
            let leftm = Math.floor(time / (1000 * 60) % 60);
            let lefts = Math.floor(time / 1000 % 60);
            const left = {
                days: leftd < 0 ? 0 : leftd,
                hours: lefth < 0 ? 0 : lefth,
                minutes: leftm < 0 ? 0 : leftm,
                seconds: lefts < 0 ? 0 : lefts,
            };
            setLeftTime(left);
            if (left < 0) {
                setLeftTime(initRenderTime);
            }
        } else {
            setLeftTime(initRenderTime);
        }
    }


    useEffect(()=>{
        calcuTime()
    }, [time])

    return {setTime, leftTime}
}