const Router = require('./router.js');
const Inbox = require('./inbox.js');
const Sent = require('./sent.js');
const Compose = require('./compose.js');

const routes = {
    inbox: Inbox,
    sent: Sent,
    compose: Compose
}

window.addEventListener('DOMContentLoaded', (e) => {
    const content = document.querySelector('.content');
    router = new Router(content, routes);
    router.start();
    window.location.hash = "#inbox";

    document.querySelectorAll('.sidebar-nav li').forEach(btn => {
        btn.addEventListener('click', ()=>{
            const name = btn.innerText.toLowerCase();
            location.hash = name;
        })
    });
})

