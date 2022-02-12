

function twoNumber(a)
{
    if(a===0)
        return '??'
    else if(a>9)
        return a
    else if(a<10 && a>0)
        return `0${a}`
}
export default twoNumber
