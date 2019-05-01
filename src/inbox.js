const MessageStore = require('./message_store.js')

const Inbox = {
    render(){
        const messages = MessageStore.getInboxMessages();

        const ul = document.createElement('ul');
        ul.className = 'messages';

        messages.forEach((message) => {
            const node = this.renderMessage(message);
            ul.prepend(node);
        });
        return ul;
    },
    renderMessage(message){
        const li = document.createElement('li');
        li.className = 'message';
        li.innerHTML = `<span class='from'>${message.from}</span>
                        <span class='subject'>${message.subject}</span>
                        <span class='body'>${message.body}</span>`;
        return li;
    }
}
module.exports = Inbox;