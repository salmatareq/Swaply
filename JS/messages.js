let currentConvo = null;

const conversations = [
    {
        id: 1,
        name: "Mohamed Aladdin",
        username: "@mohamed_aladdin",
        location: "Cairo , Egypt",
        avatar: "../public/assets/images/person2.jpg",
        statusLable: "Unread",
        status: "unread", 
        lastMessage: "Hey, I just wanted to check in and see how you're doing. It's been a while since we last spoke, and I hope everything is going well for you.",
        date: "11Sep, 2026",
        skillFrom: "Graphic Design",
        skillTo: "PhotoShop",
        chat: [
        { sender: "them", text: "Hey, how's it going?", time: "10:30 AM" },
    ]
    },
    {
        id: 2,
        name: "Mona Ahmed",
        username: "@mona_ahmend",
        location: "Alexandria , Egypt",
        avatar: "../public/assets/images/person1.jpg",
        status: "unread", 
        statusLable: "Unread",
        lastMessage: "Hey, I just wanted to check in and see how you're doing. It's been a while since we last spoke, and I hope everything is going well for you.",
        date: "11Sep, 2026",
        skillFrom: "Graphic Design",
        skillTo: "PhotoShop",
        chat: [
        { sender: "them", text: "Hey, how's it going?", time: "10:30 AM" },
    ]
    },
    {
        id: 3,
        name: "Ahmed Mostafa",
        username: "@ahmed_mostafa",
        location: "Giza , Egypt",
        avatar: "../public/assets/images/person6.jpg",
        status: "unread", 
        statusLable: "Unread",
        lastMessage: "Hey, I just wanted to check in and see how you're doing. It's been a while since we last spoke, and I hope everything is going well for you.",
        date: "11Sep, 2026",
        skillFrom: "Graphic Design",
        skillTo: "PhotoShop",
        chat: [
        { sender: "them", text: "Hey, how's it going?", time: "10:30 AM" },
    ]
    },
    {
        id: 4,
        name: "Fady ayman",
        username: "@fady_ayman",
        location: "Giza , Egypt",
        avatar: "../public/assets/images/person7.jpg",
        status: "archived", 
        statusLable: "Archived",
        lastMessage: "Hey, I just wanted to check in and see how you're doing. It's been a while since we last spoke, and I hope everything is going well for you.",
        date: "11Sep, 2026",
        skillFrom: "Graphic Design",
        skillTo: "PhotoShop",
        chat: [
        { sender: "them", text: "Hey, how's it going?", time: "10:30 AM" },
        { sender: "me", text: "I'm good! How about you?", time: "10:32 AM" },
        { sender: "them", text: "Doing great, thanks!", time: "10:33 AM" }
    ]
    }
];

const filterButtons = document.querySelectorAll('.Mes-Menu button');

function renderMessageItem(convo){
    return `
    
        <div class="Message-List-item row ${convo.status} " data-id = ${convo.id}>

            <div class="first-part col-sm-12 col-lg-3">

                <div>
                    <img class="pic" src="${convo.avatar}" alt="Profile Picture">
                </div>
                <div class="p-data">
                    <h4>${convo.name}</h4>
                    <p>${convo.username}</p>
                    <p>${convo.location}</p>
                </div>

            </div>
            <div class="second-part col-sm-12 col-lg-5">
                

                <div class="message-content">
                    <p class="message-state">${convo.statusLable}</p>
                    <p>${convo.lastMessage}</p>
                </div>
            </div>
            <div class="third-part col-sm-12 col-lg-4">
                <div class="skills">

                    <div class="skill-container">
                        <div class="skill-icon">
                            <i class="fa-solid fa-bezier-curve fa-sm" ></i>
                        </div>
                        <div class="skill-name">
                            <p>${convo.skillFrom}</p>
                        </div>
                    </div>

                    <p class="arrow">&#8594</p>

                    <div class="skill-container">
                        <div class="section-icon">
                        <i class="fa-solid fa-square-pen fa-sm"></i>
                        </div>
                        <div class="skill-name">
                            <p>${convo.skillTo}</p>
                        </div>
                    </div>
                </div>

                <div class="date">
                    <div class="section-icon">
                        <i class="fa-regular fa-calendar fa-sm"></i>
                    </div>

                    <div class="p-data">
                        <p>${convo.date}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}

function renderAllMessages(list) {
    const container = document.getElementById('message-list');
    container.innerHTML = list.map(convo => renderMessageItem(convo)).join('');
}

function filterMessage(filterType){
    let filterd;

    if(filterType === "all"){
        filterd = conversations
    }
    else {
        filterd = conversations.filter(item => item.status === filterType)
    }

    renderAllMessages(filterd);
}

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const filterType = button.dataset.filter;
        filterMessage(filterType);

        filterButtons.forEach(function(btn) {
            btn.classList.remove('active-button');
        });
        button.classList.add('active-button');
    });
});

document.getElementById('message-list').addEventListener('click', function(event) {
    const item = event.target.closest('.Message-List-item');
    if (!item) return;

    const id = item.dataset.id;
    const convo = conversations.find(c => c.id == id);
    currentConvo = convo;

    if (convo.status === "unread") {
        convo.status = "read";
        convo.statusLable = "Read";
        renderAllMessages(conversations);
    }


    document.getElementById('chatAvatar').src = convo.avatar;
    document.getElementById('chatName').textContent = convo.name;
    document.getElementById('chatUsername').textContent = convo.username;

    const chatHTML = convo.chat.map(msg => `
        <div class="chat-bubble ${msg.sender}">
            <p>${msg.text}</p>
            <span class="chat-time">${msg.time}</span>
        </div>
    `).join('');

    document.getElementById('chatMessages').innerHTML = chatHTML;

    const modal = new bootstrap.Modal(document.getElementById('chatModal'));
    modal.show();
});

document.getElementById('sendChatBtn').addEventListener('click', function() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();

    if (text === "") return;

    const newMessage = {
        sender: "me",
        text: text,
        time: new Date().toLocaleTimeString(),
    };

    currentConvo.chat.push(newMessage);

    const chatHTML = currentConvo.chat.map(msg => `
        <div class="chat-bubble ${msg.sender}">
            <p>${msg.text}</p>
            <span class="chat-time">${msg.time}</span>
        </div>
    `).join('');

    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = chatHTML;
    chatMessages.scrollTop = chatMessages.scrollHeight;

    input.value = "";
});

document.getElementById('archiveChatBtn').addEventListener('click', function() {
    if (currentConvo.status === "archived") {
        currentConvo.status = "read";
        currentConvo.statusLable = "Read";
    } else {
        currentConvo.status = "archived";
        currentConvo.statusLable = "Archived";
    }

    renderAllMessages(conversations);
});

renderAllMessages(conversations);
