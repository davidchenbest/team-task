export function getUsers() {
  return `
    {
        users{
          id
          email
          first
          last
        }
        }
    `;
}

export function login(email, password) {
  return `
    {
        login(email:"${email}", password:"${password}"){
          token
          error
        }
        }
    `;
}

export function signup(email, first, last, password) {
  return `
  mutation{
    signup(email:"${email}", first:"${first}", last:"${last}", password:"${password}"){
      error
    }
    }
  `;
}
