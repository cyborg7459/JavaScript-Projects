const date = new Date(2020, 8, 7, 22, 0, 0);
let dhours = parseInt(date.getHours());
let dmins = parseInt(date.getMinutes());
let dsecs = parseInt(date.getSeconds());

document.getElementById('target').innerHTML = date;

const getDifference = () => {
    const curDate = new Date();
    const hours =  parseInt(curDate.getHours());
    const minutes = parseInt(curDate.getMinutes());
    const seconds = parseInt(curDate.getSeconds());
    let sdiff, mdiff, hdiff;
    if(seconds > dsecs) {
        dsecs+=60;
        dmins--; 
    }
    sdiff =   dsecs - seconds;
    if(minutes > dmins) {
        dmins+=60;
        dhours--;
    }
    mdiff = dmins - minutes;
    hdiff = dhours - hours;

    mdiff = mdiff.toString();
    hdiff = hdiff.toString();
    sdiff = sdiff.toString();

    if(mdiff.length===1)
        mdiff='0'+mdiff;
    if(sdiff.length===1)
        sdiff='0'+sdiff;
    if(hdiff.length===1)
        hdiff='0'+hdiff;


    document.getElementById('hours').innerHTML = hdiff;
    document.getElementById('minutes').innerHTML = mdiff;
    document.getElementById('seconds').innerHTML = sdiff;
}

setInterval(getDifference, 1000);