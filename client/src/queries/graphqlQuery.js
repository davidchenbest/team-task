export function getUsers() {
  return `
    {
        users{
          id
          username
          first
          last
        }
        }
    `;
}

export function login(username, password) {
  return `
    {
        login(username:"${username}", password:"${password}"){
          token
          error
          id
        }
        }
    `;
}

export function signup(username, first, last, password) {
  return `
  mutation{
    signup(username:"${username}", first:"${first}", last:"${last}", password:"${password}"){
      error
    }
    }
  `;
}

export function getUsersIdUsername() {
  return `
  {usersIdUsername{
    id
    username
  }}
  `;
}

export function addTask(assignTo, assignBy, name, difficulty) {
  return `
  mutation{
    addTask(assignTo:${assignTo},assignBy:${assignBy},name:"${name}",difficulty:${difficulty}){
      name
    }
  }
  `;
}

export function getTasks() {
  return `
  {
    tasks{
      assignTo{
        username
      }
      assignBy{
        username
      }
      name
      difficulty
      ratedDifficulty
      id
      createdDate
    }
  }
  `;
}

export function updateRated(rated, id) {
  return `
  mutation{updateRated(ratedDifficulty:${rated},id:${id}){
    ratedDifficulty
  }}
  `;
}

export function deleteTask(id) {
  return `
  mutation{
    deleteTask(id:${id}){
      name
    }
  }
  `;
}
