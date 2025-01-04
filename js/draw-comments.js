const bigPictureWrap = document.querySelector('.big-picture');
const CommentsCount = bigPictureWrap.querySelector('.social__comment-count');

const commentsContainer = bigPictureWrap.querySelector('.social__comments');

const commentSample = bigPictureWrap.querySelector('.social__comment');
const commentsLoaderBtn = bigPictureWrap.querySelector('.social__comments-loader');

let displayedCommentsCnt = 0;
let currCommentsData = [];

const drawComments = (data) => {
  let newCommentsCnt = 0;
  let isEnd = false;
  if (data.comments.length - displayedCommentsCnt > 5){
    newCommentsCnt = 5;
  } else{
    newCommentsCnt = data.comments.length - displayedCommentsCnt;
    isEnd = true;
  }
  for (let i = displayedCommentsCnt; i < displayedCommentsCnt + newCommentsCnt;i++){
    const comment = commentSample.cloneNode(true);
    const commentImg = comment.querySelector('img');
    if (data.comments[i]){
      commentImg.src = data.comments[i].avatar;
      commentImg.alt = data.comments[i].name;
      comment.querySelector('p').textContent = data.comments[i].message;
    }
    commentsContainer.appendChild(comment);
  }
  displayedCommentsCnt += newCommentsCnt;

  if (isEnd){
    commentsLoaderBtn.classList.add('hidden');
    CommentsCount.textContent = `${data.comments.length} из ${data.comments.length} комментариев`;
  }else{
    CommentsCount.textContent = `${displayedCommentsCnt} из ${data.comments.length} комментариев`;
  }
};

const getComments = (data) => {
  displayedCommentsCnt = 0;
  commentsContainer.innerHTML = '';
  commentsLoaderBtn.classList.remove('hidden');
  currCommentsData = data;
  drawComments(data);
};

commentsLoaderBtn.addEventListener('click',() => {
  drawComments(currCommentsData);
});

export {getComments};
