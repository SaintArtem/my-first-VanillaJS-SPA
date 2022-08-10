export function getAuthForm() {
   return `
   <form class="mui-form" id="auth-form">
      <div class="mui-textfield mui-textfield--float-label">
         <input id="email-input" type="email" required minlength="10" maxlength="300">
         <label for="email-input">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
         <input id="password-input" type="password" required minlength="10" maxlength="300">
         <label for="password-input">Password</label>
      </div>
      <button id="enter" type="submit" class="mui-btn mui-btn--raised mui-btn--accent"
      >Enter</button>
   </form>
   `;
}

export function authWithEmailAndPassword(email, password) {
   const apiKey = "AIzaSyCuJM0CyXAuKB5j_ZZvgIftNr_z-HVnjgE";
   return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
         email,
         password,
         returnSecureToken: true
      }),
      headers: {
         'Content-Type': 'application/json'
      }
   })
      .then(response => response.json())
      .then(data => data.idToken)
}