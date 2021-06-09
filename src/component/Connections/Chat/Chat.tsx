import React from 'react'

export const ChatPage: React.FC = () => {
    return (
        <Chat/>
    )
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

export const Messages: React.FC = () => {
    let messages = [{"author": "1", message: "Hello"}, {"author": "1", message: "Hello"}, {
        "author": "2",
        message: "Hello"
    }, {"author": "1", message: "Wat's up"}, {"author": "2", message: "Hello"},]
    return (
        <div style={{position: "fixed", overflowY: 'auto'}}>{messages.map((e, index) => <Message message={e.message}/>)}</div>
    )
}

const Message = (message: any) => {
    debugger
    return (
        <div>
            <img/> <b>Name</b>
            <p>{message.message}</p>
            <hr/>
        </div>
    )
}

export const AddMessageForm: React.FC = () => {
    return (
        <div>
            <div><textarea/></div>
            <div>
                <button>Send</button>
            </div>
        </div>
    )
}