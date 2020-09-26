document.getElementById('menu-toggle').addEventListener('click', (e)=> {
    e.stopPropagation();
    document.getElementById('sidebar').classList.toggle('visible');
    document.getElementById('sidebar-content').classList.toggle('d-none');
    document.getElementById('content').classList.toggle('shift');
    document.getElementById('overlay').classList.toggle('overlay');
})

document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('visible');
    setTimeout(()=>{
        document.getElementById('sidebar-content').classList.add('d-none');
    },400);
    document.getElementById('content').classList.remove('shift');
    document.getElementById('overlay').classList.remove('overlay');
    closeModal();
})

document.getElementById('get-started').addEventListener('click', () => {
    document.getElementById('sign-up-modal').classList.add('modal-visible');
    setTimeout(()=>{
        document.getElementById('modal-content').classList.remove('d-none');
    },300);
    document.getElementById('overlay').classList.add('overlay');

})

document.getElementById('close-modal').addEventListener('click', closeModal);

function closeModal() 
{
    document.getElementById('overlay').classList.remove('overlay');
    document.getElementById('sign-up-modal').classList.remove('modal-visible');
    document.getElementById('modal-content').classList.add('d-none');
}