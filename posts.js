let card = document.querySelector(".post__item");
let wrapper = document.querySelector(".post__list");
let pagination = document.querySelector('.pagination')
let prevButton = document.querySelector('.prev')
let nextButton = document.querySelector('.next')

var posts = []
var firstNum = 0
var lastNum = 9

fetch('https://dummyjson.com/posts')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      posts = data.posts
      render(posts.slice(firstNum,lastNum))
      prevButton.setAttribute('disabled', true)
    })

function render(arr) {
  wrapper.innerHTML = ''
  arr.map(function(post) {
    let li = document.createElement('li');
    let name = document.createElement('h2');
    let email = document.createElement('span');

    name.innerHTML = `${post.title}`;
    email.innerHTML = `${post.body}`;

    li.appendChild(name);
    li.appendChild(email);
    li.classList.add('post__item')
  
    wrapper.appendChild(li);
    
  });
}



pagination.addEventListener('click', (e) => {
  if(e.target.textContent == 'Prev'){
    firstNum-=9
    lastNum-=9
    if(firstNum <= 0) prevButton.setAttribute('disabled', true) 
    if(lastNum < posts.length){ nextButton.removeAttribute('disabled')}
    render(posts.slice(firstNum, lastNum))
  }
  if(e.target.textContent == 'Next'){
    firstNum+=9
    lastNum+=9
    if(lastNum >= posts.length) nextButton.setAttribute('disabled', true)
    if(firstNum >= 0) prevButton.removeAttribute('disabled')
    render(posts.slice(firstNum, lastNum))
  }
})
