const txtarea = document.getElementById('names');
let names = [];
let i=0;
let txt = '';
let fulltxt = '';
let isdeleting = false;
names = JSON.parse(txtarea.getAttribute('names'));
console.log(names);

execute();

function execute()
{
    fulltxt = names[i%(names.length)];
    if(isdeleting) 
    {
        txt = fulltxt.substring(0,txt.length-1);
    }
    else
    {
        txt = fulltxt.substring(0,txt.length+1);
    }
    txtarea.innerHTML = txt;
    if(txt.length == fulltxt.length)
    {
        isdeleting = true;
    }
    if(txt.length == 0)
    {
        i++;
        isdeleting = false;
    }
    if(isdeleting)
        setTimeout(execute,200);
    else
        setTimeout(execute,400);
}
