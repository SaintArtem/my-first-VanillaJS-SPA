export class Comment {
   static create(comment) {
      return fetch('https://my-first-spa-37019-default-rtdb.firebaseio.com/comment.json', {
         method: 'POST',
         body: JSON.stringify(comment),
         headers: {
            'Content-Type': 'application/json'
         }
      })
         .then(response => response.json())
         .then(response => {
            comment.id = response.name;
            return comment;
         })
         .then(addToLocalStorage)
         .then(Comment.renderList)
   }

   static renderList() {
      const comments = getCommentsFromLocalStorage();

      const html = comments.length
         ? comments.map(toCard).join('')
         : `<div class="mui--text-headline">
            No comments posted yet.
             </div>`;

      const list = document.getElementById("list");

      list.innerHTML = html;
   }

   static listToHtml(comments) {
      return comments.length ? `<ol>${comments.map(c => `<li>${c.text}</li>`).join('')}</ol>` : `<p>No questions yet.</p>`;
   }

   static customFetch(token) {
      if (!token) {
         return Promise.resolve(`<p class="error">You have no token</p>`)
      }
      return fetch(`https://my-first-spa-37019-default-rtdb.firebaseio.com/comment.json?auth=${token}`)
         .then(response => response.json())
         .then(response => {
            if (response && response.error) {
               return `<p class="error">${response.error}</p>`
            }

            return response ? Object.keys(response).map(key => ({
               ...response[key],
               id: key
            })) : [];
         })
   }
}

function toCard(comment) {
   return `
   <div class="mui--text-black-54">
      ${new Date(comment.date).toLocaleDateString()}
      ${new Date(comment.date).toLocaleTimeString()}
   </div>
   <div>
      ${comment.text}
   </div>
   <br>`;
}

function addToLocalStorage(comment) {
   const all = getCommentsFromLocalStorage();
   all.push(comment);
   localStorage.setItem('comments', JSON.stringify(all));
}

function getCommentsFromLocalStorage() {
   return JSON.parse(localStorage.getItem('comments') || '[]');
}