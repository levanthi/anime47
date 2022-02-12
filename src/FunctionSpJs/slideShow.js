

function slideShow({SLIDEWIDTH,slidesSelector,slideShowSelector,plus})
{
    let slidesElement = document.querySelector(slidesSelector)
    let slideShowElement = document.querySelector(slideShowSelector)
    let marginLeft = slidesElement.style.marginLeft
    let slideShowWidth = slideShowElement.offsetWidth
    let marginWidth = 0
    slidesElement.classList.remove('notransition')
    if(!marginLeft)
    {
        marginLeft='0px'
    }
    marginLeft = parseInt(marginLeft.slice(0,marginLeft.length-2))
    if(slideShowWidth>=980)
    {
        marginWidth = 4*SLIDEWIDTH
    }else
    if(slideShowWidth>=710){
        marginWidth = 3*SLIDEWIDTH
    }
    else{
        marginWidth = 2*SLIDEWIDTH
    }
    if(plus)
    {
        marginLeft-=marginWidth
    }
    else{
        marginLeft+=marginWidth
    }
    slidesElement.style.marginLeft = marginLeft +'px'
    if(marginLeft>=((9-4)*SLIDEWIDTH)){
        setTimeout(() => {
            slidesElement.classList.add('notransition')
            marginLeft-=(15 * SLIDEWIDTH)
            slidesElement.style.marginLeft = marginLeft +'px'
        }, 600);
    }
    else if(marginLeft<=(-14*SLIDEWIDTH)){
        setTimeout(() => {
            slidesElement.classList.add('notransition')
            marginLeft+=(15*SLIDEWIDTH)
            slidesElement.style.marginLeft = marginLeft +'px'
        }, 600);
    }
}

export default slideShow