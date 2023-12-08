//Question #1
const createElemWithText = (html = 'p',txtContent = '', className) => {
    const createdElem = document.createElement(html);
    createdElem.textContent = txtContent;
    if (className !== undefined) {
        createdElem.classList.add(className);
    }
    return createdElem;
}


// Question #2
 const createSelectOptions = (jsonData) => {
    const OptElementArray = [];
    if (!jsonData) return;

    for (let i = 0; i < jsonData.length; i++) {
       const userData = document.createElement('option');
       userData.value = jsonData[i].id;
       userData.textContent = jsonData[i].name;
       OptElementArray.push(userData);
    }
    return OptElementArray;
}


// Question #3
 const toggleCommentSection = (postId) => {
    if (!postId) return;
    const section = document.querySelector(`section[data-post-id='${postId}']`);
    if (section !== null) {
        section.classList.toggle('hide');
    };
    return section;
} 


// Question #4
const toggleCommentButton = (postId) => {
    if (!postId) return;
    const btn = document.querySelector(`button[data-post-id='${postId}']`);
    if (btn !== null) {
        btn.textContent === 'Show Comments' ? btn.textContent = 'Hide Comments' : btn.textContent = 'Show Comments';
    };
    return btn;
}

// Question #5
const deleteChildElements = (parentElem) => {
    if (!parentElem) return;
    if (parentElem instanceof HTMLElement) {
        let child = parentElem.lastElementChild;
        while (child !== null) {
            parentElem.removeChild(child);
            child = parentElem.lastElementChild;
        }
    } else return undefined;
   
    return parentElem;
}

// Question #6
const addButtonListeners = () => {
    const btns = document.querySelectorAll('button:not(.testLinkButton)');
    if (btns !== undefined) {
        btns.forEach((btn) => {
            let postId = btn.dataset.postId;
            if (postId !== null) {
                btn.addEventListener('click', (event) => {
                    toggleComments(event, postId);
                }, false)
            }
        })
    }
    return btns;
}

// Question #7
const removeButtonListeners = () => {
    const btns = document.querySelectorAll('button:not(.testLinkButton)');
    if (btns !== null) {
        btns.forEach((btn) => {
            let postId = btn.dataset.id;
            if (postId !== null) {
                btn.removeEventListener('click', (event) => {
                }, false)
            }
        })
    }
    return btns;
}


// Question #8
const createComments = (jsonComm) => {
    if (!jsonComm) return;
    const fragment = document.createDocumentFragment();
    jsonComm.forEach((comm) => {
        let article = document.createElement('article');
        let h3 = createElemWithText('h3', comm.name);
        let body = createElemWithText('p', comm.body);
        let from = createElemWithText('p', `From: ${comm.email}`);
        article.append(h3, body, from);
        fragment.append(article);
    })
    return fragment;
}

// Question #9
const populateSelectMenu = (jsonData) => {
    if (!jsonData) return;
    const SelectMenu = document.getElementById('selectMenu');
    const optElements = createSelectOptions(jsonData);
    optElements.forEach((element) => {
        SelectMenu.append(element);
    })
    return SelectMenu;
}


// Question #10
const getUsers = async () => {
    let jsonData;
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        jsonData =  await response.json();
    } catch(error) {
        console.log(error);
    }
    return jsonData;
}

// Question #11
const getUserPosts = async (userId) => {
    if (!userId) return;
    let jsonData;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        jsonData =  await response.json();
    } catch(error) {
        console.log(error);
    }
    return jsonData;
}

// Question #12
const getUser = async (userId) => {
    if (!userId) return;
    let jsonData;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        jsonData =  await response.json();
    } catch(error) {
        console.log(error);
    }
    return jsonData;
}


// Question #13
const getPostComments = async (postId) => {
    if (!postId) return;
    let jsonData;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        jsonData = await response.json();
    } catch(error) {
        console.log(error);
    }
    return jsonData;
}

// Question #14
const displayComments = async (postId) => {
    if (!postId) return;
    const section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.append(fragment);
    return section;
}

// Question #15
const createPosts = async (jsonData) => {
    if (!jsonData) return;
    const fragment = document.createDocumentFragment();
    let article;
    for (let i = 0; i < jsonData.length; i++) {
        let data = jsonData[i];
        article = document.createElement('article');
        let h2 = createElemWithText('h2', data.title);
        let para = createElemWithText('p', data.body);
        let paraPostId = createElemWithText('p', `Post ID: ${data.id}`);
        let author = await getUser(data.userId);
        let paraAuthor = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        let paraAuthCatchPhrase = createElemWithText('p', author.company.catchPhrase);
        let btn = createElemWithText('button', 'Show Comments');
        btn.dataset.postId = data.id;
        article.append(h2, para, paraPostId, paraAuthor, paraAuthCatchPhrase, btn);
        let section = await displayComments(data.id);
        article.append(section);
        fragment.append(article);
    }
    return fragment;
}

// Question #16
const displayPosts = async (postData) => {
    const main = document.getElementsByTagName('main')[0];
    let element;
    if (postData) {
        element = await createPosts(postData)
    } else {
        element = createElemWithText('p', document.getElementsByClassName('default-text')[0].textContent, 'default-text')
    }
    main.append(element);
    return element;
}

// Question #17
const toggleComments = (event, postId) => {
    if (!event || !postId) return;
    event.target.listener = true;
    const sect = toggleCommentSection(postId);
    const btn = toggleCommentButton(postId);
    const array = [sect, btn];
    return array;
}

// Question #18
const refreshPosts = async (jsonPostData) => {
    if (!jsonPostData) return;
    const btnRemoveArray = removeButtonListeners();
    const mainElem = deleteChildElements(document.getElementsByTagName('main')[0]);
    const fragment = await displayPosts(jsonPostData);
    const btnAddArray = addButtonListeners();
    const array = [btnRemoveArray, mainElem, fragment, btnAddArray];
    return array;
}

// Question #19
const selectMenuChangeEventHandler = async (event) => {
    if (!event) return;
    document.getElementById('selectMenu').disabled = true;
    const userId = event?.target?.value || 1;
    const jsonPostData = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(jsonPostData);
    document.getElementById('selectMenu').disabled = false;
    const array = [userId, jsonPostData, refreshPostsArray];
    return array;
}

// Question #20
const initPage = async () => {
    const jsonUserData = await getUsers();
    const selectElem = populateSelectMenu(jsonUserData);
    const array = [jsonUserData, selectElem];
    return array;
}


// Question #21
const initApp = () => {
    initPage();
    const selectMenu = document.getElementById('selectMenu');
    selectMenu.addEventListener('change', (event) => {
        selectMenuChangeEventHandler(event);
    }, false);
}

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === 'complete') {
        initApp();
    }
})