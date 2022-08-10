import { Comment } from './comment';
import { commentIsValid, createModal } from './utils';
import './styles.css';
import { authWithEmailAndPassword, getAuthForm } from './auth';

const form = document.querySelector("#form");
const commentInput = form.querySelector("#comment-input");
const submitBtn = form.querySelector("#submit");
const modalBtn = document.getElementById("modal-btn");

window.addEventListener("load", Comment.renderList);
form.addEventListener("submit", submitHandler);
commentInput.addEventListener("input", () => {
   submitBtn.disabled = !commentIsValid(commentInput.value);
});
modalBtn.addEventListener("click", openModal);

function submitHandler(e) {
   e.preventDefault();

   if (commentIsValid(commentInput.value)) {
      const comment = {
         text: commentInput.value.trim(),
         date: new Date().toJSON()
      }

      submitBtn.disabled = true;
      Comment.create(comment).then(() => {
         commentInput.value = '';
         commentInput.className = '';
         submitBtn.disabled = false;
      })
   }
}

function openModal() {
   createModal('Authorization', getAuthForm());
   const authForm = document.querySelector("#auth-form");
   authForm.addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(e) {
   e.preventDefault();

   const btn = e.target.querySelector("button");
   const email = e.target.querySelector("#email-input").value;
   const password = e.target.querySelector("#password-input").value;

   btn.disabled = true;
   authWithEmailAndPassword(email, password)
      .then(Comment.customFetch)
      .then(renderModalAfterAuth)
      .then(() => {
         btn.disabled = false;
      });
}

function renderModalAfterAuth(content) {
   if(typeof content ==='string') {
      createModal('Error', content);
   } else {
      createModal('List of comments', Comment.listToHtml(content));
   }
}