//Question #1
const createElemWithText = (html = 'p',txtContent = '', className) => {
    const createdElem = document.createElement(html);
    createdElem.innerText = txtContent;
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
    const btns = document.querySelectorAll('button');
    if (btns !== null) {
        btns.forEach((btn) => {
            let postId = btn.dataset.postId;
            if (postId !== null) {
                btn.addEventListener('click', (event) => {
                    toggleCommentS(event, postId);
                }, false)
            }
        })
    }
    return btns;
}

addButtonListeners();

// Question #7
const removeButtonListeners = () => {
    const btns = document.querySelectorAll('button');
    if (btns !== null) {
        btns.forEach((btn) => {
            let postId = btn.dataset.postId;
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
        console.log(h3);
        let body = createElemWithText('p', comm.body);
        console.log(body);
        let from = createElemWithText('p', `From: ${comm.email}`);
        console.log(from);
        article.append(h3, body, from);
        fragment.append(article);
    })
    return fragment;
}

//createComments(jsonText);

// Question #13
const getPostComments = async (postId) => {
    if (!postId) return;
    try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    } catch(error) {
        console.log(error);
    }
    return response;
}

const toggleCommentS = (event, postId) => {

}