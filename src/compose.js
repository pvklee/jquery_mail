const MessageStore = require('./message_store.js')

const Compose = {
    render(){
        const messages = MessageStore.getSentMessages();

        const div = document.createElement('div');
        div.className = 'new-message';
        div.innerHTML = this.renderForm();
        div.addEventListener('change', this.changeHandle.bind(this));
        div.addEventListener('submit', this.submitHandle.bind(this));
        return div;
    },
    changeHandle(event){
        field = event.target.name;
        value = event.target.value;
        MessageStore.updateDraftField(field, value);
    },
    submitHandle(event){
        event.preventDefault();
        MessageStore.sendDraft();
        window.location.hash = '#inbox';
    },
    renderForm(){
        let currentDraft = MessageStore.getMessageDraft();
        currentDraft.to = currentDraft.to || '';
        currentDraft.subject = currentDraft.subject || '';
        currentDraft.body = currentDraft.body || '';
        
        const HTMLString = `<p class='new-message-header'>New Message</p>
                            <form class='compose-form'>
                                <input placeholder = 'Recipient'
                                    name = 'to'
                                    type = 'text'
                                    value = '${currentDraft.to}'>
                                </input>
                                <input placeholder = 'Subject'
                                    name = 'subject'
                                    type = 'text'
                                    value = '${currentDraft.subject}'>
                                </input>
                                <textarea name = 'body'
                                    rows = 20>${currentDraft.body}</textarea>
                                <button type='submit'
                                    class='btn btn-primary submit-message'>
                                    Send
                                </button>
                            </form>`
        return HTMLString;
    }
}
module.exports = Compose;