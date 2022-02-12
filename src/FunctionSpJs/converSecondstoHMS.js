

function converSecondstoHMS(s)
{
    s=Math.round(s)
    let h,m
    let result = ''
    h=s/3600
    h=Math.round(h)
    s%=3600
    m=s/60
    m=Math.round(m)
    s%=60
    if(h)
    {
        result = `${h>9?h:'0'+h}:`
    }
    result+=`${m>9?m:'0'+m}:${s>9?s:'0'+s}`
    return result
}

export default converSecondstoHMS
