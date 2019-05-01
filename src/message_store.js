let messages = {
    sent: [
        {to: 'friend@mail.com', subject: 'howdy', body: 'how is it going friend'},
        {to: 'bob@mail.com', subject: 'whats up', body: 'how is it going man'}
    ],
    inbox: [
        {from: 'a@mail.com', subject: 'what', body: 'how is it'},
        {from: 'b@mail.com', subject: 'hello', body: 'hi'}
    ]
}

class Message{
    constructor(from, to, subject, body){
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.body = body;
    }
}

let messageDraft = new Message;

const MessageStore = {
    getInboxMessages(){
        return messages['inbox'];
    },
    getSentMessages: () => (
        messages['sent']
    ),
    getMessageDraft: () => (
        messageDraft
    ),
    updateDraftField: (field, value) => {
        messageDraft[field] = value;
    },
    sendDraft: () =>{
        messages['sent'].push(messageDraft);
        messageDraft = new Message;
    }

}

module.exports = MessageStore;